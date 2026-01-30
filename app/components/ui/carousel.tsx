"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

export function Carousel() {
  const items = [
    "Los valores expresados son meramente informativos y de referencia.",
    "No realizamos operaciones de compra, venta o intermediación de divisas.",
    "Tu referencia diaria para el dólar en Argentina.",
    "No nos responsabilizamos por decisiones tomadas en base a estos datos.",
    "La cotización puede variar según la entidad.",
    "Datos de público acceso provenientes de fuentes verificadas.",
    "Consulte con su entidad bancaria antes de realizar cualquier operación."
  ];

  const infiniteItems = [...items, ...items];

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      watchDrag: false,
    },
    [
      AutoScroll({
        speed: 0.6,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        stopOnFocusIn: false,
      })
    ]
  );

  return (
    <div className="bg-gray-200 py-2 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {infiniteItems.map((text, i) => ( 
              <div
                key={i}
                className="flex-[0_0_auto] px-35 whitespace-nowrap text-center text-xs tracking-wide opacity-90"
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
