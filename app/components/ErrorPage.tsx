import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

interface ErrorPageProps {
  error?: string
  errorCode?: string | number
}

export default function ErrorPage({ 
  error, 
  errorCode
}: ErrorPageProps) {

  const getErrorConfig = () => {
    const code = errorCode?.toString() || ''
    
    if (error && !error.includes('404') && !error.includes('not found')) {
      return {
        title: 'Algo salió mal',
        message: error
      }
    }
    
    if (code === '404' || error?.includes('404') || error?.includes('not found')) {
      return {
        title: 'Página no encontrada',
        message: error?.replace('404 ', '') || 'La página que buscas no existe.'
      }
    }
    
    if (code === '500' || code === '501' || code === '502' || code === '503') {
      return {
        title: 'Problemas técnicos',
        message: 'Estamos trabajando para solucionar unos problemas técnicos. Por favor, intenta nuevamente en unos minutos.'
      }
    }
    
    if (code === '400' || code === '401' || code === '403') {
      return {
        title: 'Acceso no disponible',
        message: 'Esta página no está disponible en este momento.'
      }
    }
    
    return {
      title: 'Algo salió mal',
      message: 'Ha ocurrido un problema inesperado. Por favor, intenta nuevamente.'
    }
  }

  const config = getErrorConfig()

  return (
    <div className="min-h-[calc(100vh-180px)] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-8">

      <div className="max-w-3xl w-full">

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          
          <div className="mb-6 flex justify-center">

            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-10 h-10 text-slate-600" />
            </div>

          </div>
          
          <div className="mb-4">
            <span className="text-2xl text-slate-500 font-medium uppercase tracking-wider">
              {errorCode}
            </span>
          </div>
          
          <h1 className="mb-4 text-3xl font-bold text-slate-900">
            {config.title}
          </h1>
          
          <p className="mb-8 text-slate-600 leading-relaxed text-lg">
            {config.message}
          </p>

          <Link
            href="/"
            className="inline-block w-full px-6 py-3 bg-brand-secondary text-white font-medium rounded-lg hover:bg-brand-primary transition-colors"
          >
            Volver al inicio
          </Link>

        </div>

      </div>

    </div>
  )
}
