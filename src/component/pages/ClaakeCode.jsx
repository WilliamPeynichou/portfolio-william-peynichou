import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ExternalLink, Download } from 'lucide-react'
import { useLanguage } from '@/context/useLanguage'
import { projects } from '@/data/projects'
import Footer from '@/component/layout/footer'
import Header from '@/component/layout/header'
import ClaakeCodeVideo from '../../assets/ClaakeCode.mp4'

const SCRAMBLE_CHARS = 'ABCDEFGYIJKLNOPQRSTUVWXYZ'

function TitleOpener({ title, titleOpacity, subtitle }) {
  const [displayText, setDisplayText] = useState(title)
  const intervalRef = useRef(null)

  const scramble = useCallback(() => {
    let iteration = 0
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDisplayText(title.split('').map((char, index) => {
        if (char === ' ') return ' '
        if (index < iteration) return title[index]
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      }).join(''))
      if (iteration >= title.length) clearInterval(intervalRef.current)
      iteration += 1 / 3
    }, 30)
  }, [title])

  useEffect(() => {
    scramble()
    return () => clearInterval(intervalRef.current)
  }, [scramble])

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10" style={{ opacity: titleOpacity }}>
      <h1
        className="text-4xl md:text-8xl font-bold tracking-tighter text-white text-center leading-none cursor-default px-4"
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        onMouseEnter={scramble}
      >
        {displayText}
      </h1>
      <p className="text-xl md:text-2xl text-white/70 font-light mt-4 text-center px-4">{subtitle}</p>
    </div>
  )
}

function ClaakeCode() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [titleOpacity, setTitleOpacity] = useState(1)
  const [scrollProgress, setScrollProgress] = useState(0)
  const fr = language === 'fr'

  const project = projects.find(p => p.slug === 'claake-code')

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!project) navigate('/')
  }, [project, navigate])

  useEffect(() => {
    let rafId = null
    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const progress = Math.min(window.scrollY / window.innerHeight, 1)
        setScrollProgress(progress)
        setTitleOpacity(Math.max(0, 1 - progress * 2))
        rafId = null
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => { window.removeEventListener('scroll', handleScroll); if (rafId) cancelAnimationFrame(rafId) }
  }, [])

  if (!project) return null

  const modes = fr
    ? [
        { name: 'Act', desc: "Boucle d'agent classique : le modèle agit, tu reprends la main au prompt suivant." },
        { name: 'Ask', desc: 'Lecture seule : exploration et questions sur le code sans aucune modification.' },
        { name: 'Goal', desc: "Boucle jusqu'à ce que l'objectif soit atteint — des heures de travail autonome." },
        { name: 'Plan', desc: "Questions d'abord, spécification fonctionnelle ensuite — aucune ligne écrite avant validation." },
      ]
    : [
        { name: 'Act', desc: 'Classic agent loop: the model acts, you take over at the next prompt.' },
        { name: 'Ask', desc: 'Read-only: explore and ask questions about the code without any change.' },
        { name: 'Goal', desc: 'Loops until the goal is reached — hours of autonomous work.' },
        { name: 'Plan', desc: 'Questions first, functional spec after — no line written before approval.' },
      ]

  const features = fr
    ? [
        { title: 'Harness éditable', desc: "Chaque outil (bash, read, grep, edit_file, web_fetch, python…) a une description réécrivable et son propre interrupteur." },
        { title: 'Multi-provider', desc: 'Anthropic, OpenAI, Google, Kimi, Mistral, xAI, OpenRouter — clé API ou OAuth sur un abonnement existant.' },
        { title: 'Sous-agents & swarms', desc: "Agents spécialisés configurables, équipes de 2 à 8 agents avec tableau de tâches partagé et messagerie." },
        { title: 'MCP & Skills', desc: 'Serveurs MCP par workspace, skills en Markdown stockés localement, chargés à la demande.' },
        { title: 'Bases de données', desc: 'Sources SQL / Supabase avec lecture seule, limite de lignes et confirmation des opérations destructives.' },
        { title: 'Contexte maîtrisé', desc: "Rollback par checkpoints, compaction auto/manuelle, et un outil clean_context pour que le modèle nettoie son propre contexte." },
      ]
    : [
        { title: 'Editable harness', desc: 'Every tool (bash, read, grep, edit_file, web_fetch, python…) has a rewritable description and its own toggle.' },
        { title: 'Multi-provider', desc: 'Anthropic, OpenAI, Google, Kimi, Mistral, xAI, OpenRouter — API key or OAuth on an existing subscription.' },
        { title: 'Sub-agents & swarms', desc: 'Configurable specialised agents, teams of 2 to 8 agents with a shared task board and messaging.' },
        { title: 'MCP & Skills', desc: 'Workspace-scoped MCP servers, local Markdown skills loaded on demand.' },
        { title: 'Databases', desc: 'SQL / Supabase sources with read-only mode, row limits and destructive-operation confirmation.' },
        { title: 'Context under control', desc: 'Checkpoint rollback, auto/manual compaction, and a clean_context tool so the model cleans its own context.' },
      ]

  const webItems = fr
    ? [
        'Landing FR / EN découpée en pages Features, Settings, Agent, Why et FAQ',
        'SEO + GEO : données structurées, sitemap, robots, llms.txt, social preview',
        'Performance : vidéo 22 Mo → 0,9 Mo, shader capé, lazy loading',
        'Pages légales, security.txt, headers de sécurité, assets auto-hébergés',
        'Téléchargements directs macOS, Windows et Linux',
      ]
    : [
        'FR / EN landing split into Features, Settings, Agent, Why and FAQ pages',
        'SEO + GEO: structured data, sitemap, robots, llms.txt, social preview',
        'Performance: video 22 MB → 0.9 MB, capped shader, lazy loading',
        'Legal pages, security.txt, security headers, self-hosted assets',
        'Direct downloads for macOS, Windows and Linux',
      ]

  return (
    <div className="relative font-sans text-white bg-black">
      <Header />

      {/* Hero */}
      <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(74,122,84,0.35),_transparent_70%)]" />
        <TitleOpener
          title="CLAAKE CODE"
          titleOpacity={titleOpacity}
          subtitle={fr ? 'Le harness de code IA que tu façonnes' : 'The AI coding harness you shape'}
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

            <div className="mb-12">
              <Link to="/" className="inline-flex items-center text-sm font-mono text-gray-500 hover:text-white transition-colors">
                {fr ? '← Retour' : '← Back'}
              </Link>
            </div>

            {/* Title + CTAs */}
            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-8xl font-light tracking-tight mb-4">{project.title}</h1>
                <p className="text-xl md:text-2xl text-gray-400 font-light">{project.type}</p>
              </div>
              <div className="flex flex-wrap gap-3 self-start md:self-auto">
                <a href={project.downloadLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black hover:bg-gray-200 text-sm font-mono transition-all">
                  <Download size={16} />
                  {fr ? `Télécharger ${project.version}` : `Download ${project.version}`}
                </a>
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-mono transition-all">
                  <ExternalLink size={16} />
                  claakecode-web.vercel.app
                </a>
              </div>
            </div>

            {/* Video */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                {fr ? 'Démo produit' : 'Product demo'}
              </h3>
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-gray-950">
                <video
                  src={ClaakeCodeVideo}
                  poster={project.image}
                  className="w-full h-auto block"
                  autoPlay muted loop playsInline preload="metadata"
                />
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
              <div className="md:col-span-4 space-y-8">
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">{fr ? 'Année' : 'Year'}</h3>
                  <p className="text-lg">{project.year}</p>
                </div>
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">{fr ? 'Plateformes' : 'Platforms'}</h3>
                  <p className="text-lg">macOS · Windows · Linux</p>
                </div>
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-sm">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white hover:bg-white/5 transition-all text-sm font-mono w-fit">
                    ↗ GitHub
                  </a>
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white hover:bg-white/5 transition-all text-sm font-mono w-fit">
                    ↗ ClaakeCodeWeb
                  </a>
                </div>
              </div>

              <div className="md:col-span-8">
                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">{fr ? 'À propos' : 'About'}</h3>
                <p className="text-gray-300 leading-relaxed text-xl font-light whitespace-pre-line">
                  {project.description[language] || project.description.en}
                </p>
              </div>
            </div>

            {/* Modes */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8">{fr ? 'Quatre modes' : 'Four modes'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {modes.map(mode => (
                  <div key={mode.name} className="flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-white/5">
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">{mode.name}</p>
                    <p className="text-sm text-gray-300 leading-relaxed">{mode.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 font-mono text-xs mt-4">
                {fr ? 'Chaque mode peut tourner sur un modèle différent, avec son propre prompt éditable.' : 'Each mode can run on a different model, with its own editable prompt.'}
              </p>
            </div>

            {/* Features */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8">{fr ? 'Fonctionnalités clés' : 'Key features'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((f, i) => (
                  <div key={f.title} className="flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-white/5">
                    <span className="text-xs font-mono text-gray-600">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-sm font-semibold text-white">{f.title}</p>
                    <p className="text-xs text-gray-500 font-mono leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ClaakeCodeWeb */}
            <div className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">ClaakeCodeWeb</h3>
                <p className="text-gray-300 text-lg font-light leading-relaxed mb-6">
                  {fr
                    ? "Le site vitrine du produit, en HTML/CSS statique déployé sur Vercel, mis à jour à chaque release."
                    : 'The product website, static HTML/CSS deployed on Vercel, updated with every release.'}
                </p>
                <ul className="space-y-3">
                  {webItems.map(item => (
                    <li key={item} className="flex gap-3 text-sm text-gray-400 font-mono leading-relaxed">
                      <span className="text-gray-600">—</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              {project.gallery[0] && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                  className="block rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-colors">
                  <img src={project.gallery[0]} alt="ClaakeCodeWeb" loading="lazy" className="w-full h-auto" />
                </a>
              )}
            </div>

            {/* Release pipeline */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8">{fr ? 'Distribution' : 'Distribution'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(fr
                  ? [
                      { label: 'Tauri 2 + Rust', sub: 'Cœur en crates Rust (core, app, un crate par provider), UI React.' },
                      { label: 'GitHub Actions', sub: 'Build universel macOS (.dmg), Windows (.exe) et Linux (.AppImage) à chaque tag.' },
                      { label: 'Auto-updater', sub: "Mise à jour intégrée à l'application — plus de 60 releases publiées." },
                      { label: 'Zéro télémétrie', sub: 'Aucune collecte, aucun entraînement sur les conversations.' },
                    ]
                  : [
                      { label: 'Tauri 2 + Rust', sub: 'Core split into Rust crates (core, app, one crate per provider), React UI.' },
                      { label: 'GitHub Actions', sub: 'Universal macOS (.dmg), Windows (.exe) and Linux (.AppImage) builds on every tag.' },
                      { label: 'Auto-updater', sub: 'In-app updates — more than 60 releases shipped.' },
                      { label: 'Zero telemetry', sub: 'No data collection, no training on conversations.' },
                    ]
                ).map((s, i) => (
                  <div key={s.label} className="flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-white/5">
                    <span className="text-xs font-mono text-gray-600">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-sm font-semibold text-white">{s.label}</p>
                    <p className="text-xs text-gray-500 font-mono leading-relaxed">{s.sub}</p>
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

export default ClaakeCode
