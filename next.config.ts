import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  // Optimización de imágenes
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Compresión y optimización
  compress: true,
  poweredByHeader: false,
  
  // Redirects 301 desde URLs antiguas
  redirects: async () => [
    { source: '/dolar-blue', destination: '/dolar/blue', permanent: true },
    { source: '/dolar-oficial', destination: '/dolar/oficial', permanent: true },
    { source: '/dolar-mep', destination: '/dolar/mep', permanent: true },
    { source: '/dolar-ccl', destination: '/dolar/ccl', permanent: true },
    { source: '/dolar-tarjeta', destination: '/dolar/tarjeta', permanent: true },
    { source: '/dolar-cripto', destination: '/dolar/cripto', permanent: true },
  ],

  // Headers de seguridad y caché
  headers: async () => [
    {
      // Íconos y fuentes en /public → caché de 1 año (Next.js maneja /_next/static internamente)
      source: '/icons/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com`,
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self'",
            "connect-src 'self' https://dolarapi.com https://api.argentinadatos.com https://*.supabase.co https://www.google-analytics.com https://*.google-analytics.com",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
          ].join('; '),
        },
      ],
    },
  ],
  
  // Optimización de bundle
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
  },
};

export default nextConfig;
