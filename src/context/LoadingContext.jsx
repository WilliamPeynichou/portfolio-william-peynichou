import { useState } from 'react'
import { LoadingContext } from './loading-context'

export function LoadingProvider({ children }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <LoadingContext.Provider value={{ loaded, setLoaded }}>
      {children}
    </LoadingContext.Provider>
  )
}
