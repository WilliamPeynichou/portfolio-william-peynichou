import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'
import { workflows } from '@/data/workflows'
import Footer from '@/component/layout/footer'
import Header from '@/component/layout/header'
import ImageModal from '@/component/ImageModal'

// Import des images techniques
import WorkflowBotVeille from '@/assets/WorkflowBotVeille.webp'
import WorkflowInputBotVeilleDiscord from '@/assets/WorkflowInputBotVeilleDiscord.webp'
import WorkflowOutputBotVeilleDiscord from '@/assets/WorkflowOutputBotVeilleDiscord.webp'
import WorkflowRep1BotDiscord from '@/assets/WorkflowRep1BotDiscord.webp'
import WorkflowRep2BotDiscord from '@/assets/WorkflowRep2BotDiscord.webp'

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
        className="text-6xl md:text-[10rem] font-bold tracking-tighter text-white text-center leading-none cursor-default"
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

function WorkflowHero({ scrollProgress, titleOpacity, title, subtitle }) {
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

function DiscordVeille() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [titleOpacity, setTitleOpacity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(null)

  const workflow = workflows.find(w => w.slug === 'bot-veille-discord')

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!workflow) {
      navigate('/')
    }
  }, [workflow, navigate])

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

  if (!workflow) return null

  return (
    <div className="relative font-sans text-white bg-black">
      <Header />

      <WorkflowHero 
        scrollProgress={scrollProgress} 
        titleOpacity={titleOpacity} 
        title="DISCORD VEILLE"
        subtitle={language === 'fr' ? 'Bot de Veille Automatisé' : 'Automated Monitoring Bot'}
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
                {workflow.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl">
                {workflow.type}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
              <div className="md:col-span-4 space-y-8">
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                    {language === 'fr' ? 'Année' : 'Year'}
                  </h3>
                  <p className="text-lg">{workflow.year}</p>
                </div>

                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {workflow.technologies?.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-8">
                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                  {language === 'fr' ? 'À propos' : 'About'}
                </h3>
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-300 leading-relaxed text-xl font-light whitespace-pre-line">
                    {language === 'fr' 
                      ? "Ce bot de veille automatisé est conçu pour transformer le bruit du web en informations exploitables. Chaque lundi matin, un trigger n8n lance une routine d'extraction et d'analyse profonde. \n\nAu cœur du système, un agent de recherche propulsé par Google Gemini scrute les sources les plus fiables (blogs officiels de frameworks, fils de sécurité, actualités IA) pour en extraire l'essence. L'IA ne se contente pas de copier des liens : elle synthétise les avancées majeures, comme les mises à jour de React 19 ou les vulnérabilités Zero-Day, pour les présenter de manière structurée directement sur Discord."
                      : "This automated monitoring bot is designed to transform web noise into actionable information. Every Monday morning, an n8n trigger starts a routine of extraction and deep analysis. \n\nAt the system's core, a research agent powered by Google Gemini scans the most reliable sources (official framework blogs, security feeds, AI news) to extract the essence. The AI doesn't just copy links: it synthesizes major advancements, such as React 19 updates or Zero-Day vulnerabilities, to present them in a structured way directly on Discord."}
                  </p>
                </div>

                <div className="mt-16 space-y-12">
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest">
                    {language === 'fr' ? 'Fonctionnement du Workflow' : 'Workflow Mechanics'}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Trigger Hebdomadaire
                      </h4>
                      <p className="text-gray-400 text-sm font-light">
                        {language === 'fr' 
                          ? "Déclenchement automatique chaque lundi pour capturer l'essentiel de la semaine passée."
                          : "Automatic trigger every Monday to capture the essentials of the past week."}
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Research Agent (Gemini)
                      </h4>
                      <p className="text-gray-400 text-sm font-light">
                        {language === 'fr' 
                          ? "Analyse sémantique et filtrage des informations par IA pour éviter la surcharge cognitive."
                          : "Semantic analysis and AI information filtering to avoid cognitive overload."}
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Synthèse Discord
                      </h4>
                      <p className="text-gray-400 text-sm font-light">
                        {language === 'fr' 
                          ? "Formatage en Markdown pour une lecture rapide et agréable dans les canaux de veille."
                          : "Markdown formatting for quick and pleasant reading in monitoring channels."}
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        Multi-catégories
                      </h4>
                      <p className="text-gray-400 text-sm font-light">
                        {language === 'fr' 
                          ? "Frameworks, IA, Sécurité : une couverture complète de l'écosystème web."
                          : "Frameworks, AI, Security: complete coverage of the web ecosystem."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section Détails Techniques */}
                <div className="mt-32 space-y-24">
                  <div>
                    <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-12">
                      {language === 'fr' ? 'Architecture & Coulisses' : 'Architecture & Behind the Scenes'}
                    </h3>
                    
                    {/* Workflow Global */}
                    <div className="space-y-8 mb-24">
                      <div 
                        className="w-full rounded-2xl overflow-hidden border border-white/10 bg-gray-900/50 p-2 cursor-zoom-in"
                        onClick={() => setSelectedImage(WorkflowBotVeille)}
                      >
                        <img src={WorkflowBotVeille} alt="Full Workflow" className="w-full h-auto rounded-xl transition-transform duration-500 hover:scale-[1.02]" />
                      </div>
                      <div className="max-w-3xl">
                        <h4 className="text-xl font-medium mb-4 text-white">
                          {language === 'fr' ? 'Le Workflow en Action' : 'The Workflow in Action'}
                        </h4>
                        <p className="text-gray-400 font-light leading-relaxed">
                          {language === 'fr' 
                            ? "Vue d'ensemble du canevas n8n montrant la séquence logique complète, du déclencheur temporel jusqu'à l'envoi final sur Discord."
                            : "Overview of the n8n canvas showing the complete logical sequence, from the time trigger to the final Discord post."}
                        </p>
                      </div>
                    </div>

                    {/* Input & Output */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                      <div className="space-y-6">
                        <div 
                          className="aspect-video rounded-xl overflow-hidden border border-white/10 bg-gray-900/50 p-2 cursor-zoom-in"
                          onClick={() => setSelectedImage(WorkflowInputBotVeilleDiscord)}
                        >
                          <img src={WorkflowInputBotVeilleDiscord} alt="Workflow Input" className="w-full h-full object-contain transition-transform duration-500 hover:scale-105" />
                        </div>
                        <h4 className="text-lg font-medium text-white">{language === 'fr' ? 'Structure des Données d\'Entrée' : 'Input Data Structure'}</h4>
                        <p className="text-gray-400 text-sm font-light">
                          {language === 'fr'
                            ? "Analyse des paramètres d'entrée et de la configuration initiale transmise à l'agent de recherche."
                            : "Analysis of input parameters and the initial configuration passed to the research agent."}
                        </p>
                      </div>
                      <div className="space-y-6">
                        <div 
                          className="aspect-video rounded-xl overflow-hidden border border-white/10 bg-gray-900/50 p-2 cursor-zoom-in"
                          onClick={() => setSelectedImage(WorkflowOutputBotVeilleDiscord)}
                        >
                          <img src={WorkflowOutputBotVeilleDiscord} alt="Workflow Output" className="w-full h-full object-contain transition-transform duration-500 hover:scale-105" />
                        </div>
                        <h4 className="text-lg font-medium text-white">{language === 'fr' ? 'Analyse de Sortie' : 'Output Analysis'}</h4>
                        <p className="text-gray-400 text-sm font-light">
                          {language === 'fr'
                            ? "Visualisation des données brutes après traitement par l'IA, avant le formatage Markdown final."
                            : "Visualization of raw data after AI processing, before final Markdown formatting."}
                        </p>
                      </div>
                    </div>

                    {/* Réponses détaillées (Rep1 & Rep2) */}
                    <div className="space-y-12">
                      <h4 className="text-xl font-medium text-white">
                        {language === 'fr' ? 'Détails de la Synthèse IA' : 'AI Synthesis Details'}
                      </h4>
                      <div className="grid grid-cols-1 gap-8">
                        <div 
                          className="rounded-xl overflow-hidden border border-white/10 bg-gray-900/50 p-2 cursor-zoom-in"
                          onClick={() => setSelectedImage(WorkflowRep1BotDiscord)}
                        >
                          <img src={WorkflowRep1BotDiscord} alt="Detailed Response Part 1" className="w-full h-auto rounded-lg transition-transform duration-500 hover:scale-[1.01]" />
                        </div>
                        <div 
                          className="rounded-xl overflow-hidden border border-white/10 bg-gray-900/50 p-2 cursor-zoom-in"
                          onClick={() => setSelectedImage(WorkflowRep2BotDiscord)}
                        >
                          <img src={WorkflowRep2BotDiscord} alt="Detailed Response Part 2" className="w-full h-auto rounded-lg transition-transform duration-500 hover:scale-[1.01]" />
                        </div>
                        <p className="text-gray-400 font-light leading-relaxed max-w-3xl">
                          {language === 'fr'
                            ? "Ces captures montrent la profondeur de l'analyse effectuée par Gemini. L'agent ne se contente pas de lister des liens, il catégorise et résume chaque information pour garantir une lecture efficace et pertinente."
                            : "These captures show the depth of analysis performed by Gemini. The agent doesn't just list links; it categorizes and summarizes each piece of information to ensure efficient and relevant reading."}
                        </p>
                      </div>
                    </div>
                  </div>
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
        altText="Technical View"
      />
    </div>
  )
}

export default DiscordVeille
