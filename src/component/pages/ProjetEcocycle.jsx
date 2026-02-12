import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'
import { projects } from '@/data/projects'
import ReactIcon from '@/components/icons/react-icon'
import Footer from '@/component/layout/footer'
import Header from '@/component/layout/header'
import ImageModal from '@/component/ImageModal'

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

function ProjetEcocycle() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [titleOpacity, setTitleOpacity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(null)

  const project = projects.find(p => p.slug === 'ecocycle')

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!project) {
      navigate('/')
    }
  }, [project, navigate])

  useEffect(() => {
    let rafId = null
    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const windowHeight = window.innerHeight
        const progress = Math.min(scrollY / windowHeight, 1)
        setScrollProgress(progress)
        setTitleOpacity(Math.max(0, 1 - progress * 2))
        rafId = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  if (!project) return null

  return (
    <div className="relative font-sans text-white bg-black">
      <Header />

      <ImageHero 
        scrollProgress={scrollProgress} 
        titleOpacity={titleOpacity} 
        title="Ecocycle"
        subtitle={language === 'fr' ? 'Écologie & Recyclage' : 'Ecology & Recycling'}
      />

      <div className="relative z-10 mt-[100vh]">
        <div className="min-h-screen rounded-t-[3rem] bg-black pt-20 pb-20">
          <div className="max-w-7xl mx-auto px-4 md:px-12">
            <div className="mb-12">
              <Link 
                to="/" 
                className="inline-flex items-center text-sm font-mono text-gray-500 hover:text-white transition-colors"
              >
                ← {language === 'fr' ? 'Retour' : 'Back'}
              </Link>
            </div>

            <div className="mb-16">
              <h1 className="text-4xl md:text-8xl font-light tracking-tight mb-6">
                {project.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl">
                {project.type}
              </p>
            </div>

            <div 
              className="w-full md:w-1/2 mx-auto aspect-video rounded-lg overflow-hidden bg-gray-900 mb-20 cursor-zoom-in"
              onClick={() => setSelectedImage(project.image)}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
              <div className="md:col-span-4 space-y-8">
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                    {language === 'fr' ? 'Année' : 'Year'}
                  </h3>
                  <p className="text-lg">{project.year}</p>
                </div>

                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {project.githubLink && (
                  <div>
                    <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                      Code
                    </h3>
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white hover:underline decoration-1 underline-offset-4">
                      <ReactIcon className="w-5 h-5" />
                      GitHub Repository
                    </a>
                  </div>
                )}
              </div>

              <div className="md:col-span-8">
                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                  {language === 'fr' ? 'À propos' : 'About'}
                </h3>
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-300 leading-relaxed text-xl font-light">
                    {project.description?.[language] || project.description?.['en']}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>

      <ImageModal 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
        imageSrc={selectedImage} 
        altText={project.title}
      />
    </div>
  )
}

export default ProjetEcocycle
