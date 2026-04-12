import { getAllDolarData } from "./services/getAllDolarData";
import { Cards } from "./dolar/components/cards";
import { Metadata } from "next";
import Description from "./dolar/components/description";
import EvolucionDolar from "./dolar/components/evolucion-dolar";
import Noticias from "./noticia/components/Noticias";
import PreguntasFrecuentes from "./dolar/components/preguntas-frecuentes";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const dataForCards = await getAllDolarData();

    const bluePrice = dataForCards.blue?.sell || '---';
    const oficialPrice = dataForCards.oficial?.sell || '---';
    const mepPrice = dataForCards.mep?.sell || '---';
    const cclPrice = dataForCards.ccl?.sell || '---';

    return {
      title: { absolute: `Dólar Blue Hoy $${bluePrice} | Cotización en tiempo real` },
      description: `Dólar Blue: $${bluePrice} | Oficial: $${oficialPrice} | MEP: $${mepPrice} | CCL: $${cclPrice}. Cotizaciones actualizadas en tiempo real. Brecha cambiaria y variaciones diarias.`,
      openGraph: {
        title: `Dólar Blue Hoy $${bluePrice} | Cotización en tiempo real`,
        description: `Blue: $${bluePrice} | Oficial: $${oficialPrice} | MEP: $${mepPrice} | CCL: $${cclPrice}. Cotizaciones actualizadas al minuto.`,
        type: "website",
        locale: "es_AR",
        url: "https://dolarinfohoy.com.ar",
        siteName: "DolarInfoHoy",
        images: [{
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `Dólar Blue Hoy $${bluePrice} - Cotización en Argentina`
        }]
      },
      twitter: {
        card: "summary_large_image",
        title: `Dólar Blue $${bluePrice} | Oficial $${oficialPrice} | Tiempo real`,
        description: `Blue: $${bluePrice} | MEP: $${mepPrice} | CCL: $${cclPrice}. Cotizaciones actualizadas en tiempo real.`,
        images: ["/opengraph-image"]
      }
    };
  } catch (err) {
    console.error('[generateMetadata] Error al obtener cotizaciones:', err);
    return {
      title: { absolute: `Dólar hoy en Argentina | Cotización en tiempo real` },
      description: `Consultá el precio del Dólar Blue, Oficial, MEP y CCL. Brecha cambiaria y variaciones diarias en Argentina.`
    };
  }
}

export default async function Page() {
  let dataForCards: Awaited<ReturnType<typeof getAllDolarData>> = {};
  let hasFetchError = false;

  try {
    dataForCards = await getAllDolarData();
  } catch (err) {
    console.error('[Page] Error al obtener cotizaciones:', err);
    hasFetchError = true;
  }

  const fechaActualizacion =
    Object.values(dataForCards)[0]?.fechaActualizacion ?? new Date().toISOString();

  const quotesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Cotizaciones del Dólar en Argentina",
    "description": "Precios actualizados del dólar blue, oficial, MEP y CCL en tiempo real.",
    "url": "https://dolarinfohoy.com.ar",
    "image": "https://dolarinfohoy.com.ar/opengraph-image",
    "dateModified": fechaActualizacion,
    "inLanguage": "es-AR",
    "itemListElement": (
      [
        { key: 'blue',    pos: 1, name: 'Dólar Blue',    desc: 'Cotización del mercado paralelo e informal.' },
        { key: 'oficial', pos: 2, name: 'Dólar Oficial', desc: 'Valor de referencia determinado por el Banco Central.' },
        { key: 'mep',     pos: 3, name: 'Dólar MEP',     desc: 'Compra legal de dólares mediante bonos nacionales.' },
        { key: 'ccl',     pos: 4, name: 'Dólar CCL',     desc: 'Cambio de pesos por dólares en el exterior vía bonos.' },
        { key: 'tarjeta', pos: 5, name: 'Dólar Tarjeta', desc: 'Precio para consumos y servicios en moneda extranjera.' },
        { key: 'cripto',  pos: 6, name: 'Dólar Cripto',  desc: 'Cotización de monedas digitales como el USDT o USDC.' },
      ] as const
    ).flatMap(({ key, pos, name, desc }) => {
      const d = dataForCards[key];
      if (!d) return [];
      return [{
        "@type": "FinancialQuote",
        "position": pos,
        "name": name,
        "description": desc,
        "priceCurrency": "ARS",
        "price": d.sell,
        "bidPrice": d.buy,
        "offerPrice": d.sell,
        "baseCurrency": "USD",
        "quoteDate": d.fechaActualizacion ?? fechaActualizacion,
      }];
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quotesJsonLd) }}
      />
      <Description />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <section className="flex justify-center w-full" aria-label="Cotizaciones principales del dólar">
          {hasFetchError ? (
            <div className="w-full max-w-6xl mx-auto my-4">
              <div
                className="w-full bg-amber-50 border border-amber-300 text-amber-800 px-5 py-4 rounded-xl"
                role="alert"
              >
                No se pudieron cargar las cotizaciones en este momento. Por favor, intentá nuevamente en unos minutos.
              </div>
            </div>
          ) : (
            <Cards data={dataForCards} />
          )}
        </section>
      </div>

      <EvolucionDolar />
      <Noticias />
      <PreguntasFrecuentes />
    </>
  );
}
