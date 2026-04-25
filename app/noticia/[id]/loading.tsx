function Pulse({ className }: { className: string }) {
  return <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />
}

export default function NoticiaLoading() {
  return (
    <div className="bg-[#fcf7f8]">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <Pulse className="h-4 w-40 mb-6" />

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Imagen */}
          <div className="animate-pulse bg-slate-200 h-96 w-full" />

          <div className="p-6 sm:p-8 space-y-4">
            {/* Fecha */}
            <Pulse className="h-4 w-32" />
            {/* Título */}
            <Pulse className="h-7 w-full" />
            <Pulse className="h-7 w-3/4" />
            {/* Contenido */}
            <div className="pt-2 space-y-2">
              <Pulse className="h-4 w-full" />
              <Pulse className="h-4 w-full" />
              <Pulse className="h-4 w-11/12" />
              <Pulse className="h-4 w-full" />
              <Pulse className="h-4 w-4/5" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
