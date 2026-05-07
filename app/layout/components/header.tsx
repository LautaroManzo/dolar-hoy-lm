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

          <a
            href="https://t.me/DolarInfoHoy"
            target="_blank"
            rel="noopener noreferrer"
            title="Canal de Telegram"
            className="opacity-80 hover:opacity-100 transition-opacity"
            aria-label="Canal de Telegram"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>

        </div>
      </header>

      <Carousel/>
    </>
  );
}