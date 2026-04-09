"use client";

import { Carousel } from "../../shared/ui/carousel";
import { Calculator } from "lucide-react";
import { useState } from 'react';
import CalculatorModal from '../../dolar/components/calculator';
import Link from 'next/link';
import Image from 'next/image';

export function Header() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-[#1a3a52] to-[#2d5a7b] text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-3 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/icons/money.svg"
              alt="Icono de dólar - DolarInfoHoy"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />

            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-semibold">DolarInfoHoy</span>
              <p className="text-[10px] sm:text-xs font-semibold hidden sm:block">Cotización en tiempo real</p>
            </div>
          </Link>

          <div className="flex items-center gap-6">

            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center bg-[#2d5a7b] text-white p-1.5 sm:p-2 rounded-full 
                        text-sm font-medium transition-all duration-700 ease-in-out hover:scale-110 
                        border-2 border-white cursor-pointer shadow-lg"
              aria-label="Abrir calculadora de dólar"
            >
              <Calculator color="white" className="size-4 sm:size-5" />
            </button>

          </div>

        </div>
      </header>

      <CalculatorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <Carousel/>
    </>
  );
}