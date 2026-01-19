import { getDolar } from "./dolar";

const SOURCES = {
  blue: "https://dolarapi.com/v1/dolares/blue",
  oficial: "https://dolarapi.com/v1/dolares/oficial",
  bolsa: "https://dolarapi.com/v1/dolares/bolsa",
  contadoconliqui: "https://dolarapi.com/v1/dolares/contadoconliqui",
  tarjeta: "https://dolarapi.com/v1/dolares/tarjeta",
  cripto: "https://dolarapi.com/v1/dolares/cripto",
};

export async function getDolarBuyPrice(type: keyof typeof SOURCES) {
  const data = await getDolar(type);
  return data.buy;
}