import { useEffect, useRef, lazy, Suspense } from 'react'

// Lazy-load ShaderGradient (Three.js ~500KB) — ne bloque pas le premier rendu
const Background = lazy(() => import('./background'))

function Opener() {
  const bgContainerRef = useRef(null)
  const nameRef = useRef(null)
  const arrowRef = useRef(null)
  const rafPending = useRef(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const applyScroll = () => {
      rafPending.current = false
      const scrollY = lastScrollY.current
      const wh = window.innerHeight

      const p1 = Math.min(scrollY / wh, 1)
      const p2 = Math.max(0, Math.min((scrollY - wh) / wh, 1))

      // CSS transform sur le conteneur — ShaderGradient ne re-render plus jamais
      if (bgContainerRef.current) {
        const zoom = scrollY < wh ? 1 + p1 * 4 : 5
        bgContainerRef.current.style.transform = `scale(${zoom})`
      }

      if (nameRef.current) {
        nameRef.current.style.opacity = scrollY < wh ? p1 : Math.max(0, 1 - p2)
      }

      if (arrowRef.current) {
        arrowRef.current.style.opacity = p1 < 1 ? 1 : 0
      }
    }

    const handleScroll = () => {
      lastScrollY.current = window.scrollY
      if (!rafPending.current) {
        rafPending.current = true
        requestAnimationFrame(applyScroll)
      }
    }

    // passive: true → le navigateur n'attend pas le handler avant de scroller
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-black">
      {/* Conteneur zoomable via CSS transform — ShaderGradient rendu une seule fois */}
      <div
        ref={bgContainerRef}
        className="absolute top-0 left-0 w-full h-full origin-center"
        style={{ transform: 'scale(1)', willChange: 'transform' }}
      >
        <Suspense fallback={null}>
          <Background />
        </Suspense>
      </div>

      {/* Nom — opacity gérée par RAF, pas par React state */}
      <div
        ref={nameRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[clamp(2rem,8vw,6rem)] font-bold tracking-tight font-sans z-30 pointer-events-none whitespace-nowrap"
        style={{ opacity: 0 }}
      >
        William Peynichou
      </div>

      {/* Flèche de scroll */}
      <div
        ref={arrowRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 bounce-animation"
        style={{ opacity: 1 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white/80"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  )
}

export default Opener
