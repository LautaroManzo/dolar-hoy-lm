"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Description = () => {
    const router = useRouter();

    const getFormattedTime = () => {
        const now = new Date();
        return new Intl.DateTimeFormat('es-AR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'America/Argentina/Buenos_Aires'
        }).format(now);
    };

    const [lastUpdateMessage, setLastUpdateMessage] = useState(`Última actualización hoy a las ${getFormattedTime()} hs`);

    useEffect(() => {
        const refreshMs = 300000;

        const doRefresh = () => {
            router.refresh();
            const time = getFormattedTime();
            setLastUpdateMessage(`Última actualización hoy a las ${time} hs`);
        };

        doRefresh();

        const interval = setInterval(() => {
            doRefresh();
        }, refreshMs);

        return () => clearInterval(interval);
    }, [router]);

    return (
        <section 
            className="relative bg-cover bg-center min-h-[400px] flex items-center"
            style={{ backgroundImage: "url('/images/edificios.jpg')", backgroundSize: 'cover', backgroundPosition: 'center'}}
        >
            <div 
                className="absolute inset-0 w-full h-full" 
                style={{ 
                    background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.7) 80%, #fcf7f8 100%)` 
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
                
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-6 leading-tight">
                    El valor del <span className="text-[#1a3a52]">Dólar</span> en tiempo real.
                </h1>
                
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto mb-6">
                    Consultá los valores actualizados de las variantes del mercado argentino.
                </p>
                                    
                <div className="flex justify-center mb-8">
                    <p className="bg-white/95 backdrop-blur-md px-6 py-2.5 rounded-2xl border border-blue-100 shadow-sm text-sm text-[#1e3a5f] font-bold">
                        {lastUpdateMessage}
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Description;