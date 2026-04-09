import { AutoRefreshBadge } from "./auto-refresh-badge";

const Description = () => {
    return (
        <section
            className="relative bg-cover bg-center min-h-[400px] flex items-center"
            style={{ backgroundImage: "url('/images/edificios.jpg')", backgroundSize: 'cover', backgroundPosition: 'center'}}
        >
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.7) 80%, #fcf7f8 100%)`
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">

                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-6 leading-tight">
                    El valor del <span className="text-[#1a3a52]">Dólar</span> en tiempo real.
                </h1>

                <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto mb-6">
                    Consultá los valores actualizados de las variantes del mercado argentino.
                </p>

                <div className="flex justify-center mb-8">
                    <AutoRefreshBadge />
                </div>

            </div>
        </section>
    );
};

export default Description;
