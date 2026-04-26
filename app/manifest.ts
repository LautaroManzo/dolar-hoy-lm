import { MetadataRoute } from 'next'
import { COLORS } from './constants/colors'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DolarInfoHoy - Cotización del Dólar',
    short_name: 'DolarInfoHoy',
    description: 'Cotización del dólar blue, oficial, MEP y CCL en tiempo real en Argentina',
    start_url: '/',
    display: 'standalone',
    background_color: COLORS.bg,
    theme_color: COLORS.primary,
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
