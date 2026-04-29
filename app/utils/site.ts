const TZ_BA = 'America/Argentina/Buenos_Aires';

export function getFechaArgentina(): Date {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ_BA,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = Object.fromEntries(
    formatter.formatToParts(new Date()).map(p => [p.type, p.value])
  );
  return new Date(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
}

export function getFechaHoyFormateada(): string {
  const formatter = new Intl.DateTimeFormat('es-AR', {
    timeZone: TZ_BA,
    day: 'numeric',
    month: 'long',
  });
  const parts = Object.fromEntries(
    formatter.formatToParts(new Date()).map(p => [p.type, p.value])
  );
  return `${parts.day} de ${parts.month}`;
}
