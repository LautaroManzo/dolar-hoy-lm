import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'DolarInfoHoy - Cotización del Dólar en Argentina'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a3a52 0%, #2d5a7b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
          <span style={{ fontSize: '72px', lineHeight: 1 }}>💵</span>
          <span
            style={{
              color: 'white',
              fontSize: '56px',
              fontWeight: 'bold',
              letterSpacing: '-1px',
            }}
          >
            DolarInfoHoy
          </span>
        </div>
        <p
          style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '30px',
            margin: '0 0 16px 0',
            textAlign: 'center',
          }}
        >
          Cotización del Dólar en Argentina
        </p>
        <p
          style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: '22px',
            margin: '0 0 48px 0',
            textAlign: 'center',
          }}
        >
          Blue · Oficial · MEP · CCL · Tarjeta · Cripto
        </p>
        <div
          style={{
            padding: '12px 36px',
            background: 'rgba(255,255,255,0.18)',
            borderRadius: '100px',
            color: 'white',
            fontSize: '20px',
          }}
        >
          dolarinfohoy.com.ar
        </div>
      </div>
    ),
    { ...size }
  )
}
