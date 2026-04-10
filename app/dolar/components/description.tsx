import Image from "next/image";

const Description = () => {
    return (
        <section
            className="relative min-h-[400px] flex items-center overflow-hidden"
        >
            <Image
                src="/images/edificios.jpg"
                alt="Vista de edificios en Buenos Aires, Argentina"
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority
            />
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.7) 80%, #fcf7f8 100%)`
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">

                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-6 leading-tight">
                    Dólar Blue <span className="text-[#1a3a52]">hoy</span> — cotizaciones en tiempo real
                </h1>

                <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto">
                    Consultá el precio del dólar blue, oficial, MEP, CCL, tarjeta y cripto en Argentina, al instante.
                </p>

            </div>
        </section>
    );
};

export default Description;
