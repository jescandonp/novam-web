import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  role: z.string().min(2),
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const d = parsed.data;
  const notifyTo = process.env.CONTACT_EMAIL_TO ?? "info@novam.com.co";

  const guideHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0A192F; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: white; font-size: 20px; margin: 0;">Su guía técnica está lista</h1>
        <p style="color: #00A8E8; margin: 8px 0 0; font-size: 13px;">Nova Measurement SAS</p>
      </div>
      <div style="background: white; padding: 32px 24px; border: 1px solid #E0E5EC; border-top: none; border-radius: 0 0 8px 8px;">
        <p>Estimado(a) <strong>${d.name}</strong>,</p>
        <p style="color: #5C6B7A; line-height: 1.6;">
          Gracias por su interés. Adjuntamos la guía técnica
          <strong>"Medición Clamp-On vs. Tradicional: Guía de Selección 2026"</strong>.
        </p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.novam.com.co"}/downloads/guia-medicion-clamp-on.pdf"
             style="background: #0056B3; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 15px;">
            Descargar Guía →
          </a>
        </div>
        <p style="color: #5C6B7A; font-size: 14px; border-top: 1px solid #E0E5EC; padding-top: 16px;">
          ¿Tiene un reto de medición específico? Con gusto le asesoramos sin costo.
          <br/><a href="https://wa.me/573215354908" style="color: #0056B3;">+57 321 535 4908</a> ·
          <a href="mailto:info@novam.com.co" style="color: #0056B3;">info@novam.com.co</a>
        </p>
      </div>
    </div>
  `;

  try {
    await Promise.all([
      resend.emails.send({
        from: "Nova Measurement <noreply@novam.com.co>",
        to: [d.email],
        subject: "Su guía técnica: Medición Clamp-On 2026 — Nova Measurement",
        html: guideHtml,
      }),
      resend.emails.send({
        from: "Nova Measurement <noreply@novam.com.co>",
        to: [notifyTo],
        subject: `[Lead] ${d.company} descargó la guía técnica`,
        html: `<p><b>Nombre:</b> ${d.name}<br/><b>Empresa:</b> ${d.company}<br/><b>Cargo:</b> ${d.role}<br/><b>Email:</b> ${d.email}</p>`,
      }),
    ]);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Lead magnet email error:", err);
    return NextResponse.json({ error: "Error al enviar" }, { status: 500 });
  }
}
