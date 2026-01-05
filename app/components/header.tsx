"use client";

import { Carrousel } from "../components/carrousel";
import { Calculator } from "lucide-react";

export function Header() {

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#1a3a52] to-[#2d5a7b] text-white">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <img
              src="/money.svg"
              alt="DolarAr"
              className="w-15 h-15 object-contain"
            />

            <div className="flex flex-col">
              <h1 className="text-3xl font-semibold">DólarAR</h1>
              <p className="text-xs font-semibold">Cotización en tiempo real</p>
            </div>
          </div>

          {/* <div className="hidden md:flex items-center gap-6">

            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all border border-white/20 cursor-pointer">
                <Calculator size={18} />
                <span>Calculadora</span>
            </button>

          </div> */}

        </div>
      </header>

      <Carrousel/>
    </>
  );
}