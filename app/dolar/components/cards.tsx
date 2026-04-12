import { DolarCard } from "./dolar-card";
import ErrorBoundary from "../../shared/ui/error-boundary";
import type { DolarCardData } from "../../types/dolar";

interface CardsProps {
  data: Record<string, DolarCardData>;
}

export function Cards({ data }: CardsProps) {

  return (
    <div className="max-w-6xl mx-auto w-full space-y-10">

      <section>
        <div className="grid md:grid-cols-[6fr_4fr] gap-6">
          <ErrorBoundary>
            <DolarCard {...data.blue} />
          </ErrorBoundary>
          <ErrorBoundary>
            <DolarCard {...data.oficial} />
          </ErrorBoundary>
        </div>
      </section>

      <section aria-labelledby="otras-cotizaciones">

        <h2 id="otras-cotizaciones" className="flex items-center mb-5 text-[#1a3a52] text-2xl tracking-wide opacity-70
            after:content-[''] after:flex-grow after:h-[1px] after:ml-6 
            after:bg-gradient-to-r after:from-transparent after:to-[#1a3a52]/15">
          Otras cotizaciones
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <ErrorBoundary>
            <DolarCard {...data.mep} />
          </ErrorBoundary>
          <ErrorBoundary>
            <DolarCard {...data.ccl} />
          </ErrorBoundary>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ErrorBoundary>
            <DolarCard {...data.tarjeta} />
          </ErrorBoundary>
          <ErrorBoundary>
            <DolarCard {...data.cripto} />
          </ErrorBoundary>
        </div>

      </section>

    </div>
  );
}