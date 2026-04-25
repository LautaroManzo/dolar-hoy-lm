function Pulse({ className }: { className: string }) {
  return <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />
}

export function DolarCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border-t-4 border-slate-200 px-5 py-6">
      <div className="flex justify-between items-start mb-5">
        <Pulse className="h-5 w-28" />
        <Pulse className="h-5 w-16 rounded-full" />
      </div>
      <div className="flex gap-8 mt-2">
        <div className="flex-1 space-y-2">
          <Pulse className="h-3 w-12" />
          <Pulse className="h-8 w-24" />
        </div>
        <div className="flex-1 space-y-2">
          <Pulse className="h-3 w-12" />
          <Pulse className="h-8 w-24" />
        </div>
      </div>
      <Pulse className="h-3 w-36 mt-5" />
      <div className="flex gap-2 mt-5">
        <Pulse className="h-8 w-8 rounded-xl" />
        <Pulse className="h-8 w-8 rounded-xl" />
        <Pulse className="h-8 w-8 rounded-xl" />
      </div>
    </div>
  )
}

export function ChartSkeleton({ height = 'h-[320px]' }: { height?: string }) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <Pulse className="h-6 w-44" />
        <Pulse className="h-9 w-full sm:w-52 rounded-xl" />
      </div>
      <div className="flex justify-end gap-4 mb-4">
        <Pulse className="h-3 w-14" />
        <Pulse className="h-3 w-14" />
      </div>
      <Pulse className={`w-full ${height} rounded-xl`} />
    </div>
  )
}

export function NoticiaSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <Pulse className="h-52 w-full rounded-none rounded-t-2xl" />
      <div className="p-5 space-y-3">
        <Pulse className="h-3 w-20" />
        <Pulse className="h-5 w-full" />
        <Pulse className="h-5 w-4/5" />
        <Pulse className="h-3 w-full" />
        <Pulse className="h-3 w-11/12" />
        <Pulse className="h-3 w-3/4" />
      </div>
    </div>
  )
}

export function OtraMonedaSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
      <div className="flex justify-between items-center">
        <Pulse className="h-5 w-20" />
        <Pulse className="h-4 w-12 rounded-full" />
      </div>
      <div className="flex gap-6">
        <div className="space-y-1.5">
          <Pulse className="h-2.5 w-10" />
          <Pulse className="h-6 w-16" />
        </div>
        <div className="space-y-1.5">
          <Pulse className="h-2.5 w-10" />
          <Pulse className="h-6 w-16" />
        </div>
      </div>
    </div>
  )
}
