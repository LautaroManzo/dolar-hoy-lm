import type { Metadata } from "next";
import "./globals.css";

import { Header } from "./layout/components/header";
import { Footer } from "./layout/components/footer";

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
      "variación dólar", "dólar banco central", "mercado paralelo",
      "tipo de cambio", "cotización dólar blue hoy", "dólar paralelo",
      "cuanto vale el dólar hoy"
    ],
    authors: [{ name: "LMJT" }],
    openGraph: {
      title: `Dólar Blue Hoy en Argentina | ${fechaHoy}`,
      description: `Seguí el minuto a minuto de las cotizaciones del dólar en Argentina este ${fechaHoy}.`,
      type: "website",
      locale: "es_AR",
      url: "https://dolarinfohoy.com.ar",
      siteName: "DolarInfoHoy",
      images: [{
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DolarInfoHoy - Cotización del Dólar en Argentina"
      }]
    },
    twitter: {
      card: "summary_large_image",
      title: `Dólar Blue Hoy en Argentina | ${fechaHoy}`,
      description: `Cotización actualizada de Blue, MEP, CCL y Oficial al ${fechaHoy}.`,
      images: ["/opengraph-image"]
    },
    icons: {
      icon: [
        { url: "/icons/money.svg", type: "image/svg+xml" },
        { url: "/icons/money.svg", sizes: "any" }
      ],
      apple: "/icons/money.svg",
      shortcut: "/icons/money.svg",
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://dolarinfohoy.com.ar/#website",
        "url": "https://dolarinfohoy.com.ar",
        "name": "DolarInfoHoy",
        "description": "Cotización del dólar blue, oficial, MEP y CCL en tiempo real en Argentina.",
        "inLanguage": "es-AR",
        "publisher": {
          "@id": "https://dolarinfohoy.com.ar/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://dolarinfohoy.com.ar/#organization",
        "name": "DolarInfoHoy",
        "url": "https://dolarinfohoy.com.ar",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://dolarinfohoy.com.ar/#logo",
          "url": "https://dolarinfohoy.com.ar/icons/money.svg",
          "width": 185,
          "height": 185
        }
      }
    ]
  };

  return (
    <html lang="es-AR">

      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className="font-sans antialiased bg-[#fcf7f8] min-h-screen flex flex-col">
        <Header />
        <main id="top" className="flex-1">{children}</main>
        <Footer />
        <GoogleAnalytics gaId="G-6MP230WEJ1" />
      </body>

    </html>
  );
}
