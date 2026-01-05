import { getDolar } from "./services/dolar";
import { Cards } from "./components/cards";

export const revalidate = 900; 

export default async function Page() {
  const entries = {
    blue: ["blue", "Dólar Blue", "Cotización de compra y venta en el mercado paralelo.", "Se opera en efectivo, sin límites de compra.", "11:00hs a 16:00hs."],
    oficial: ["oficial", "Dólar Oficial", "Valor de referencia del Banco Central.", "Base para el cálculo de impuestos.", "10:00hs a 15:00hs."],
    mep: ["bolsa", "Dólar MEP", "Forma legal de comprar dólares vía bonos.", "Se deposita en tu cuenta bancaria.", "11:30hs a 18:00hs."],
    ccl: ["contadoconliqui", "Dólar CCL", "Cambio de pesos por dólares en el exterior.", "Utilizado por empresas.", "11:30hs a 18:00hs."],
    tarjeta: ["tarjeta", "Dólar Tarjeta", "Oficial más impuestos por gastos fuera.", "Netflix, Spotify y viajes.", "24hs"],
    cripto: ["cripto", "Dólar Cripto", "Monedas digitales (USDT).", "Disponible fines de semana.", "24hs"],
  } as const;

  const resultsArray = await Promise.all(
    Object.entries(entries).map(async ([key, [api, title, desc, extra, hora]]) => {
      try {
        const stats = await getDolar(api as any);
        return { key, data: { ...stats, title, descripcion: desc, extra, horaOperacion: hora } };
      } catch (error) {
        console.error(`Error cargando ${key}:`, error);
        return null;
      }
    })
  );

  const validResults = resultsArray.filter((r): r is {key: string, data: any} => r !== null);
  const dataForCards = Object.fromEntries(validResults.map(r => [r.key, r.data]));

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">

      <section className="flex justify-center w-full">
        <Cards data={dataForCards} />
      </section>

    </main>
  );
}