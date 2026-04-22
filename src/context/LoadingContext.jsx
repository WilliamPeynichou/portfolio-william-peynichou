import { createContext, useContext, useState } from 'react'

const LoadingContext = createContext(null)

export function LoadingProvider({ children }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <LoadingContext.Provider value={{ loaded, setLoaded }}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)
