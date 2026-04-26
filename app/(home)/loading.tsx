import { DolarCardSkeleton, ChartSkeleton, NoticiaSkeleton, OtraMonedaSkeleton } from '@/app/components/skeletons'

function Pulse({ className }: { className: string }) {
  return <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />
}

export default function HomeLoading() {
  return (
    <div className="bg-brand-bg">

      {/* Hero */}
      <div className="relative min-h-[400px] flex items-center justify-center animate-pulse bg-slate-100">
        <div className="text-center space-y-4 px-6">
          <div className="h-10 md:h-14 w-72 md:w-96 bg-slate-200 rounded-xl mx-auto" />
          <div className="h-5 w-80 bg-slate-200 rounded-lg mx-auto" />
          <div className="h-5 w-64 bg-slate-200 rounded-lg mx-auto" />
          <div className="h-11 w-44 bg-slate-200 rounded-full mx-auto mt-4" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">

        {/* Cards principales: blue (6fr) + oficial (4fr) */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-[6fr_4fr] gap-6">
            <DolarCardSkeleton />
            <DolarCardSkeleton />
          </div>
        </section>

        {/* Otras cotizaciones */}
        <section className="space-y-6">
          <Pulse className="h-7 w-44" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DolarCardSkeleton />
            <DolarCardSkeleton />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DolarCardSkeleton />
            <DolarCardSkeleton />
          </div>
        </section>

        {/* Otras monedas */}
        <section className="space-y-4">
          <Pulse className="h-6 w-36" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <OtraMonedaSkeleton />
            <OtraMonedaSkeleton />
            <OtraMonedaSkeleton />
            <OtraMonedaSkeleton />
          </div>
        </section>

        {/* Gráfico histórico */}
        <ChartSkeleton height="h-[260px] sm:h-[380px]" />

        {/* Noticias */}
        <section className="space-y-4">
          <Pulse className="h-6 w-24" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <NoticiaSkeleton />
            <NoticiaSkeleton />
          </div>
        </section>

        {/* Preguntas frecuentes */}
        <div className="px-4">
          <div className="bg-white rounded-[15px] shadow-xl p-6 flex items-center justify-between">
            <Pulse className="h-6 w-48" />
            <Pulse className="h-7 w-7 rounded-full" />
          </div>
        </div>

        {/* Sobre nosotros */}
        <div className="px-4">
          <div className="bg-white rounded-[15px] shadow-xl p-6 flex items-center justify-between">
            <Pulse className="h-6 w-36" />
            <Pulse className="h-7 w-7 rounded-full" />
          </div>
        </div>

        {/* Contacto */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="animate-pulse bg-slate-100 h-64 md:h-80" />
            <div className="p-8 space-y-4">
              <Pulse className="h-6 w-40" />
              <Pulse className="h-10 w-full" />
              <Pulse className="h-10 w-full" />
              <Pulse className="h-24 w-full" />
              <Pulse className="h-11 w-full" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
