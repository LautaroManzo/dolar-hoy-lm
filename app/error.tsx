'use client'

import { useEffect } from 'react'
import ErrorPage from './components/ErrorPage'

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error de la aplicación:', error)
  }, [error])

  const extractErrorCode = (errorMessage: string) => {
    const match = errorMessage.match(/^(\d{3})/)
    return match ? match[1] : null
  }

  const errorCode = extractErrorCode(error.message) || error.name

  return (
    <ErrorPage 
      error={error.message}
      errorCode={errorCode}
    />
  )
}
