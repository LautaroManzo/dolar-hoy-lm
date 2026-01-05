const SOURCES = {
  blue: "https://dolarapi.com/v1/dolares/blue",
  oficial: "https://dolarapi.com/v1/dolares/oficial",
  bolsa: "https://dolarapi.com/v1/dolares/bolsa",
  contadoconliqui: "https://dolarapi.com/v1/dolares/contadoconliqui",
  tarjeta: "https://dolarapi.com/v1/dolares/tarjeta",
  cripto: "https://dolarapi.com/v1/dolares/cripto",
};

const HISTORICAL = "https://api.argentinadatos.com/v1/cotizaciones/dolares";

const formatDate = (d: Date) =>
  `${d.getUTCFullYear()}/${String(d.getUTCMonth() + 1).padStart(2, "0")}/${String(
    d.getUTCDate()
  ).padStart(2, "0")}`;

const getSign = (n: number) => (n > 0 ? "up" : n < 0 ? "down" : "neutral");

async function fetchJson<T>(url: string, revalidateTime: number = 900): Promise<T> {
  const res = await fetch(url, { next: { revalidate: revalidateTime } });
  if (!res.ok) throw new Error(`Error en fetch: ${res.status}`);
  return res.json();
}

export async function getDolar(type: keyof typeof SOURCES) {
  
  const today: any = await fetchJson(SOURCES[type], 900);

  const y = new Date();
  y.setUTCDate(y.getUTCDate() - 1);
  const yesterdayUrl = `${HISTORICAL}/${type}/${formatDate(y)}`;

  let yesterday = null;
  try {
    const yRes = await fetch(yesterdayUrl, { next: { revalidate: 3600 } });
    yesterday = yRes.ok ? await yRes.json() : null;
  } catch (e) {
    console.warn(`No se pudo obtener precio histórico para ${type}`);
  }

  const buyY = yesterday?.compra ?? today.compra;
  const sellY = yesterday?.venta ?? today.venta;
  const sellDiff = today.venta - sellY;
  const variationPercent = sellY === 0 ? 0 : (sellDiff / sellY) * 100;
  const spread = today.venta - today.compra;

  return {
    buy: today.compra,
    sell: today.venta,
    variationPercent: Number(variationPercent.toFixed(2)),
    variationPercentAbs: Number(Math.abs(variationPercent).toFixed(2)),
    variationSign: getSign(variationPercent),
    dailyDiff: Number(Math.abs(sellDiff).toFixed(2)),
    dailyDiffSign: getSign(sellDiff),
    spread: Number(Math.abs(spread).toFixed(2)),
    spreadSign: getSign(spread),
    fechaActualizacion: today.fechaActualizacion
  };
}