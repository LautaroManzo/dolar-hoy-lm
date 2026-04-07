import ErrorPage from './components/ErrorPage'

export default function NotFound() {
  return (
    <ErrorPage 
      error="Página no encontrada"
      errorCode="404"
    />
  )
}
