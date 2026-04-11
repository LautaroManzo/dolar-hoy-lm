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
  } catch {
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
  } catch {
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
    "dateModified": fechaActualizacion,
    "inLanguage": "es-AR",
    "itemListElement": [
      {
        "@type": "FinancialQuote",
        "position": 1,
        "name": "Dólar Blue",
        "description": "Cotización del mercado paralelo e informal.",
        "priceCurrency": "ARS",
        "price": dataForCards.blue?.sell,
        "bidPrice": dataForCards.blue?.buy,
        "offerPrice": dataForCards.blue?.sell,
        "baseCurrency": "USD",
        "quoteDate": dataForCards.blue?.fechaActualizacion ?? fechaActualizacion,
      },
      {
        "@type": "FinancialQuote",
        "position": 2,
        "name": "Dólar Oficial",
        "description": "Valor de referencia determinado por el Banco Central.",
        "priceCurrency": "ARS",
        "price": dataForCards.oficial?.sell,
        "bidPrice": dataForCards.oficial?.buy,
        "offerPrice": dataForCards.oficial?.sell,
        "baseCurrency": "USD",
        "quoteDate": dataForCards.oficial?.fechaActualizacion ?? fechaActualizacion,
      },
      {
        "@type": "FinancialQuote",
        "position": 3,
        "name": "Dólar MEP",
        "description": "Compra legal de dólares mediante bonos nacionales.",
        "priceCurrency": "ARS",
        "price": dataForCards.mep?.sell,
        "bidPrice": dataForCards.mep?.buy,
        "offerPrice": dataForCards.mep?.sell,
        "baseCurrency": "USD",
        "quoteDate": dataForCards.mep?.fechaActualizacion ?? fechaActualizacion,
      },
      {
        "@type": "FinancialQuote",
        "position": 4,
        "name": "Dólar CCL",
        "description": "Cambio de pesos por dólares en el exterior vía bonos.",
        "priceCurrency": "ARS",
        "price": dataForCards.ccl?.sell,
        "bidPrice": dataForCards.ccl?.buy,
        "offerPrice": dataForCards.ccl?.sell,
        "baseCurrency": "USD",
        "quoteDate": dataForCards.ccl?.fechaActualizacion ?? fechaActualizacion,
      },
      {
        "@type": "FinancialQuote",
        "position": 5,
        "name": "Dólar Tarjeta",
        "description": "Precio para consumos y servicios en moneda extranjera.",
        "priceCurrency": "ARS",
        "price": dataForCards.tarjeta?.sell,
        "bidPrice": dataForCards.tarjeta?.buy,
        "offerPrice": dataForCards.tarjeta?.sell,
        "baseCurrency": "USD",
        "quoteDate": dataForCards.tarjeta?.fechaActualizacion ?? fechaActualizacion,
      },
      {
        "@type": "FinancialQuote",
        "position": 6,
        "name": "Dólar Cripto",
        "description": "Cotización de monedas digitales como el USDT o USDC.",
        "priceCurrency": "ARS",
        "price": dataForCards.cripto?.sell,
        "bidPrice": dataForCards.cripto?.buy,
        "offerPrice": dataForCards.cripto?.sell,
        "baseCurrency": "USD",
        "quoteDate": dataForCards.cripto?.fechaActualizacion ?? fechaActualizacion,
      },
    ],
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
