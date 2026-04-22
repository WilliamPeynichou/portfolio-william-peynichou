import { useEffect, useState } from 'react'
import { useLoading } from '../context/LoadingContext'

function LoadingScreen() {
  const { loaded } = useLoading()
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (loaded) {
      const t = setTimeout(() => setHidden(true), 750)
      return () => clearTimeout(t)
    }
  }, [loaded])

  if (hidden) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: loaded ? 0 : 1,
        transition: 'opacity 0.75s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: loaded ? 'none' : 'auto',
      }}
    >
      <span
        style={{
          color: 'rgba(255,255,255,0.85)',
          fontSize: '1rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          fontWeight: 300,
          fontFamily: 'system-ui, sans-serif',
          userSelect: 'none',
          animation: 'pulse 1.6s ease-in-out infinite',
        }}
      >
        William Peynichou
      </span>
    </div>
  )
}

export default LoadingScreen
