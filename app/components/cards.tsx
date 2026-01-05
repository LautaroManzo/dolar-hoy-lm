"use client";

import { DolarCard } from "./dolar-card";

export function Cards({ data }: { data: any }) {

  return (
    <div className="max-w-6xl mx-auto w-full space-y-10">

      <section>
        <h2 className="text-xl font-semibold mb-5 text-[#1a3a52]">Dólares Principales</h2>
        <div className="grid md:grid-cols-[6fr_4fr] gap-6">
          <DolarCard {...data.blue} />
          <DolarCard {...data.oficial} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-5 text-[#1a3a52]">Dólares Financieros</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <DolarCard {...data.mep} />
          <DolarCard {...data.ccl} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-5 text-[#1a3a52]">Otras Cotizaciones</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <DolarCard {...data.tarjeta} />
          <DolarCard {...data.cripto} />
        </div>
      </section>

    </div>
  );
}