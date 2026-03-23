import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { projects } from '@/data/projects'
import Footer from '@/component/layout/footer'
import Header from '@/component/layout/header'
import AtIfitIntroVideo from '@/assets/At-iFitIntro.mov'

function TitleOpener({ title, titleOpacity, subtitle }) {
  const [displayText, setDisplayText] = useState(title)
  const chars = 'ABCDEFGYIJKLNOPQRSTUVWXYZ'
  const intervalRef = useRef(null)

  const scramble = () => {
    let iteration = 0
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDisplayText(title.split('').map((char, index) => {
        if (index < iteration) return title[index]
        return chars[Math.floor(Math.random() * chars.length)]
      }).join(''))
      if (iteration >= title.length) clearInterval(intervalRef.current)
      iteration += 1 / 3
    }, 30)
  }

  useEffect(() => {
    scramble()
    return () => clearInterval(intervalRef.current)
  }, [title])

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10" style={{ opacity: titleOpacity }}>
      <h1
        className="text-6xl md:text-[12rem] font-bold tracking-tighter text-white text-center leading-none cursor-default"
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        onMouseEnter={scramble}
      >
        {displayText}
      </h1>
      <p className="text-xl md:text-2xl text-white/70 font-light mt-4">{subtitle}</p>
    </div>
  )
}

function VideoOpener({ scrollProgress, titleOpacity }) {
  const { language } = useLanguage()
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-black">
      <video
        autoPlay loop muted playsInline
        className="hidden md:block absolute inset-0 w-full h-full object-cover"
        style={{ transform: `scale(${1 + scrollProgress * 0.3})`, transition: 'transform 0.1s ease-out' }}
      >
        <source src={AtIfitIntroVideo} type="video/quicktime" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      <TitleOpener
        title="At Ifit"
        titleOpacity={titleOpacity}
        subtitle={language === 'fr' ? 'Suivi sportif intelligent' : 'Intelligent sports tracking'}
      />
      {scrollProgress < 0.5 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      )}
    </div>
  )
}

/* ── Deployment badge ── */
function DeployBadge({ label, color, children }) {
  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl border ${color} bg-white/5`}>
      <div className="flex-shrink-0">{children}</div>
      <span className="text-sm font-mono text-gray-300">{label}</span>
    </div>
  )
}

function ProjetAtIfit() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [titleOpacity, setTitleOpacity] = useState(1)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const project = projects.find(p => p.slug === 'at-ifit')

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!project) navigate('/')
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
    return () => { window.removeEventListener('scroll', handleScroll); if (rafId) cancelAnimationFrame(rafId) }
  }, [])

  if (!project) return null

  const deploySteps = language === 'fr'
    ? [
        { step: '01', label: 'Code versionné sur GitHub', sub: 'Monorepo avec branches main / dev' },
        { step: '02', label: 'Frontend déployé sur Vercel', sub: 'CI/CD automatique sur push main — CDN global' },
        { step: '03', label: 'Backend déployé sur Railway', sub: 'Container Node/Express + MySQL persistant' },
        { step: '04', label: 'OAuth Strava en production', sub: 'Callback HTTPS Railway — tokens sécurisés' },
      ]
    : [
        { step: '01', label: 'Code versioned on GitHub', sub: 'Monorepo with main / dev branches' },
        { step: '02', label: 'Frontend deployed on Vercel', sub: 'Auto CI/CD on main push — global CDN' },
        { step: '03', label: 'Backend deployed on Railway', sub: 'Node/Express container + persistent MySQL' },
        { step: '04', label: 'Strava OAuth in production', sub: 'HTTPS Railway callback — secured tokens' },
      ]

  return (
    <div className="relative font-sans text-white bg-black">
      <Header />
      <VideoOpener scrollProgress={scrollProgress} titleOpacity={titleOpacity} />

      <div className="relative z-10 mt-[100vh]">
        <div className="min-h-screen rounded-t-[3rem] bg-black pt-20 pb-20">
          <div className="max-w-7xl mx-auto px-4 md:px-12">

            {/* Back */}
            <div className="mb-12">
              <Link to="/" className="inline-flex items-center text-sm font-mono text-gray-500 hover:text-white transition-colors">
                ← {language === 'fr' ? 'Retour' : 'Back'}
              </Link>
            </div>

            {/* Title + live link */}
            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-8xl font-light tracking-tight mb-4">{project.title}</h1>
                <p className="text-xl md:text-2xl text-gray-400 font-light">{project.type}</p>
              </div>
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-mono transition-all self-start md:self-auto"
              >
                <ExternalLink size={16} />
                atifit.up.railway.app
              </a>
            </div>

            {/* ── IFRAME live preview ── */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                {language === 'fr' ? 'Application en direct' : 'Live application'}
              </h3>
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-gray-950" style={{ aspectRatio: '16/9' }}>
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-white/10">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-4 text-xs font-mono text-gray-500 truncate">https://atifit.up.railway.app</span>
                </div>
                {!iframeLoaded && (
                  <div className="absolute inset-0 top-[42px] flex items-center justify-center bg-gray-950">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                  </div>
                )}
                <iframe
                  src="https://atifit.up.railway.app/"
                  title="At-Ifit live preview"
                  className="w-full h-full"
                  style={{ height: 'calc(100% - 42px)' }}
                  onLoad={() => setIframeLoaded(true)}
                  allow="fullscreen"
                />
              </div>
              <p className="text-xs text-gray-600 font-mono mt-3 text-center">
                {language === 'fr'
                  ? 'Interface live — authentifiez-vous avec Strava pour explorer l\'application complète'
                  : 'Live interface — authenticate with Strava to explore the full app'}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
              <div className="md:col-span-4 space-y-8">
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                    {language === 'fr' ? 'Année' : 'Year'}
                  </h3>
                  <p className="text-lg">{project.year}</p>
                </div>
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm">{tech}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">Code</h3>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white hover:underline decoration-1 underline-offset-4 text-sm font-mono"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    GitHub Repository
                  </a>
                </div>
              </div>

              <div className="md:col-span-8">
                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                  {language === 'fr' ? 'À propos' : 'About'}
                </h3>
                <p className="text-gray-300 leading-relaxed text-xl font-light whitespace-pre-line">
                  {project.description?.[language] || project.description?.['en']}
                </p>
              </div>
            </div>

            {/* ── DÉPLOIEMENT ── */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8">
                {language === 'fr' ? 'Architecture & Mise en production' : 'Architecture & Deployment'}
              </h3>

              {/* Pipeline visuel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {deploySteps.map((step, i) => (
                  <div key={i} className="relative flex flex-col gap-2 p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors">
                    <span className="text-xs font-mono text-gray-600">{step.step}</span>
                    <p className="text-sm font-semibold text-white">{step.label}</p>
                    <p className="text-xs text-gray-500 font-mono leading-relaxed">{step.sub}</p>
                    {i < deploySteps.length - 1 && (
                      <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-white/30">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Strava OAuth detail */}
              <div className="rounded-2xl border border-[#FC4C02]/30 bg-[#FC4C02]/5 p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FC4C02] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-2 text-lg">
                      {language === 'fr' ? 'Validation OAuth Strava en production' : 'Strava OAuth validation in production'}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {language === 'fr'
                        ? "L'intégration Strava nécessite une URL de callback HTTPS enregistrée dans la console développeur Strava. Le backend Railway expose une URL publique persistante, ce qui permet de valider l'application en tant qu'app officielle Strava et de passer du mode sandbox (1 utilisateur) au mode production (utilisateurs illimités). Les access_token et refresh_token sont stockés côté serveur et renouvelés automatiquement."
                        : "The Strava integration requires an HTTPS callback URL registered in the Strava developer console. The Railway backend exposes a persistent public URL, enabling the application to be validated as an official Strava app and move from sandbox mode (1 user) to production (unlimited users). Access and refresh tokens are stored server-side and auto-refreshed."}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['OAuth 2.0', 'HTTPS callback', 'Token refresh', 'Railway public URL'].map(tag => (
                        <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full border border-[#FC4C02]/40 text-[#FC4C02]/80">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* N8N Architecture */}
            {project.n8nImage && (
              <div className="mb-24">
                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8">
                  {language === 'fr' ? 'Architecture IA & Automation' : 'AI & Automation Architecture'}
                </h3>
                <div className="w-full md:w-2/3 mx-auto rounded-xl overflow-hidden bg-gray-900 border border-white/10 p-4">
                  <img
                    src={project.n8nImage}
                    alt="n8n workflow"
                    className="w-full h-auto object-contain"
                  />
                  <p className="text-sm text-gray-500 mt-4 text-center font-mono">
                    {language === 'fr' ? 'Workflow n8n avec Gemini et outils personnalisés' : 'n8n Workflow powered by Gemini and custom tools'}
                  </p>
                </div>
                <div className="mt-10 max-w-4xl mx-auto">
                  <p className="text-gray-300 leading-relaxed text-lg font-light text-justify">
                    {language === 'fr'
                      ? "Au cœur du système, un agent autonome orchestré par n8n agit comme un véritable coach sportif intelligent. Connecté directement au modèle de langage Gemini, cet agent interroge en temps réel la base de données pour contextualiser chaque réponse selon le profil précis de l'utilisateur (poids actuel, objectif cible, historique). En croisant ces données avec les performances importées via l'API Strava, l'IA génère des plans d'entraînement dynamiques, réalistes et spécifiquement adaptés à la progression physique de chacun."
                      : "At the core of the system, an autonomous agent orchestrated by n8n acts as a truly intelligent sports coach. Directly connected to the Gemini language model, this agent queries the database in real-time to contextualize every answer based on the user's specific profile (current weight, target goal, history). By cross-referencing this data with performance metrics imported via the Strava API, the AI generates dynamic, realistic training plans specifically adapted to each individual's physical progress."}
                  </p>
                </div>
              </div>
            )}

          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default ProjetAtIfit
