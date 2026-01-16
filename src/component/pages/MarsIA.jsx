import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'
import { projects } from '@/data/projects'
import Footer from '@/component/layout/footer'
import Header from '@/component/layout/header'
import { animate, stagger } from 'animejs'

function TitleOpener({ title, titleOpacity, subtitle, language }) {
  const [displayText, setDisplayText] = useState(title)
  const chars = 'ABCDEFGYIJKLNOPQRSTUVWXYZ'
  const intervalRef = useRef(null)

  const scramble = () => {
    let iteration = 0
    clearInterval(intervalRef.current)
    
    intervalRef.current = setInterval(() => {
      setDisplayText(title.split("")
        .map((char, index) => {
          if (index < iteration) {
            return title[index]
          }
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join("")
      )
      
      if (iteration >= title.length) {
        clearInterval(intervalRef.current)
      }
      
      iteration += 1 / 3
    }, 30)
  }

  useEffect(() => {
    scramble()
    return () => clearInterval(intervalRef.current)
  }, [title])

  return (
    <div 
      className="absolute inset-0 flex flex-col items-center justify-center z-10"
      style={{ opacity: titleOpacity }}
    >
      <h1 
        className="text-6xl md:text-[12rem] font-bold tracking-tighter text-white text-center leading-none cursor-default"
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        onMouseEnter={scramble}
      >
        {displayText}
      </h1>
      <p className="text-xl md:text-2xl text-white/70 font-light mt-4">
        {subtitle}
      </p>
    </div>
  )
}

function ImageHero({ scrollProgress, titleOpacity, title, subtitle }) {
  const { language } = useLanguage()
  
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-black">
      <TitleOpener 
        title={title} 
        titleOpacity={titleOpacity} 
        subtitle={subtitle} 
        language={language}
      />

      {/* Scroll indicator */}
      {scrollProgress < 0.5 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
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
  )
}

function MarsIA() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const project = projects.find(p => p.slug === 'mars-ia')
  
  const [scrollProgress, setScrollProgress] = useState(0)
  const [titleOpacity, setTitleOpacity] = useState(1)

  // Refs pour les éléments animés
  const headerRef = useRef(null)
  const metaRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    // We don't redirect if project is missing immediately to avoid flicker, usually it should exist if linked correctly.
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const progress = Math.min(scrollY / windowHeight, 1)
      setScrollProgress(progress)
      setTitleOpacity(Math.max(0, 1 - progress * 2))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = { threshold: 0.1 }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === headerRef.current) {
            animate('.fade-up-header', {
              translateY: [30, 0],
              opacity: [0, 1],
              delay: stagger(100),
              easing: 'easeOutExpo',
              duration: 1000
            })
          }
          if (entry.target === metaRef.current) {
            animate('.fade-up-meta', {
              translateY: [20, 0],
              opacity: [0, 1],
              delay: stagger(100),
              easing: 'easeOutExpo',
              duration: 800
            })
          }
          if (entry.target === contentRef.current) {
            animate('.fade-up-content', {
              translateY: [40, 0],
              opacity: [0, 1],
              delay: stagger(200),
              easing: 'easeOutExpo',
              duration: 1200
            })
          }
        }
      });
    }, observerOptions)

    if (headerRef.current) observer.observe(headerRef.current)
    if (metaRef.current) observer.observe(metaRef.current)
    if (contentRef.current) observer.observe(contentRef.current)

    return () => observer.disconnect()
  }, [])

  if (!project) return null

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
      <Header />

      <ImageHero 
        scrollProgress={scrollProgress} 
        titleOpacity={titleOpacity} 
        title="MARS IA"
        subtitle={language === 'fr' ? 'Festival du Court Métrage IA' : 'AI Short Film Festival'}
      />

      <main className="relative z-10 mt-[100vh] pt-48 pb-32 bg-black rounded-t-[3rem]">
        {/* Project Hero Header */}
        <section ref={headerRef} className="max-w-7xl mx-auto px-4 md:px-12 mb-32">
          <h2 className="fade-up-header opacity-0 text-sm font-mono text-gray-500 uppercase tracking-[0.3em] mb-8">
            {language === 'fr' ? 'Présentation du Projet' : 'Project Overview'}
          </h2>
          <h1 className="fade-up-header opacity-0 text-5xl md:text-8xl font-light tracking-tighter leading-tight mb-12">
            Mars IA Festival
          </h1>
          <p className="fade-up-header opacity-0 text-xl md:text-3xl font-light text-gray-400 max-w-3xl leading-relaxed">
            {language === 'fr' 
              ? "Une maquette immersive pour un festival de court métrage pionnier, entièrement dédié aux réalisations par Intelligence Artificielle."
              : "An immersive mockup for a pioneering short film festival, entirely dedicated to Artificial Intelligence creations."}
          </p>
        </section>

        {/* Meta Information Grid */}
        <section ref={metaRef} className="max-w-7xl mx-auto px-4 md:px-12 mb-48 border-t border-white/10 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="fade-up-meta opacity-0">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-4">Year</h3>
              <p className="text-lg font-light">2026</p>
            </div>
            <div className="fade-up-meta opacity-0">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-4">Role</h3>
              <p className="text-lg font-light font-bold text-white">Lead Design</p>
            </div>
            <div className="fade-up-meta opacity-0">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-4">Context</h3>
              <div className="text-lg font-light space-y-1">
                <p>Maquette / Prototype</p>
                <p>Film Festival</p>
              </div>
            </div>
            <div className="fade-up-meta opacity-0">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-4">Live Demo</h3>
              <a href="https://williampeynichou.github.io/marsIA/" target="_blank" rel="noopener noreferrer" className="block text-lg font-light hover:underline decoration-1 underline-offset-4 text-orange-500">
                Visit Website
              </a>
            </div>
          </div>
        </section>

        {/* Detailed Content Sections */}
        <section ref={contentRef} className="max-w-7xl mx-auto px-4 md:px-12 space-y-48">
          
          {/* Section: Context */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <h2 className="fade-up-content opacity-0 text-sm font-mono text-gray-500 uppercase tracking-[0.3em]">
                Design Focus
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="fade-up-content opacity-0 text-2xl md:text-4xl font-light leading-tight text-gray-200">
                {language === 'fr'
                  ? "En tant que Lead Designer sur ce projet, ma mission était de définir l'identité visuelle d'un événement futuriste tout en gardant une accessibilité grand public."
                  : "As Lead Designer on this project, my mission was to define the visual identity of a futuristic event while maintaining mainstream accessibility."}
              </p>
              <div className="fade-up-content opacity-0 mt-12 space-y-6 text-gray-400 text-lg font-light leading-relaxed">
                <p>
                  {language === 'fr'
                    ? "L'esthétique de MarsIA joue sur les codes de la science-fiction et de la technologie, utilisant des contrastes forts et une typographie moderne pour évoquer l'innovation."
                    : "The aesthetics of MarsIA play with science fiction and technology codes, using strong contrasts and modern typography to evoke innovation."}
                </p>
              </div>
            </div>
          </div>

          {/* Section: Live Preview */}
          <div className="fade-up-content opacity-0">
             <div className="w-full aspect-video rounded-lg overflow-hidden border border-white/10 bg-gray-900">
                <iframe 
                  src="https://williampeynichou.github.io/marsIA/" 
                  className="w-full h-full"
                  title="MarsIA Preview"
                />
             </div>
             <div className="flex justify-center mt-4">
                <a 
                  href="https://williampeynichou.github.io/marsIA/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
                >
                  {language === 'fr' ? 'Voir le site complet' : 'View Full Site'}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
             </div>
          </div>

        </section>
        <Footer />
      </main>
    </div>
  )
}

export default MarsIA
