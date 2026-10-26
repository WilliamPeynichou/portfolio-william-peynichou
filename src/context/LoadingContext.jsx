import { useEffect, useState } from 'react'
import { LoadingContext } from './loading-context'

// Filet de sécurité : l'écran de chargement ne doit jamais rester bloqué,
// même si le GLB (42 Mo) ou le HDR externe mettent trop de temps / échouent,
// ou si l'utilisateur arrive directement sur une page sans l'Opener 3D.
const LOADING_FAILSAFE_MS = 4000

export function LoadingProvider({ children }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), LOADING_FAILSAFE_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <LoadingContext.Provider value={{ loaded, setLoaded }}>
      {children}
    </LoadingContext.Provider>
  )
}
