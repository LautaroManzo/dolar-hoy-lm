/**
 * Convierte un texto en un slug URL-friendly
 * @param text El texto a convertir
 * @returns Un slug limpio y URL-friendly
 */
export function createSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') // Normaliza caracteres acentuados
    .replace(/\u0301/g, '') // Elimina diacríticos (acentos)
    .replace(/\s+/g, '-') // Reemplaza espacios con guiones
    .replace(/[^\w\-]+/g, '') // Elimina caracteres no alfanuméricos excepto guiones
    .replace(/\-\-+/g, '-') // Reemplaza múltiples guiones con uno solo
    .replace(/^-+/, '') // Elimina guiones al inicio
    .replace(/-+$/, ''); // Elimina guiones al final
}

/**
 * Genera un slug único añadiendo un sufijo numérico si es necesario
 * @param text El texto base
 * @param existingSlugs Array de slugs existentes para evitar duplicados
 * @param maxAttempts Máximo de intentos para generar slug único
 * @returns Un slug único
 */
export function createUniqueSlug(
  text: string, 
  existingSlugs: string[] = [], 
  maxAttempts: number = 100
): string {
  let baseSlug = createSlug(text);
  let slug = baseSlug;
  let attempt = 1;

  while (existingSlugs.includes(slug) && attempt <= maxAttempts) {
    slug = `${baseSlug}-${attempt}`;
    attempt++;
  }

  return slug;
}
