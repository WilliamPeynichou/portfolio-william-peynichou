import { lazy, Suspense } from 'react'

const Background = lazy(() => import('./background'))

function Opener() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 bg-black">
      <Suspense fallback={null}>
        <Background />
      </Suspense>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce" style={{ zIndex: 20 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white/70"
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
