"use client";

import Image from "next/image";
import { useState } from "react";
import { Calculator } from "lucide-react";
import CalculatorModal from "./calculator";

const Description = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section
                className="relative min-h-[400px] flex items-center overflow-hidden"
            >
                <Image
                    src="/images/edificios.jpg"
                    alt="Vista de edificios en Buenos Aires, Argentina"
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                    priority
                />
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.7) 80%, #fcf7f8 100%)`
                    }}
                />

                <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">

                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-6 leading-tight">
                        Dólar Blue <span className="text-[#1a3a52]">hoy</span> en Argentina
                    </h1>

                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto mb-8">
                        Consultá el precio del dólar blue, oficial, MEP, CCL, tarjeta y cripto en Argentina, al instante.
                    </p>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#1a3a52] to-[#2d5a7b] text-white text-sm font-semibold px-6 py-3 rounded-full shadow-[0_6px_24px_rgba(26,58,82,0.35)] hover:shadow-[0_10px_32px_rgba(26,58,82,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
                        aria-label="Abrir calculadora de dólar"
                    >
                        <Calculator size={16} />
                        Conversor de Moneda
                    </button>

                </div>
            </section>

            <CalculatorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default Description;
