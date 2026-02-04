interface DolarData {
  compra: number;
  venta: number;
  fechaActualizacion: string;
  variacion: number;
  casa: string;
}

const API_AMBITO = "https://dolarapi.com/v1/ambito/dolares";

interface VariationData {
  percent: number;
  percentAbs: number;
  sign: "up" | "down" | "neutral";
  dailyDiff: number;
  dailyDiffSign: "up" | "down" | "neutral";
}

interface DolarResponse {
  buy: number;
  sell: number;
  buyVariation: VariationData;
  sellVariation: VariationData;
  spread: number;
  spreadSign: "up" | "down" | "neutral";
  fechaActualizacion: string;
}

const getSign = (n: number): "up" | "down" | "neutral" => (n > 0 ? "up" : n < 0 ? "down" : "neutral");

async function fetchJson<T>(url: string, revalidateTime: number = 300): Promise<T> {
  const res = await fetch(url, { next: { revalidate: revalidateTime } });
  if (!res.ok) throw new Error(`Error en fetch: ${res.status}`);
  return res.json();
}

export async function getDolar(type: string): Promise<DolarResponse> {
  // Obtener todos los datos de la API de Ámbito
  const allDolars: DolarData[] = await fetchJson(API_AMBITO, 300);
  
  // Buscar el dólar específico
  const dolarData = allDolars.find(d => d.casa === type);
  
  if (!dolarData) {
    throw new Error(`No se encontró el tipo de dólar: ${type}`);
  }

  const spread = dolarData.venta - dolarData.compra;
  const variacionPercent = dolarData.variacion || 0;

  // Crear variaciones basadas en la variación general de la API
  const buyVariation = {
    percent: variacionPercent,
    percentAbs: Math.abs(variacionPercent),
    sign: getSign(variacionPercent),
    dailyDiff: Number((dolarData.compra * variacionPercent / 100).toFixed(2)),
    dailyDiffSign: getSign(variacionPercent)
  };

  const sellVariation = {
    percent: variacionPercent,
    percentAbs: Math.abs(variacionPercent),
    sign: getSign(variacionPercent),
    dailyDiff: Number((dolarData.venta * variacionPercent / 100).toFixed(2)),
    dailyDiffSign: getSign(variacionPercent)
  };

  return {
    buy: dolarData.compra,
    sell: dolarData.venta,
    buyVariation: {
      percent: Number(buyVariation.percent.toFixed(2)),
      percentAbs: Number(buyVariation.percentAbs.toFixed(2)),
      sign: buyVariation.sign,
      dailyDiff: buyVariation.dailyDiff,
      dailyDiffSign: buyVariation.dailyDiffSign
    },
    sellVariation: {
      percent: Number(sellVariation.percent.toFixed(2)),
      percentAbs: Number(sellVariation.percentAbs.toFixed(2)),
      sign: sellVariation.sign,
      dailyDiff: sellVariation.dailyDiff,
      dailyDiffSign: sellVariation.dailyDiffSign
    },
    spread: Number(spread.toFixed(2)),
    spreadSign: getSign(spread),
    fechaActualizacion: dolarData.fechaActualizacion
  };
}