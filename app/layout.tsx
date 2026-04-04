import type { Metadata } from "next";
import "./globals.css";

import { Header } from "./components/layout/header";
import { Footer } from "./components/layout/footer";

import { InfoProvider } from "./context/InfoContext";
import { GoogleAnalytics } from '@next/third-parties/google';
import { getFechaHoyFormateada } from "./utils/site";

export const revalidate = 3600; 

export async function generateMetadata(): Promise<Metadata> {
  const fechaHoy = getFechaHoyFormateada();

  return {
    metadataBase: new URL('https://dolarinfohoy.com.ar'),
    alternates: {
      canonical: '/',
    },
    title: {
      default: `Dólar hoy ${fechaHoy} | Cotización en tiempo real en Argentina`,
      template: "%s | Dólar Hoy"
    },
    description:
      `Consultá el precio del Dólar Blue, Oficial, MEP y CCL hoy ${fechaHoy}. Brecha cambiaria y las variaciones diarias en Argentina.`,
    keywords: [
      "dólar blue hoy", "dólar oficial", "cotización dólar blue", 
      "dólar mep hoy", "dólar ccl", "dólar tarjeta", "precio dólar",
      "brecha cambiaria", "dólar argentina", "comprar dólar blue",
      "venta dólar blue", "dólar cripto", "dólar hoy argentina",
      "cotización dólar oficial", "dólar bolsa", "contado con liqui",
      "dólar ahorro", "dólar turista", "precio dólar blue",
      "variación dólar", "dólar banco central", "mercado paralelo"
    ],
    authors: [{ name: "LMJT" }],
    openGraph: {
      title: `Dólar Blue Hoy en Argentina | ${fechaHoy}`,
      description: `Seguí el minuto a minuto de las cotizaciones del dólar en Argentina este ${fechaHoy}.`,
      type: "website",
      locale: "es_AR",
      url: "https://dolarinfohoy.com.ar", 
      siteName: "Cotización Dólar",
    },
    twitter: {
      card: "summary_large_image",
      title: `Dólar Blue Hoy en Argentina | ${fechaHoy}`,
      description: `Cotización actualizada de Blue, MEP, CCL y Oficial al ${fechaHoy}.`,
    },
    icons: {
      icon: [
        { url: "/icons/money.svg", type: "image/svg+xml" },
        { url: "/icons/money.svg", sizes: "any" }
      ],
      apple: "/icons/money.svg",
      shortcut: "/icons/money.svg",
    },
    verification: {
      google: 'G-6MP230WEJ1'
    }
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["FinancialQuote", "WebPage"],
    "name": "Cotización del Dólar en Argentina",
    "description": "Precios actualizados del dólar blue, oficial, MEP y CCL en tiempo real.",
    "url": "https://dolarinfohoy.com.ar",
    "dateModified": new Date().toISOString(),
    "inLanguage": "es-AR",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Dólar Hoy",
      "url": "https://dolarinfohoy.com.ar"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dólar Hoy LM",
      "url": "https://dolarinfohoy.com.ar",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dolarinfohoy.com.ar/icons/money.svg",
        "width": 185,
        "height": 185
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Cotizaciones del Dólar en Argentina",
      "description": "Lista de cotizaciones actualizadas de diferentes tipos de dólar",
      "numberOfItems": 6,
      "itemListElement": [
        {
          "@type": "FinancialQuote",
          "name": "Dólar Blue",
          "description": "Cotización de compra y venta en el mercado paralelo",
          "currency": "ARS"
        },
        {
          "@type": "FinancialQuote", 
          "name": "Dólar Oficial",
          "description": "Valor de referencia del Banco Central",
          "currency": "ARS"
        },
        {
          "@type": "FinancialQuote",
          "name": "Dólar MEP",
          "description": "Forma legal de comprar dólares vía bonos",
          "currency": "ARS"
        },
        {
          "@type": "FinancialQuote",
          "name": "Dólar CCL", 
          "description": "Cambio de pesos por dólares en el exterior",
          "currency": "ARS"
        },
        {
          "@type": "FinancialQuote",
          "name": "Dólar Tarjeta",
          "description": "Tipo de cambio para consumos en moneda extranjera",
          "currency": "ARS"
        },
        {
          "@type": "FinancialQuote",
          "name": "Dólar Cripto",
          "description": "Cotización de monedas digitales vinculadas al dólar",
          "currency": "ARS"
        }
      ]
    },
    "about": {
      "@type": "Thing",
      "name": "Dólar Argentino",
      "description": "Tipo de cambio del dólar en Argentina"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Inversores y consumidores en Argentina"
    }
  };

  return (
    <html lang="es">

      <head>
        <link rel="preload" href="/images/edificios.jpg" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className="font-sans antialiased bg-[#fcf7f8] min-h-screen flex flex-col">

        <InfoProvider>
          <Header />
          <main id="top" className="flex-1">{children}</main>
          <Footer />
        </InfoProvider>

        <GoogleAnalytics gaId="G-6MP230WEJ1" />

      </body>

    </html>
  );
}