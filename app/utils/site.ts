/*
 * Obtención de fechas
 */

export function getFechaArgentina(): Date {
  const ahora = new Date();
  const opciones = { 
    timeZone: 'America/Argentina/Buenos_Aires',
    year: 'numeric' as const,
    month: 'numeric' as const, 
    day: 'numeric' as const
  };
  const fechaArgentina = new Date(ahora.toLocaleDateString('en-US', opciones));
  return fechaArgentina;
}


export function getFechaHoyFormateada(): string {
  const fechaArgentina = getFechaArgentina();
  return `${fechaArgentina.getDate()} de ${fechaArgentina.toLocaleString('es-AR', { month: 'long', timeZone: 'America/Argentina/Buenos_Aires' })}`;
}
