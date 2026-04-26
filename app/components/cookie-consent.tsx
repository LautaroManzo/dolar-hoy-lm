'use client'

import { useState } from 'react'
import Script from 'next/script'

const CONSENT_KEY = 'cookie_consent'

type Consent = 'accepted' | 'rejected' | null

export default function CookieConsent({ gaId }: { gaId: string }) {
  const [consent, setConsent] = useState<Consent>(() => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(CONSENT_KEY) as Consent
  })
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return !localStorage.getItem(CONSENT_KEY)
  })

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setConsent('accepted')
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setConsent('rejected')
    setVisible(false)
  }

  return (
    <>
      {consent === 'accepted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}

      {visible && (
        <div
          role="dialog"
          aria-label="Aviso de cookies"
          aria-live="polite"
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          <div className="bg-white shadow-[0_-4px_32px_rgba(0,0,0,0.1)] border-t border-slate-100 px-6 py-5">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-lg font-bold text-[#1a3a52] mb-1">Este sitio utiliza cookies</p>
                <p className="text-base text-slate-500 leading-relaxed">
                  Usamos cookies para mejorar tu experiencia en el sitio. Tu elección no cambia el contenido ni cómo funciona.{' '}
                  Leé la{' '}
                  <a href="/politica-de-privacidad" className="underline hover:text-[#1a3a52] transition-colors">
                    política de privacidad
                  </a>.
                </p>
              </div>
              <div className="flex sm:flex-col flex-row gap-2 shrink-0 sm:w-36 w-full">
                <button
                  onClick={accept}
                  className="w-full py-2.5 text-sm font-semibold text-white bg-[#1a3a52] hover:bg-[#2d5a7b] rounded-lg transition-colors cursor-pointer"
                >
                  Aceptar
                </button>
                <button
                  onClick={reject}
                  className="w-full py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Rechazar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
