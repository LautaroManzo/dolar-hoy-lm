import { getAllDolarData } from "./services/getAllDolarData";
import { Cards } from "./dolar/components/cards";
import { Metadata } from "next";
import { getFechaHoyFormateada } from "./utils/site";
import Description from "./dolar/components/description";
import EvolucionDolar from "./dolar/components/evolucion-dolar";
import Noticias from "./noticia/components/Noticias";
import PreguntasFrecuentes from "./dolar/components/preguntas-frecuentes";

export const revalidate = 60; 

export async function generateMetadata(): Promise<Metadata> {
  const fechaHoy = getFechaHoyFormateada();

  try {
    const dataForCards = await getAllDolarData();

    const bluePrice = dataForCards.blue?.sell || '---';
    const oficialPrice = dataForCards.oficial?.sell || '---';
    const mepPrice = dataForCards.mep?.sell || '---';
    const cclPrice = dataForCards.ccl?.sell || '---';

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
  const dataForCards = await getAllDolarData();

  return (
    <>
      <Description />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="flex justify-center w-full" aria-label="Cotizaciones principales del dólar">
          <Cards data={dataForCards} />
        </section>
      </main>

      <EvolucionDolar />
      <Noticias />
      <PreguntasFrecuentes />
    </>
  );
}