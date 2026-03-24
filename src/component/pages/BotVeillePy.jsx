import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'
import { projects } from '@/data/projects'
import Footer from '@/component/layout/footer'
import Header from '@/component/layout/header'

function TitleOpener({ title, titleOpacity, subtitle }) {
  const [displayText, setDisplayText] = useState(title)
  const chars = 'ABCDEFGYIJKLNOPQRSTUVWXYZ'
  const intervalRef = useRef(null)

  const scramble = () => {
    let iteration = 0
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDisplayText(title.split('').map((char, index) => {
        if (char === ' ') return ' '
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
        className="text-5xl md:text-[9rem] font-bold tracking-tighter text-white text-center leading-none cursor-default px-4"
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        onMouseEnter={scramble}
      >
        {displayText}
      </h1>
      <p className="text-xl md:text-2xl text-white/70 font-light mt-4">{subtitle}</p>
    </div>
  )
}

function BotVeillePy() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [titleOpacity, setTitleOpacity] = useState(1)
  const [scrollProgress, setScrollProgress] = useState(0)

  const project = projects.find(p => p.slug === 'bot-veille-py')

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

  const pipeline = language === 'fr'
    ? [
        {
          step: '01',
          label: 'Scheduler',
          tech: 'schedule',
          detail: 'Tâche planifiée chaque lundi matin via la lib schedule. Aucune dépendance externe — tourne en local ou sur un serveur.',
        },
        {
          step: '02',
          label: 'RSS Fetcher',
          tech: 'feedparser',
          detail: 'Lecture des flux RSS configurés (blogs tech, feeds sécurité, actualités IA). feedparser parse et normalise chaque entrée.',
        },
        {
          step: '03',
          label: 'Filtrage & Formatage',
          tech: 'Python natif',
          detail: 'Déduplication par URL, tri par date, formatage en Markdown structuré avec titre, source et lien.',
        },
        {
          step: '04',
          label: 'Discord Webhook',
          tech: 'discord.py',
          detail: 'Envoi vers les canaux configurés via discord.py. Messages découpés pour respecter la limite de 2 000 caractères.',
        },
      ]
    : [
        {
          step: '01',
          label: 'Scheduler',
          tech: 'schedule',
          detail: 'Task scheduled every Monday morning via the schedule lib. No external dependency — runs locally or on a server.',
        },
        {
          step: '02',
          label: 'RSS Fetcher',
          tech: 'feedparser',
          detail: 'Reads configured RSS feeds (tech blogs, security feeds, AI news). feedparser parses and normalizes each entry.',
        },
        {
          step: '03',
          label: 'Filtering & Formatting',
          tech: 'Native Python',
          detail: 'URL-based deduplication, date sorting, structured Markdown formatting with title, source and link.',
        },
        {
          step: '04',
          label: 'Discord Webhook',
          tech: 'discord.py',
          detail: 'Sends to configured channels via discord.py. Messages split to respect the 2,000 character limit.',
        },
      ]

  const vsN8n = language === 'fr'
    ? [
        { aspect: 'Approche', py: 'Code Python — contrôle total', n8n: 'Low-code n8n — interface visuelle' },
        { aspect: 'IA', py: 'Aucune — filtrage par règles', n8n: 'Gemini — synthèse sémantique' },
        { aspect: 'Hébergement', py: 'Local ou VPS (script Python)', n8n: 'Instance n8n cloud / auto-hébergée' },
        { aspect: 'Flexibilité', py: 'Logique custom illimitée', n8n: 'Limité aux nœuds disponibles' },
        { aspect: 'Coût', py: 'Gratuit (aucun service tiers)', n8n: 'Dépend du plan n8n + API Gemini' },
      ]
    : [
        { aspect: 'Approach', py: 'Python code — full control', n8n: 'Low-code n8n — visual interface' },
        { aspect: 'AI', py: 'None — rule-based filtering', n8n: 'Gemini — semantic synthesis' },
        { aspect: 'Hosting', py: 'Local or VPS (Python script)', n8n: 'n8n cloud / self-hosted instance' },
        { aspect: 'Flexibility', py: 'Unlimited custom logic', n8n: 'Limited to available nodes' },
        { aspect: 'Cost', py: 'Free (no third-party service)', n8n: 'Depends on n8n plan + Gemini API' },
      ]

  return (
    <div className="relative font-sans text-white bg-black">
      <Header />

      {/* Hero */}
      <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-black">
        <TitleOpener
          title="BOTVEILEPY"
          titleOpacity={titleOpacity}
          subtitle={language === 'fr' ? 'Veille tech automatisée — Python' : 'Automated tech monitoring — Python'}
        />
        {scrollProgress < 0.5 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        )}
      </div>

      <div className="relative z-10 mt-[100vh]">
        <div className="min-h-screen rounded-t-[3rem] bg-black pt-20 pb-20">
          <div className="max-w-7xl mx-auto px-4 md:px-12">

            {/* Back */}
            <div className="mb-12">
              <Link to="/" className="inline-flex items-center text-sm font-mono text-gray-500 hover:text-white transition-colors">
                {language === 'fr' ? '← Retour' : '← Back'}
              </Link>
            </div>

            {/* Title + GitHub */}
            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-8xl font-light tracking-tight mb-4">{project.title}</h1>
                <p className="text-xl md:text-2xl text-gray-400 font-light">{project.type}</p>
              </div>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-mono transition-all self-start md:self-auto"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub — BotVeillePy
              </a>
            </div>

            {/* Info grid */}
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
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white hover:bg-white/5 transition-all text-sm font-mono"
                  >
                    ↗ GitHub
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

            {/* Pipeline technique */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                {language === 'fr' ? 'Architecture technique' : 'Technical architecture'}
              </h3>
              <p className="text-gray-600 font-mono text-xs mb-10">
                {language === 'fr' ? 'Pipeline Python — 4 étapes' : 'Python pipeline — 4 steps'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {pipeline.map((step, i, arr) => (
                  <div key={i} className="relative flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-white/5">
                    <span className="text-xs font-mono text-gray-600">{step.step}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{step.label}</p>
                      <p className="text-xs font-mono text-violet-400/70 mt-0.5">{step.tech}</p>
                    </div>
                    <p className="text-xs text-gray-500 font-mono leading-relaxed">{step.detail}</p>
                    {i < arr.length - 1 && (
                      <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-white/30">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Extrait de code */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 font-mono text-sm overflow-x-auto">
                <p className="text-gray-500 mb-4 text-xs uppercase tracking-widest">
                  {language === 'fr' ? 'Structure du projet' : 'Project structure'}
                </p>
                <div className="space-y-1 text-gray-400">
                  {[
                    { indent: 0, text: 'BotVeillePy/', color: 'text-white' },
                    { indent: 1, text: 'bot.py', color: 'text-violet-400' },
                    { indent: 1, text: 'feeds.py', color: 'text-violet-400' },
                    { indent: 1, text: 'formatter.py', color: 'text-violet-400' },
                    { indent: 1, text: 'scheduler.py', color: 'text-violet-400' },
                    { indent: 1, text: 'config.json', color: 'text-indigo-400' },
                    { indent: 1, text: 'requirements.txt', color: 'text-gray-500' },
                  ].map((line, i) => (
                    <div key={i} className={`${line.color}`} style={{ paddingLeft: `${line.indent * 1.5}rem` }}>
                      {line.indent > 0 ? '├── ' : ''}{line.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Comparaison Python vs n8n */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                {language === 'fr' ? 'Python vs n8n — deux approches' : 'Python vs n8n — two approaches'}
              </h3>
              <p className="text-gray-600 font-mono text-xs mb-10">
                {language === 'fr'
                  ? 'Ce projet coexiste avec la version n8n/Gemini — deux philosophies différentes pour le même besoin.'
                  : 'This project coexists with the n8n/Gemini version — two different philosophies for the same need.'}
              </p>

              <div className="rounded-2xl border border-white/10 overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-3 bg-white/5 border-b border-white/10 text-xs font-mono text-gray-500 uppercase tracking-widest">
                  <div className="p-4">{language === 'fr' ? 'Aspect' : 'Aspect'}</div>
                  <div className="p-4 border-l border-white/10 text-violet-400">BotVeillePy</div>
                  <div className="p-4 border-l border-white/10">Discord Veille (n8n)</div>
                </div>
                {vsN8n.map((row, i) => (
                  <div key={i} className={`grid grid-cols-3 border-b border-white/10 text-sm ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                    <div className="p-4 font-mono text-gray-500 text-xs">{row.aspect}</div>
                    <div className="p-4 border-l border-white/10 text-gray-300 font-light">{row.py}</div>
                    <div className="p-4 border-l border-white/10 text-gray-500 font-light">{row.n8n}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default BotVeillePy
