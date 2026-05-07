import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">

        <div className="flex justify-center mb-6">
          <a
            href="https://t.me/DolarInfoHoy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 bg-white/10 hover:bg-black/20 rounded-full px-4 py-2.5 sm:px-5 transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            <span className="text-xs sm:text-sm font-medium">Canal de Telegram</span>
          </a>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>

        <div className="flex flex-col md:flex-row justify-evenly items-center gap-4 mb-6">
          <div className="text-[9px] sm:text-[11px] uppercase tracking-widest opacity-60">
            © {currentYear} • DolarInfoHoy • Todos los derechos reservados
          </div>
          
          <div className="text-[10px] sm:text-[12px] opacity-60 italic flex gap-2">
            <span>Datos provistos por</span>
            <div className="flex gap-1.5">
              <a 
                href="https://dolarapi.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                DolarApi
              </a>
              <span>&</span>
              <a 
                href="https://argentinadatos.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                ArgentinaDatos API
              </a>
              <span>&</span>
              <a 
                href="https://newsapi.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                News API
              </a>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>

        <div className="max-w-3xl mx-auto">
          <p className="text-center text-[11px] leading-relaxed opacity-50 hover:opacity-80 transition-opacity duration-300">
            <strong className="text-white/80">Aviso legal:</strong> Los datos mostrados son de carácter informativo y se obtienen de fuentes públicas y APIs de terceros. No constituyen una recomendación de inversión ni oferta de operación. El mercado del dólar informal (blue) no posee cotización oficial. <strong>DólarInfoHoy</strong> no se responsabiliza por errores u omisiones en la información ni por decisiones tomadas en base a la misma.
          </p>
          <div className="flex justify-center gap-4 mt-4 text-[10px] opacity-50">
            <Link href="/politica-de-privacidad" className="underline hover:opacity-100 transition-opacity">
              Política de Privacidad
            </Link>
            <Link href="/terminos-y-condiciones" className="underline hover:opacity-100 transition-opacity">
              Términos y Condiciones
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}