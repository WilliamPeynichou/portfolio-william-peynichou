import { useContext } from 'react'
import { LoadingContext } from './loading-context'

export function useLoading() {
  return useContext(LoadingContext)
}
