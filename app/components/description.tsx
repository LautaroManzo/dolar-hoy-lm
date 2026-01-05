import React from 'react';

const Description = () => {

    const now = new Date();
    const time = now.toLocaleTimeString('es-AR', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
    });

    const lastUpdateMessage = `Última actualización hoy a las ${time} hs`;

    return (
    <section 
      className="relative bg-cover bg-center"
      style={{ backgroundImage: "url('/edificios.jpg')" }}
    >
      <div 
        className="w-full h-full" 
        style={{ 
          background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.7) 80%, #fcf7f8 100%)` 
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-6 leading-tight">
            El valor del <span className="text-[#1a3a52]">Dólar</span> en tiempo real.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto mb-6">
            Consultá los valores actualizados de las variantes del mercado argentino.
          </p>
                        
          <div className="flex justify-center mb-8">
            <p className="bg-white/95 backdrop-blur-md px-6 py-2.5 rounded-full border border-blue-100 shadow-sm text-sm text-[#1e3a5f] font-bold">
              {lastUpdateMessage}.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Description;