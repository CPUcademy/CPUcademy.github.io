import { useRouteError, Link } from 'react-router-dom'
import { useEffect } from "react"

function ErrorPage() {
  useEffect(() => {
    document.title = 'Error'
  }, [])

  const error = useRouteError()
  console.error(error)

  return (
    <div className="container-fluid text-center" style={{ padding: '4rem 1rem' }}>
      <h1 className="font-weight-bold">Oops!</h1>
      <p>This page doesn't exist.</p>
      <Link to="/" className="small-button">Go back home</Link>
    </div>
  )
}

export default ErrorPage