"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const PreguntasFrecuentes = () => {

  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const faqs = [
    {
        pregunta: "¿Qué es el dólar oficial?",
        respuesta: "Es el tipo de cambio establecido y regulado por el Banco Central de la República Argentina (BCRA). Se utiliza para operaciones formales como comercio exterior y transacciones bancarias."
    },
    {
        pregunta: "¿Qué es el dólar mayorista?",
        respuesta: "Es el tipo de cambio utilizado en operaciones entre bancos, grandes empresas y el comercio exterior. Suele ser más bajo que el minorista porque no incluye costos de atención al público."
    },
    {
        pregunta: "¿Qué es el dólar minorista?",
        respuesta: "Es el precio del dólar que ofrecen los bancos y casas de cambio al público general. Suele ser más alto que el mayorista y sirve como referencia para otros tipos de cambio."
    },
    {
        pregunta: "¿Qué es el dólar ahorro o solidario?",
        respuesta: "Es el dólar oficial minorista con recargos impositivos aplicados a compras para atesoramiento. Se adquiere de manera legal a través de bancos y entidades financieras."
    },
    {
        pregunta: "¿Qué es el “cepo cambiario”?",
        respuesta: "Es un conjunto de restricciones impuestas por el Estado para limitar el acceso a divisas. Busca controlar la salida de dólares y preservar reservas."
    },
    {
        pregunta: "¿Qué es el dólar blue?",
        respuesta: "Es el dólar que se comercializa en el mercado informal, fuera del sistema bancario y regulado. Su valor surge de la oferta y demanda entre privados."
    },
    {
        pregunta: "¿Qué significa “brecha cambiaria”?",
        respuesta: "Es la diferencia porcentual entre el dólar oficial y otros tipos de cambio, como el blue o los financieros. Indica el nivel de distorsión del mercado cambiario."
    },
    {
        pregunta: "¿Qué es el dólar MEP?",
        respuesta: "Es una forma legal de obtener dólares mediante la compra y venta de bonos que cotizan en el mercado local, sin necesidad de recurrir al mercado informal."
    },
    {
        pregunta: "¿Qué es el dólar CCL (Contado con Liquidación)?",
        respuesta: "Es un tipo de cambio financiero que surge al comprar un activo en pesos en Argentina y venderlo en dólares en el exterior. Permite girar divisas fuera del país."
    },
    {
        pregunta: "¿Qué es el dólar cripto?",
        respuesta: "Es el tipo de cambio que surge al comprar y vender criptomonedas estables (stablecoins) en pesos y dólares. Se opera de forma digital en exchanges y billeteras virtuales."
    }
  ];

  return (
    <div className="w-full bg-white font-sans">
      
      {/* SECCIÓN DE ACORDEONES */}
      <div 
        className="relative w-full py-20 flex items-center justify-center border-t border-slate-100"
        style={{
          background: 'linear-gradient(to bottom, #fcf7f8 0%, #eff6ff 5%)'
        }}
      >
    
        <div className="max-w-4xl w-full mx-auto px-6 relative z-10 space-y-6">
          
          {/* Preguntas Frecuentes */}
          <div className={`transition-all duration-700 rounded-2xl border bg-white ${
            openSection === 'faq' 
            ? 'border-blue-400/30 shadow-[0_40px_80px_rgba(30,41,59,0.1)]' 
            : 'border-slate-200/80 shadow-xl shadow-slate-200/20 hover:scale-[1.01]'
          }`}>

            <button
              onClick={() => toggleSection('faq')}
              className="w-full flex items-center justify-between p-4 transition-colors focus:outline-none cursor-pointer"
            >

              <div className="flex items-center gap-6">
                  <h3 className="text-left p-2 text-xl text-slate-900 tracking-wide">Preguntas frecuentes</h3>
              </div>

              <div className={`p-2 rounded-full transition-all duration-500 ${openSection === 'faq' ? 'bg-blue-50 text-[#1e3a5f] rotate-180' : 'text-slate-300'}`}>
                <ChevronDown className="w-6 h-6" />
              </div>

            </button>

          <div 
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
                openSection === 'faq' ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
            }`}
          >

            <div className="px-10 md:px-14 pb-14 space-y-10 overflow-y-auto h-[500px]">

                <div className="h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent mb-6" />

                <div className="grid gap-10">
                
                    {faqs.map((faq, index) => (
                        <div key={index} className="space-y-3 group">

                            <h4 className="font-semibold text-slate-900 text-lg transition-colors duration-300">
                                {faq.pregunta}
                            </h4>

                            <div className="flex gap-5">
                                
                                <div className="w-1 bg-blue-500/20 rounded-full transition-colors shrink-0" />
                                
                                <p className="text-slate-600 text-[15px] leading-relaxed max-w-2xl">
                                    {faq.respuesta}
                                </p>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

          </div>
          
          </div>

          {/* Sobre nosotros */}

          <div className={`transition-all duration-700 rounded-2xl border bg-white ${
            openSection === 'about' 
            ? 'border-blue-400/30 shadow-[0_40px_80px_rgba(30,41,59,0.1)]' 
            : 'border-slate-200/80 shadow-xl shadow-slate-200/20 hover:scale-[1.01]'
          }`}>

            <button
              onClick={() => toggleSection('about')}
              className="w-full flex items-center justify-between p-4 transition-colors focus:outline-none cursor-pointer"
            >

              <div className="flex items-center gap-6">
                  <h3 className="text-left p-2 text-xl text-slate-900 tracking-wide">Sobre nosotros</h3>
              </div>

              <div className={`p-2 rounded-full transition-all duration-500 ${openSection === 'about' ? 'bg-blue-50 text-[#1e3a5f] rotate-180' : 'text-slate-300'}`}>
                <ChevronDown className="w-6 h-6" />
              </div>

            </button>

            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openSection === 'about' ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>

              <div className="px-10 md:px-14 pb-14 space-y-6">

                <div className="h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent mb-8" />

                <div className="max-w-2xl space-y-5">

                    <p className="text-slate-600 text-[16px] leading-relaxed">
                        ¡Hola! Todo empezó como un <em>proyecto personal</em>, con la idea de crear un espacio organizado donde consultar el valor del dólar en Argentina sin vueltas.
                    </p>

                    <p className="text-slate-600 text-[16px] leading-relaxed">
                        La idea detrás de este sitio es ofrecer <strong>información confiable</strong> en un entorno de estética limpia y clara, para que consultar el dólar sea rápido y sin complicaciones.
                    </p>

                    <p className="text-slate-600 text-[16px] leading-relaxed">
                        Espero que esta web te resulte útil.
                    </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PreguntasFrecuentes;