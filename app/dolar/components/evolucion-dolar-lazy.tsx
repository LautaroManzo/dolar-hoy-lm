'use client';

import dynamic from 'next/dynamic';

const EvolucionDolar = dynamic(() => import('./evolucion-dolar'), { ssr: false });

export default function EvolucionDolarLazy() {
  return <EvolucionDolar />;
}
