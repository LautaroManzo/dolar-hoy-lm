"use client";

import { DolarCard } from "./dolar-card";

export function Cards({ data }: { data: any }) {

  return (
    <div className="max-w-6xl mx-auto w-full space-y-10">

      <section>
        <div className="grid md:grid-cols-[6fr_4fr] gap-6">
          <DolarCard {...data.blue} />
          <DolarCard {...data.oficial} />
        </div>
      </section>

      <section aria-labelledby="otras-cotizaciones">

        <h2 id="otras-cotizaciones" className="flex items-center mb-5 text-[#1a3a52] text-2xl tracking-wide opacity-70
            after:content-[''] after:flex-grow after:h-[1px] after:ml-6 
            after:bg-gradient-to-r after:from-transparent after:to-[#1a3a52]/15">
          Otras cotizaciones
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <DolarCard {...data.mep} />
          <DolarCard {...data.ccl} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <DolarCard {...data.tarjeta} />
          <DolarCard {...data.cripto} />
        </div>

      </section>

    </div>
  );
}