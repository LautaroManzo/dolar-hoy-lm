import { DolarCardSkeleton, ChartSkeleton } from '@/app/components/skeletons'

function Pulse({ className }: { className: string }) {
  return <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />
}

export default function DolarTypePageSkeleton() {
  return (
    <div className="bg-[#fcf7f8] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">

        {/* Breadcrumb */}
        <Pulse className="h-4 w-40" />

        {/* Card principal */}
        <DolarCardSkeleton />

        {/* Gráfico histórico */}
        <ChartSkeleton height="h-[240px] sm:h-[320px]" />

        {/* Editorial */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-slate-200 p-6 sm:p-8 space-y-3">
          <Pulse className="h-5 w-48" />
          <Pulse className="h-3 w-full" />
          <Pulse className="h-3 w-11/12" />
          <Pulse className="h-3 w-4/5" />
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-slate-200 p-6 sm:p-8 space-y-4">
          <Pulse className="h-6 w-52" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border-b border-slate-100 pb-4 space-y-2">
              <Pulse className="h-4 w-full" />
              <Pulse className="h-4 w-3/4" />
            </div>
          ))}
        </div>

        {/* Otras cotizaciones */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-slate-200 p-6 sm:p-8 space-y-4">
          <Pulse className="h-6 w-44" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
            {[...Array(5)].map((_, i) => (
              <Pulse key={i} className="h-14 rounded-xl" />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
