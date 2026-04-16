"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function SobreNosotros() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full font-sans py-3 px-4">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-700 bg-white overflow-hidden rounded-[15px] border-l-3 border-l-[#1a3a52] ${open ? 'shadow-[0_40px_80px_rgba(30,41,59,0.1)]' : 'shadow-xl shadow-slate-200/20 hover:scale-[1.01]'}`}>
          <button
            onClick={() => setOpen(!open)}
            className="group w-full flex items-center justify-between p-6 focus:outline-none cursor-pointer transition-all hover:bg-slate-50/50"
          >
            <h3 className={`text-xl tracking-wide transition-colors duration-300 ${open ? 'text-[#1a3a52] font-bold' : 'text-slate-900'}`}>
              Sobre nosotros
            </h3>
            <div className={`transition-transform duration-500 ${open ? 'rotate-180' : ''}`}>
              <ChevronDown className="w-7 h-7" color='#1a3a52' />
            </div>
          </button>

          <div className={`transition-all duration-500 ease-in-out ${open ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
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
}
