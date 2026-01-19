import type { Metadata } from "next";
import "./globals.css";

import { Header } from "./components/header";
import { Footer } from "./components/footer";
import Description from "./components/description";
import PreguntasFrecuentes from "./components/preguntas-frecuentes";

import { InfoProvider } from "./context/InfoContext";

import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: {
    default: "Dólar hoy | Cotización en tiempo real en Argentina",
    template: "%s | Dólar Hoy"
  },
  description:
    "Consultá el precio del Dólar Blue, Oficial, MEP y CCL en tiempo real. Brecha cambiaria y las variaciones diarias en Argentina.",
  keywords: ["dólar blue hoy", "dólar argentina", "cotización dólar", "dólar mep", "dólar tarjeta"],
  authors: [{ name: "LMJT" }],
  openGraph: {
    title: "Dólar Blue Hoy en Argentina | Cotización en Tiempo Real",
    description: "Seguí el minuto a minuto de las cotizaciones del dólar en Argentina.",
    type: "website",
    locale: "es_AR",
    url: "https://tudominio.com", // Cambialo cuando tengas el dominio final
    siteName: "Cotización Dólar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dólar Blue Hoy en Argentina",
    description: "Cotización actualizada de Blue, MEP, CCL y Oficial.",
  },
  icons: {
    icon: "/money.svg",
    apple: "/money.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      
      <body className="font-sans antialiased bg-[#fcf7f8] min-h-screen flex flex-col">
      
        <InfoProvider>
          <Header />
          
          <Description/>
          
          <main className="flex-1">{children}</main>

          < PreguntasFrecuentes/>

          <Footer />
        </InfoProvider>

        <GoogleAnalytics gaId="G-6MP230WEJ1" />
      
      </body>

    </html>
  );
}