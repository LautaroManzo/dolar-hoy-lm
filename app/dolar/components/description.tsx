"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import CalculatorModal from "./calculator";
import { COLORS } from "@/app/constants/colors";

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
                        background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.7) 80%, ${COLORS.bg} 100%)`
                    }}
                />

                <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
                        className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-6 leading-tight"
                    >
                        Dólar Blue <span className="text-brand-primary">hoy</span> en Argentina
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", bounce: 0.3, duration: 0.7, delay: 0.15 }}
                        className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto mb-8"
                    >
                        Consultá el precio del dólar blue, oficial, MEP, CCL, tarjeta y cripto en Argentina, al instante.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5, duration: 0.6, delay: 0.3 }}
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2.5 bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-sm font-semibold px-6 py-3 rounded-full shadow-brand-md hover:shadow-brand-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
                        aria-label="Conversor de Moneda"
                    >
                        <Calculator size={16} />
                        Conversor de Moneda
                    </motion.button>

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
