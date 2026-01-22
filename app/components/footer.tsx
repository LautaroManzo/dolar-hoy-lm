export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#1a3a52] to-[#2d5a7b] text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        <div className="flex flex-col md:flex-row justify-evenly items-center gap-4 mb-6">
          <div className="text-[9px] sm:text-[11px] uppercase tracking-widest opacity-60">
            © {currentYear} • DólarAR • Todos los derechos reservados
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
                DolarApi.com
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
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>

        <div className="max-w-3xl mx-auto">
          <p className="text-center text-[11px] leading-relaxed opacity-50 hover:opacity-80 transition-opacity duration-300">
            <strong className="text-white/80">Aviso legal:</strong> Los datos mostrados son de carácter informativo y se obtienen de fuentes públicas y APIs de terceros. No constituyen una recomendación de inversión ni oferta de operación. El mercado del dólar informal (blue) no posee cotización oficial. <strong>DólarAR</strong> no se responsabiliza por errores u omisiones en la información ni por decisiones tomadas en base a la misma.
          </p>
        </div>

      </div>
    </footer>
  );
}