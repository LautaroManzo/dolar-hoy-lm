import { getDolar } from "./dolar";
import { DOLAR_ENTRIES } from "../constants/dolarTypes";

interface DolarData {
  title: string;
  buy: number;
  sell: number;
  buyVariation: {
    percent: number;
    percentAbs: number;
    sign: "up" | "down" | "neutral";
    dailyDiff: number;
    dailyDiffSign: "up" | "down" | "neutral";
  };
  sellVariation: {
    percent: number;
    percentAbs: number;
    sign: "up" | "down" | "neutral";
    dailyDiff: number;
    dailyDiffSign: "up" | "down" | "neutral";
  };
  spread: number;
  spreadSign: "up" | "down" | "neutral";
  descripcion: string;
  extra: string;
  horaOperacion: string;
  fechaActualizacion: string;
}

export async function getAllDolarData(): Promise<Record<string, DolarData>> {
  const resultsArray = await Promise.all(
    Object.entries(DOLAR_ENTRIES).map(async ([key, [api, title, desc, extra, hora]]) => {
      try {
        const stats = await getDolar(api);
        return { 
          key, 
          data: { 
            ...stats, 
            title, 
            descripcion: desc, 
            extra, 
            horaOperacion: hora 
          } 
        };
      } catch (error) {
        console.error(`Error cargando ${key}:`, error);
        return null;
      }
    })
  );

  const validResults = resultsArray.filter((r): r is {key: string, data: DolarData} => r !== null);
  
  return Object.fromEntries(validResults.map(r => [r.key, r.data]));
}
