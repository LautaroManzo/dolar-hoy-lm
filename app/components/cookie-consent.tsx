'use client'

import { useSyncExternalStore } from 'react'
import Script from 'next/script'

const CONSENT_KEY = 'cookie_consent'

type Consent = 'accepted' | 'rejected' | null

function subscribe(callback: () => void) {
  window.addEventListener('consent-change', callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener('consent-change', callback)
    window.removeEventListener('storage', callback)
  }
}

function getSnapshot(): Consent {
  return localStorage.getItem(CONSENT_KEY) as Consent
}

function getServerSnapshot(): Consent {
  return null
}

function setConsent(value: 'accepted' | 'rejected') {
  localStorage.setItem(CONSENT_KEY, value)
  window.dispatchEvent(new Event('consent-change'))
}

export default function CookieConsent({ gaId }: { gaId: string }) {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const visible = consent === null

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
                <p className="text-lg font-bold text-brand-primary mb-1">Este sitio utiliza cookies</p>
                <p className="text-base text-slate-500 leading-relaxed">
                  Usamos cookies para mejorar tu experiencia en el sitio. Tu elección no cambia el contenido ni cómo funciona.{' '}
                  Leé la{' '}
                  <a href="/politica-de-privacidad" className="underline hover:text-brand-primary transition-colors">
                    política de privacidad
                  </a>.
                </p>
              </div>
              <div className="flex sm:flex-col flex-row gap-2 shrink-0 sm:w-36 w-full">
                <button
                  onClick={() => setConsent('accepted')}
                  className="w-full py-2.5 text-sm font-semibold text-white bg-brand-primary hover:bg-brand-secondary rounded-lg transition-colors cursor-pointer"
                >
                  Aceptar
                </button>
                <button
                  onClick={() => setConsent('rejected')}
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
