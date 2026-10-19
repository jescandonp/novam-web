import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { normalizeEmail, tokenMatches } from "@/lib/unsubscribe";

/* ─────────────────────────────────────────────────────────────
   POST /api/unsubscribe
   Acepta:
     · JSON { token } o { email } desde /cancelar-suscripcion
     · POST de un clic (RFC 8058) a /api/unsubscribe?t=TOKEN con cuerpo
       "List-Unsubscribe=One-Click"
   Efecto:
     1. Marca Opt-out = sí en la base de Contactos de Notion (si encuentra al titular).
     2. Avisa al buzón de datos personales para dejar constancia y suprimir
        también en Apollo / Outlook.
   Siempre responde 200 genérico: no revela si un correo existe en la base.
   Variables: UNSUBSCRIBE_SECRET, NOTION_API_KEY, NOTION_CONTACTS_DB_ID,
              RESEND_API_KEY, DATA_PROTECTION_EMAIL_TO
   ───────────────────────────────────────────────────────────── */

const NOTION_VERSION = "2022-06-28";
const bodySchema = z.object({
  token: z.string().regex(/^[A-Za-z0-9_-]{22}$/).optional(),
  email: z.string().email().max(254).optional(),
});

type NotionPage = { id: string; properties: Record<string, { email?: string | null }> };

async function notion(path: string, init: RequestInit) {
  const res = await fetch(`https://api.notion.com/v1/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Notion ${path}: ${res.status}`);
  return res.json();
}

/* Busca contactos por email exacto o recorriendo la base y comparando el token */
async function findContacts(opts: { email?: string; token?: string }): Promise<NotionPage[]> {
  const db = process.env.NOTION_CONTACTS_DB_ID;
  if (!process.env.NOTION_API_KEY || !db) return [];

  if (opts.email) {
    const r = await notion(`databases/${db}/query`, {
      method: "POST",
      body: JSON.stringify({ filter: { property: "Email", email: { equals: opts.email } } }),
    });
    return r.results as NotionPage[];
  }

  const secret = process.env.UNSUBSCRIBE_SECRET!;
  const found: NotionPage[] = [];
  let cursor: string | undefined;
  do {
    const r = await notion(`databases/${db}/query`, {
      method: "POST",
      body: JSON.stringify({ page_size: 100, start_cursor: cursor }),
    });
    for (const p of r.results as NotionPage[]) {
      const e = p.properties?.Email?.email;
      if (e && tokenMatches(e, opts.token!, secret)) found.push(p);
    }
    cursor = r.has_more ? r.next_cursor : undefined;
  } while (cursor);
  return found;
}

async function markOptOut(pages: NotionPage[]) {
  await Promise.all(
    pages.map((p) =>
      notion(`pages/${p.id}`, {
        method: "PATCH",
        body: JSON.stringify({ properties: { "Opt-out": { checkbox: true } } }),
      })
    )
  );
}

async function notify(summary: string) {
  const to = process.env.DATA_PROTECTION_EMAIL_TO;
  if (!process.env.RESEND_API_KEY || !to) return;
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "Nova Measurement <noreply@novam.net.co>",
    to: [to],
    subject: "[Habeas data] Solicitud de baja de comunicaciones",
    text: `${summary}\n\nAcción requerida: confirmar la supresión en Apollo y en las listas de Outlook. Plazo máximo: 5 días hábiles (Política de Tratamiento, sección 10).`,
  });
}

export async function POST(req: NextRequest) {
  const ok = NextResponse.json({ success: true }, { status: 200 });

  /* Un clic desde el cliente de correo (RFC 8058) */
  const qsToken = req.nextUrl.searchParams.get("t") ?? undefined;
  let token: string | undefined;
  let email: string | undefined;

  const ctype = req.headers.get("content-type") ?? "";
  if (ctype.includes("application/json")) {
    const parsed = bodySchema.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    token = parsed.data.token;
    email = parsed.data.email ? normalizeEmail(parsed.data.email) : undefined;
  } else {
    token = qsToken && /^[A-Za-z0-9_-]{22}$/.test(qsToken) ? qsToken : undefined;
  }
  if (!token && !email) return NextResponse.json({ error: "Falta el enlace o el correo" }, { status: 400 });

  try {
    const pages = await findContacts({ token, email });
    if (pages.length) await markOptOut(pages);
    const who = email ?? (pages[0]?.properties?.Email?.email || "token sin coincidencia en Notion");
    await notify(
      `Titular: ${who}\nCanal: ${email ? "formulario web" : "enlace del correo"}\nRegistros marcados con Opt-out en Notion: ${pages.length}\nFecha: ${new Date().toISOString()}`
    );
  } catch (err) {
    /* La solicitud del titular no puede perderse: se registra el error y se avisa igual */
    console.error("unsubscribe error", err);
    await notify(`Error procesando una baja (${email ?? "por token"}): revisar manualmente.`).catch(() => {});
  }
  return ok;
}
