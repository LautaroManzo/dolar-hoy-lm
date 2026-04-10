"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const PreguntasFrecuentes = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const faqs = [
    { pregunta: "¿Qué es el dólar oficial?", respuesta: "Es el tipo de cambio establecido y regulado por el Banco Central de la República Argentina (BCRA). Se utiliza para operaciones formales como comercio exterior y transacciones bancarias." },
    { pregunta: "¿Qué es el dólar mayorista?", respuesta: "Es el tipo de cambio utilizado en operaciones entre bancos, grandes empresas y el comercio exterior. Suele ser más bajo que el minorista porque no incluye costos de atención al público." },
    { pregunta: "¿Qué es el dólar minorista?", respuesta: "Es el precio del dólar que ofrecen los bancos y casas de cambio al público general. Suele ser más alto que el mayorista y sirve como referencia para otros tipos de cambio." },
    { pregunta: "¿Qué es el dólar ahorro o solidario?", respuesta: "Es el dólar oficial minorista con recargos impositivos aplicados a compras para atesoramiento. Se adquiere de manera legal a través de bancos y entidades financieras." },
    { pregunta: "¿Qué es el \"cepo cambiario\"?", respuesta: "Es un conjunto de restricciones impuestas por el Estado para limitar el acceso a divisas. Busca controlar la salida de dólares y preservar reservas." },
    { pregunta: "¿Qué es el dólar blue?", respuesta: "Es el dólar que se comercializa en el mercado informal, fuera del sistema bancario y regulado. Su valor surge de la oferta y demanda entre privados." },
    { pregunta: "¿Qué significa \"brecha cambiaria\"?", respuesta: "Es la diferencia porcentual entre el dólar oficial y otros tipos de cambio, como el blue o los financieros. Indica el nivel de distorsión del mercado cambiario." },
    { pregunta: "¿Qué es el dólar MEP?", respuesta: "Es una forma legal de obtener dólares mediante la compra y venta de bonos que cotizan en el mercado local, sin necesidad de recurrir al mercado informal." },
    { pregunta: "¿Qué es el dólar CCL (Contado con Liquidación)?", respuesta: "Es un tipo de cambio financiero que surge al comprar un activo en pesos en Argentina y venderlo en dólares en el exterior. Permite girar divisas fuera del país." },
    { pregunta: "¿Qué es el dólar cripto?", respuesta: "Es el tipo de cambio que surge al comprar y vender criptomonedas estables (stablecoins) en pesos y dólares. Se opera de forma digital en exchanges y billeteras virtuales." }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.pregunta,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.respuesta
      }
    }))
  };

  const sectionClasses = (id: string) => `
    transition-all duration-700 bg-white overflow-hidden rounded-[15px]
    border-l-3 border-l-[#1a3a52]
    ${openSection === id
      ? 'shadow-[0_40px_80px_rgba(30,41,59,0.1)]'
      : 'shadow-xl shadow-slate-200/20 hover:scale-[1.01]'}
  `;

  return (
    <div className="w-full font-sans py-12 px-4 [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-6xl mx-auto space-y-6">

        <div className={sectionClasses('faq')}>
          <button
            onClick={() => toggleSection('faq')}
            className="group w-full flex items-center justify-between p-6 focus:outline-none cursor-pointer transition-all hover:bg-slate-50/50"
          >
            <h3 className={`text-xl tracking-wide transition-colors duration-300 ${openSection === 'faq' ? 'text-[#1a3a52] font-bold' : 'text-slate-900'}`}>
              Preguntas frecuentes
            </h3>
            <div className={`transition-transform duration-500 ${openSection === 'faq' ? 'rotate-180' : ''}`}>
              <ChevronDown className="w-7 h-7" color='#1a3a52'/>
            </div>
          </button>

          <div className={`transition-all duration-500 ease-in-out ${openSection === 'faq' ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-10 md:px-14 pb-14 space-y-10">
              <div className="h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent mb-6" />
              <div className="grid gap-10 overflow-y-auto max-h-[450px] pr-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-semibold text-slate-900 text-lg">{faq.pregunta}</h4>
                    <div className="flex gap-5">
                      <div className="w-1 bg-blue-500/20 rounded-full shrink-0" />
                      <p className="text-slate-600 text-[15px] leading-relaxed">{faq.respuesta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={sectionClasses('about')}>
          <button
            onClick={() => toggleSection('about')}
            className="group w-full flex items-center justify-between p-6 focus:outline-none cursor-pointer transition-all hover:bg-slate-50/50"
          >
            <h3 className={`text-xl tracking-wide transition-colors duration-300 ${openSection === 'about' ? 'text-[#1a3a52] font-bold' : 'text-slate-900'}`}>
              Sobre nosotros
            </h3>
            <div className={`transition-transform duration-500 ${openSection === 'about' ? 'rotate-180' : ''}`}>
              <ChevronDown className="w-7 h-7" color='#1a3a52'/>
            </div>
          </button>

          <div className={`transition-all duration-500 ease-in-out ${openSection === 'about' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-10 md:px-14 pb-14 space-y-5">
              <div className="h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent mb-8" />
              <p className="text-slate-600 text-[16px] leading-relaxed">
                ¡Hola! Todo empezó como un <em>proyecto personal</em>, con la idea de crear un espacio organizado donde consultar el valor del <strong>dólar</strong> en Argentina sea rápido y fácil.
              </p>
              <p className="text-slate-600 text-[16px] leading-relaxed">
                La idea detrás de este sitio es ofrecer <strong>información confiable</strong> en un entorno de estética limpia y clara.
              </p>
              <p className="text-slate-600 text-[16px] leading-relaxed">Espero que esta web te resulte útil.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PreguntasFrecuentes;
