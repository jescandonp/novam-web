import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  role: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(7),
  city: z.string().min(1),
  application: z.string().min(1),
  message: z.string().min(10),
  privacy: z.boolean(),
});

/* Rate limiting simple (en producción usar Upstash Redis) */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  /* Rate limit */
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intente más tarde." },
      { status: 429 }
    );
  }

  /* Validar body */
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const d = parsed.data;

  const emailTo = process.env.CONTACT_EMAIL_TO ?? "info@novam.com.co";

  /* Email al equipo Nova */
  const internalHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0A192F; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; font-size: 20px; margin: 0;">
          Nueva solicitud de cotización — Nova Measurement
        </h1>
      </div>
      <div style="background: white; padding: 24px; border: 1px solid #E0E5EC; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #5C6B7A; font-size: 13px; width: 130px;">Nombre</td><td style="padding: 8px 0; font-weight: 600;">${d.name}</td></tr>
          <tr style="background: #F8FAFC;"><td style="padding: 8px 0; color: #5C6B7A; font-size: 13px;">Empresa</td><td style="padding: 8px 0; font-weight: 600;">${d.company}</td></tr>
          <tr><td style="padding: 8px 0; color: #5C6B7A; font-size: 13px;">Cargo</td><td style="padding: 8px 0;">${d.role ?? "—"}</td></tr>
          <tr style="background: #F8FAFC;"><td style="padding: 8px 0; color: #5C6B7A; font-size: 13px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${d.email}" style="color: #0056B3;">${d.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #5C6B7A; font-size: 13px;">Teléfono</td><td style="padding: 8px 0;"><a href="tel:${d.phone}" style="color: #0056B3;">${d.phone}</a></td></tr>
          <tr style="background: #F8FAFC;"><td style="padding: 8px 0; color: #5C6B7A; font-size: 13px;">Ciudad</td><td style="padding: 8px 0;">${d.city}</td></tr>
          <tr><td style="padding: 8px 0; color: #5C6B7A; font-size: 13px;">Aplicación</td><td style="padding: 8px 0;"><strong>${d.application}</strong></td></tr>
        </table>
        <div style="background: #E8F7FF; border-left: 3px solid #0056B3; padding: 12px 16px; margin-top: 16px; border-radius: 0 4px 4px 0;">
          <p style="color: #5C6B7A; font-size: 12px; margin: 0 0 4px;">Mensaje:</p>
          <p style="margin: 0; white-space: pre-wrap;">${d.message}</p>
        </div>
        <div style="margin-top: 20px; text-align: right;">
          <a href="mailto:${d.email}" style="background: #0056B3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
            Responder al cliente →
          </a>
        </div>
      </div>
      <p style="color: #CBD5E1; font-size: 11px; text-align: center; margin-top: 16px;">
        Nova Measurement SAS · novam.com.co
      </p>
    </div>
  `;

  /* Email de confirmación al cliente */
  const confirmHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0A192F; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: white; font-size: 22px; margin: 0;">Solicitud recibida</h1>
        <p style="color: #00A8E8; margin: 8px 0 0; font-size: 14px;">Nova Measurement SAS</p>
      </div>
      <div style="background: white; padding: 32px 24px; border: 1px solid #E0E5EC; border-top: none; border-radius: 0 0 8px 8px;">
        <p>Estimado(a) <strong>${d.name}</strong>,</p>
        <p style="color: #5C6B7A; line-height: 1.6;">
          Hemos recibido su solicitud de consultoría técnica. Un ingeniero de Nova Measurement
          le contactará en menos de <strong>24 horas hábiles</strong> para atender su requerimiento.
        </p>
        <div style="background: #F8FAFC; border: 1px solid #E0E5EC; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 8px; font-weight: 600; font-size: 14px;">Resumen de su solicitud:</p>
          <p style="margin: 4px 0; font-size: 13px; color: #5C6B7A;">Empresa: <strong style="color: #1A2332;">${d.company}</strong></p>
          <p style="margin: 4px 0; font-size: 13px; color: #5C6B7A;">Aplicación: <strong style="color: #1A2332;">${d.application}</strong></p>
          <p style="margin: 4px 0; font-size: 13px; color: #5C6B7A;">Ciudad: <strong style="color: #1A2332;">${d.city}</strong></p>
        </div>
        <p style="color: #5C6B7A; font-size: 14px;">
          Si tiene alguna urgencia, puede contactarnos directamente por WhatsApp:
          <br/>
          <a href="https://wa.me/573215354908" style="color: #0056B3; font-weight: 600;">+57 321 535 4908</a>
        </p>
        <p style="color: #1A2332;">Cordial saludo,<br/><strong>Equipo Nova Measurement</strong></p>
      </div>
      <p style="color: #CBD5E1; font-size: 11px; text-align: center; margin-top: 16px;">
        Nova Measurement SAS · info@novam.com.co · novam.com.co
      </p>
    </div>
  `;

  try {
    await Promise.all([
      /* Notificación interna */
      resend.emails.send({
        from: "Nova Measurement <noreply@novam.com.co>",
        to: [emailTo],
        replyTo: d.email,
        subject: `[Cotización] ${d.company} — ${d.application}`,
        html: internalHtml,
      }),
      /* Confirmación al cliente */
      resend.emails.send({
        from: "Nova Measurement <noreply@novam.com.co>",
        to: [d.email],
        subject: "Solicitud recibida — Nova Measurement",
        html: confirmHtml,
      }),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Error sending contact email:", err);
    return NextResponse.json(
      { error: "Error al enviar el mensaje. Intente más tarde." },
      { status: 500 }
    );
  }
}
