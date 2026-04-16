import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { subject, email, message } = await req.json();

  if (!subject?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Todos los campos son obligatorios." }, { status: 400 });
  }

  if (message.length > 1000) {
    return NextResponse.json({ error: "El mensaje no puede superar los 1000 caracteres." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "El email no es válido." }, { status: 400 });
  }

  const to = process.env.CONTACT_EMAIL;
  if (!to) {
    console.error("[contact] CONTACT_EMAIL no configurado");
    return NextResponse.json({ error: "Error de configuración del servidor." }, { status: 500 });
  }

  const { error } = await resend.emails.send({
    from: "DolarInfoHoy <contacto@dolarinfohoy.com.ar>",
    to,
    replyTo: email,
    subject,
    html: `
      <div style="font-family:sans-serif;max-width:900px;margin:0 auto;padding:24px">
        <blockquote style="border-left:3px solid #1a3a52;margin:0;padding:8px 16px;color:#334155;background:#f8fafc;border-radius:4px">
          ${message.replace(/\n/g, "<br/>")}
        </blockquote>
      </div>
    `,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json({ error: "No se pudo enviar el mensaje. Intentá de nuevo." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
