import { useState, useEffect } from 'react'
import '../styles/globals.css'

const Hydrated = ({ children }) => {
  const [hydration, setHydration] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHydration(true);
    }
  }, [])
  return hydration ? children : null
}

function MyApp({ Component, pageProps }) {
  return (
    <Hydrated>
      <Component {...pageProps} />
    </Hydrated>
  )
}


export default MyApp
