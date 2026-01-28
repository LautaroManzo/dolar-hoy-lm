"use client";

import { Carrousel } from "../components/carrousel";
import { Calculator } from "lucide-react";
import { useState } from 'react';
import CalculatorModal from './_calculator';

export function Header() {

  const [isModalOpen, setIsModalOpen] = useState(false);

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
              <h1 className="text-3xl font-semibold">DolarInfoHoy</h1>
              <p className="text-xs font-semibold">Cotización en tiempo real</p>
            </div>
          </div>

          <div className="flex items-center gap-6">

            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center bg-[#2d5a7b] text-white p-2 rounded-full 
                        text-sm font-medium transition-all duration-700 ease-in-out hover:scale-110 
                        border-3 border-white cursor-pointer shadow-lg"
            >
              <Calculator color="white" size={18} />
            </button>

            <CalculatorModal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
            />

          </div>

        </div>
      </header>

      <Carrousel/>
    </>
  );
}