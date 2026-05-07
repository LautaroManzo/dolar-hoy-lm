import { NextResponse } from "next/server";
import { API_DOLAR_AMBITO } from "@/app/constants/api";

interface DolarItem {
  casa: string;
  compra: number;
  venta: number;
}

const NOMBRES: Record<string, string> = {
  blue: "Blue",
  oficial: "Oficial",
  bolsa: "MEP",
  contadoconliqui: "CCL",
  cripto: "Cripto",
  tarjeta: "Tarjeta",
};

const EXCLUIR = ["mayorista"];

function buildMessage(datos: DolarItem[]): string {
  const hoy = new Date().toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "America/Argentina/Buenos_Aires",
  });

  const filtrados = datos.filter((d) => !EXCLUIR.includes(d.casa));
  const lineas = filtrados.map((d) => {
    const nombre = NOMBRES[d.casa] || d.casa;
    return `${nombre}: $${Math.round(d.compra)} / $${Math.round(d.venta)}`;
  });

  return `\u{1F4B5} *Dolar Hoy ${hoy}*\n\n${lineas.join("\n")}\n\n\u{1F517} [dolarinfohoy.com.ar](https://dolarinfohoy.com.ar)`;
}

async function sendTelegramMessage(text: string): Promise<Record<string, unknown>> {
  const token = process.env.TELEGRAM_BOT_TOKEN!;
  const chatId = "@DolarInfoHoy";
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    }),
  });

  return res.json();
}

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(API_DOLAR_AMBITO);
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch rates" }, { status: 502 });
  }

  const datos: DolarItem[] = await res.json();
  const message = buildMessage(datos);
  const result = await sendTelegramMessage(message);

  return NextResponse.json({ message, result });
}
