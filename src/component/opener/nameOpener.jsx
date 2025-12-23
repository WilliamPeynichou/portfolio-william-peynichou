function NameOpener({ opacity = 0 }) {
  return (
    <div 
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[clamp(2rem,8vw,6rem)] font-bold tracking-tight font-sans transition-opacity duration-300 ease-in-out z-30 pointer-events-none whitespace-nowrap"
      style={{ opacity }}
    >
      William Peynichou
    </div>
  )
}

export default NameOpener

