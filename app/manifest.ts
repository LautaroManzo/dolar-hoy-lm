import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DolarInfoHoy - Cotización del Dólar',
    short_name: 'DolarInfoHoy',
    description: 'Cotización del dólar blue, oficial, MEP y CCL en tiempo real en Argentina',
    start_url: '/',
    display: 'standalone',
    background_color: '#fcf7f8',
    theme_color: '#1a3a52',
    icons: [
      {
        src: '/icons/money.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
