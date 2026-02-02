import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dolarinfohoy.com.ar'
  
  const fecha = new Date();
  const fechaArgentina = new Date(fecha.toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' }));
  return [
    {
      url: baseUrl,
      lastModified: fechaArgentina,
      changeFrequency: 'hourly',
      priority: 1,
    }
  ]
}