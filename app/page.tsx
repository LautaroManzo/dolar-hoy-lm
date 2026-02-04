import { getDolar } from "./services/dolar";
import { Cards } from "./components/dolar/cards";
import { Metadata } from "next";
import { getFechaHoyFormateada } from "./utils/site";

export const revalidate = 300; 

export async function generateMetadata(): Promise<Metadata> {
  const fechaHoy = getFechaHoyFormateada();

  try {
    const blueData = await getDolar('blue');
    const oficialData = await getDolar('oficial');
    const mepData = await getDolar('bolsa');
    const cclData = await getDolar('contadoconliqui');

    const bluePrice = blueData?.sell || '---';
    const oficialPrice = oficialData?.sell || '---';
    const mepPrice = mepData?.sell || '---';
    const cclPrice = cclData?.sell || '---';

    return {
      title: `Dólar Blue Hoy $${bluePrice} | Cotización ${fechaHoy}`,
      description: `Dólar Blue: $${bluePrice} | Oficial: $${oficialPrice} | MEP: $${mepPrice} | CCL: $${cclPrice}. Cotizaciones actualizadas en tiempo real. Brecha cambiaria y variaciones diarias.`,
      openGraph: {
        title: `Dólar Blue Hoy $${bluePrice} | ${fechaHoy}`,
        description: `Blue: $${bluePrice} | Oficial: $${oficialPrice} | MEP: $${mepPrice} | CCL: $${cclPrice}. Cotizaciones actualizadas al minuto.`,
        type: "website",
        locale: "es_AR",
        url: "https://dolarinfohoy.com.ar",
        siteName: "Dólar Hoy",
        images: [{
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `Dólar Blue Hoy $${bluePrice} - Cotización en Argentina`
        }]
      },
      twitter: {
        card: "summary_large_image",
        title: `Dólar Blue $${bluePrice} | Oficial $${oficialPrice} | ${fechaHoy}`,
        description: `Blue: $${bluePrice} | MEP: $${mepPrice} | CCL: $${cclPrice}. Cotizaciones actualizadas en tiempo real.`
      }
    };
  } catch (error) {
    return {
      title: `Dólar hoy ${fechaHoy} | Cotización en tiempo real en Argentina`,
      description: `Consultá el precio del Dólar Blue, Oficial, MEP y CCL hoy ${fechaHoy}. Brecha cambiaria y las variaciones diarias en Argentina.`
    };
  }
} 

export default async function Page() {
  const entries = {
    blue: ["blue", "Dólar Blue", "Cotización de compra y venta en el mercado paralelo.", "Se opera en efectivo, sin límites de compra.", "De 11:00hs a 16:00hs."],
    oficial: ["oficial", "Dólar Oficial", "Valor de referencia del Banco Central.", "Base para el cálculo de impuestos.", "De 10:00hs a 15:00hs."],
    mep: ["bolsa", "Dólar MEP", "Forma legal de comprar dólares vía bonos.", "Se deposita en tu cuenta bancaria.", "De 11:30hs a 18:00hs."],
    ccl: ["contadoconliqui", "Dólar CCL", "Cambio de pesos por dólares en el exterior.", "Utilizado por empresas.", "De 11:30hs a 18:00hs."],
    tarjeta: ["tarjeta", "Dólar Tarjeta", "Es el tipo de cambio que se aplica a los consumos realizados en moneda extranjera. Se calcula sumando al Dólar Oficial los impuestos correspondientes por gastos en el exterior.", "Aplica tanto para servicios digitales como para gastos de viajes y compras fuera del país."],
    cripto: ["cripto", "Dólar Cripto", "Es la cotización de las monedas digitales vinculadas al dólar (como el USDT).", "Opera las 24 horas, los 7 días de la semana."],
  };

  const resultsArray = await Promise.all(
    Object.entries(entries).map(async ([key, [api, title, desc, extra, hora]]) => {
      try {
        const stats = await getDolar(api);
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

      <section className="flex justify-center w-full" aria-label="Cotizaciones principales del dólar">
        <Cards data={dataForCards} />
      </section>

    </main>
  );
}