export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#1a3a52] to-[#2d5a7b] text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
          
          <div className="text-[11px] uppercase tracking-widest opacity-60">
            © {currentYear} • Todos los derechos reservados
          </div>

        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>

        <div className="max-w-3xl mx-auto">

          <p className="text-center text-[11px] leading-relaxed opacity-50 hover:opacity-80 transition-opacity duration-300">
            <strong className="text-white/80">Aviso legal:</strong> Los datos mostrados son de carácter informativo y no constituyen una recomendación de inversión ni oferta de operación. El mercado del dólar informal no posee cotización oficial. <span className="font-semibold">DólarAR</span> no se responsabiliza por el uso de la información aquí expuesta.
          </p>

        </div>

      </div>
    </footer>
  );
}