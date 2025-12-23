import { useState, useEffect } from 'react'
import NameOpener from './nameOpener'
import Background from './background'

function Opener() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [nameOpacity, setNameOpacity] = useState(0)
  const [backgroundZoom, setBackgroundZoom] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Phase 1 : Premier scroll (0 à 1 fenêtre) - Zoom + Nom apparaît
      const phase1Progress = Math.min(scrollY / windowHeight, 1) // 0 à 1
      
      // Phase 2 : Deuxième scroll (1 à 2 fenêtres) - Nom disparaît
      const phase2Progress = Math.max(0, Math.min((scrollY - windowHeight) / windowHeight, 1)) // 0 à 1
      
      setScrollProgress(phase1Progress)

      // PHASE 1 : Zoom et nom apparaissent
      if (scrollY < windowHeight) {
        setNameOpacity(phase1Progress)
        const zoom = 1 + (phase1Progress * 4) // 1 à 5
        setBackgroundZoom(zoom)
      }
      // PHASE 2 : Nom disparaît, zoom reste
      else if (scrollY >= windowHeight && scrollY < windowHeight * 2) {
        setNameOpacity(Math.max(0, 1 - phase2Progress))
        setBackgroundZoom(5)
      }
      // Après : Nom invisible, zoom reste
      else {
        setNameOpacity(0)
        setBackgroundZoom(5)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-black">
        {/* Background avec zoom */}
        <Background zoom={backgroundZoom} />
        
        {/* Nom "William Peynichou" */}
        <NameOpener opacity={nameOpacity} />

        {/* Flèche de scroll */}
        {scrollProgress < 1 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 bounce-animation">
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
        )}
      </div>
    </>
  )
}

export default Opener;