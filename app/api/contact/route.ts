import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { COLORS } from "@/app/constants/colors";
import { createRateLimiter } from "@/app/utils/rate-limiter";

const schema = z.object({
  subject: z.string().min(1).max(200),
  email: z.string().email(),
  message: z.string().min(1).max(1000),
  website: z.string().max(0),   // honeypot — debe llegar vacío
  loadedAt: z.number(),
});

const isRateLimited = createRateLimiter({ limit: 3, windowMs: 10 * 60 * 1000 });

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Demasiados mensajes. Intentá de nuevo en 10 minutos." },
      { status: 429 }
    );
  }

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Todos los campos son obligatorios." }, { status: 400 });
  }

  const { subject, email, message, website, loadedAt } = parsed.data;

  if (website) {
    return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 });
  }

  if (Date.now() - loadedAt < 3000) {
    return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const to = process.env.CONTACT_EMAIL;
  if (!to) {
    console.error("[contact] CONTACT_EMAIL no configurado");
    return NextResponse.json({ error: "Error de configuración del servidor." }, { status: 500 });
  }

  const safeMessage = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\n/g, "<br/>");

  const { error } = await resend.emails.send({
    from: "DolarInfoHoy <contacto@dolarinfohoy.com.ar>",
    to,
    replyTo: email,
    subject,
    html: `
      <div style="font-family:sans-serif;max-width:900px;margin:0 auto;padding:24px">
        <blockquote style="border-left:3px solid ${COLORS.primary};margin:0;padding:8px 16px;color:#334155;background:#f8fafc;border-radius:4px">
          ${safeMessage}
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
