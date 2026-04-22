function LoadingOverlay({ visible }) {
  return (
    <div
      className="absolute inset-0 bg-black flex flex-col items-center justify-center gap-10 pointer-events-none transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0, zIndex: 10 }}
    >
      {/* Anneau "comète" : conic-gradient + mask radial */}
      <div className="relative flex items-center justify-center">
        <div
          className="animate-spin"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.9) 100%)',
            WebkitMask: 'radial-gradient(farthest-side, transparent 73%, black 74%)',
            mask: 'radial-gradient(farthest-side, transparent 73%, black 74%)',
            animationDuration: '1.1s',
            animationTimingFunction: 'linear',
          }}
        />
        {/* Halo central */}
        <div
          className="absolute rounded-full"
          style={{
            width: '8px',
            height: '8px',
            background: 'rgba(255,255,255,0.15)',
            boxShadow: '0 0 12px 4px rgba(255,255,255,0.08)',
          }}
        />
      </div>

      {/* Nom en filigrane */}
      <span
        style={{
          color: 'rgba(255,255,255,0.18)',
          fontSize: '0.6rem',
          letterSpacing: '0.45em',
          textTransform: 'uppercase',
          fontWeight: 300,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        William Peynichou
      </span>
    </div>
  )
}

export default LoadingOverlay
