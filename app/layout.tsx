import type { Metadata } from "next";
import "./globals.css";

import { Header } from "./components/header";
import { Footer } from "./components/footer";
import EvolucionDolar from "./components/evolucion-dolar";
import Description from "./components/description";
import PreguntasFrecuentes from "./components/preguntas-frecuentes";

import { InfoProvider } from "./context/InfoContext";
import { GoogleAnalytics } from '@next/third-parties/google';

export const revalidate = 3600; 

export async function generateMetadata(): Promise<Metadata> {
  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.toLocaleString('es-AR', { month: 'long' });
  const fechaHoy = `${dia} de ${mes}`;

  return {
    title: {
      default: `Dólar hoy ${fechaHoy} | Cotización en tiempo real en Argentina`,
      template: "%s | Dólar Hoy"
    },
    description:
      `Consultá el precio del Dólar Blue, Oficial, MEP y CCL hoy ${fechaHoy}. Brecha cambiaria y las variaciones diarias en Argentina.`,
    keywords: ["dólar blue hoy", "dólar argentina", "cotización dólar", "dólar mep", "dólar tarjeta"],
    authors: [{ name: "LMJT" }],
    openGraph: {
      title: `Dólar Blue Hoy en Argentina | ${fechaHoy}`,
      description: `Seguí el minuto a minuto de las cotizaciones del dólar en Argentina este ${fechaHoy}.`,
      type: "website",
      locale: "es_AR",
      url: "https://dolar-hoy-lm.vercel.app/", 
      siteName: "Cotización Dólar",
    },
    twitter: {
      card: "summary_large_image",
      title: `Dólar Blue Hoy en Argentina | ${fechaHoy}`,
      description: `Cotización actualizada de Blue, MEP, CCL y Oficial al ${fechaHoy}.`,
    },
    icons: {
      icon: "/money.svg",
      apple: "/money.svg",
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialQuote",
    "name": "Cotización del Dólar en Argentina",
    "description": "Precios actualizados del dólar blue, oficial, MEP y CCL en tiempo real.",
    "publisher": {
      "@type": "Organization",
      "name": "Dólar Hoy LM",
      "logo": "https://dolar-hoy-lm.vercel.app/money.svg"
    }
  };

  return (
    <html lang="es">

      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className="font-sans antialiased bg-[#fcf7f8] min-h-screen flex flex-col">

        <InfoProvider>
          <Header />
          <Description/>
          <main className="flex-1">{children}</main>
          <EvolucionDolar/>
          <PreguntasFrecuentes/>
          <Footer />
        </InfoProvider>

        <GoogleAnalytics gaId="G-6MP230WEJ1" />

      </body>

    </html>
  );
}