"use client";

import { Carousel } from "../../shared/ui/carousel";
import Link from 'next/link';
import Image from 'next/image';

export function Header() {

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
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

        </div>
      </header>

      <Carousel/>
    </>
  );
}