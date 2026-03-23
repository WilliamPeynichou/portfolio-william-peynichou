import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
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

/* Animated counter for the "learning" diagram */
function LearningDiagram({ language }) {
  const phases = language === 'fr'
    ? [
        { pct: 10, label: 'Début', api: '100%', db: '0%', color: 'bg-violet-500' },
        { pct: 40, label: '1 mois', api: '65%', db: '35%', color: 'bg-violet-400' },
        { pct: 70, label: '3 mois', api: '30%', db: '70%', color: 'bg-indigo-400' },
        { pct: 95, label: '6 mois+', api: '8%', db: '92%', color: 'bg-indigo-300' },
      ]
    : [
        { pct: 10, label: 'Start', api: '100%', db: '0%', color: 'bg-violet-500' },
        { pct: 40, label: '1 month', api: '65%', db: '35%', color: 'bg-violet-400' },
        { pct: 70, label: '3 months', api: '30%', db: '70%', color: 'bg-indigo-400' },
        { pct: 95, label: '6 months+', api: '8%', db: '92%', color: 'bg-indigo-300' },
      ]

  return (
    <div className="space-y-4">
      {phases.map((phase, i) => (
        <div key={i} className="flex items-center gap-4">
          <span className="text-xs font-mono text-gray-500 w-14 text-right shrink-0">{phase.label}</span>
          <div className="flex-1 h-7 rounded-lg overflow-hidden bg-white/5 border border-white/10 flex">
            <div
              className="h-full bg-violet-600/80 flex items-center justify-center text-[10px] font-mono text-white/80 transition-all duration-700"
              style={{ width: phase.api }}
            >
              {parseFloat(phase.api) > 15 ? `API ${phase.api}` : ''}
            </div>
            <div
              className="h-full bg-indigo-500/50 flex items-center justify-center text-[10px] font-mono text-white/80 transition-all duration-700"
              style={{ width: phase.db }}
            >
              {parseFloat(phase.db) > 15 ? `DB ${phase.db}` : ''}
            </div>
          </div>
        </div>
      ))}
      <div className="flex gap-6 pt-2 pl-[4.5rem]">
        <span className="flex items-center gap-2 text-xs font-mono text-gray-500">
          <span className="w-3 h-3 rounded-sm bg-violet-600/80" />
          {language === 'fr' ? 'Appel API Haiku' : 'Haiku API call'}
        </span>
        <span className="flex items-center gap-2 text-xs font-mono text-gray-500">
          <span className="w-3 h-3 rounded-sm bg-indigo-500/50" />
          {language === 'fr' ? 'Résolution vectorielle' : 'Vector DB hit'}
        </span>
      </div>
    </div>
  )
}

function Commis() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [titleOpacity, setTitleOpacity] = useState(1)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const project = projects.find(p => p.slug === 'commis')

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
        {
          step: '01',
          label: 'GitHub — Monorepo',
          sub: 'frontend/ et backend/ dans le même dépôt. CI/CD déclenché sur push main.',
        },
        {
          step: '02',
          label: 'Vercel — Frontend',
          sub: 'Build React/TypeScript auto-détecté. Variables VITE_API_URL injectées. CDN global, HTTPS inclus.',
        },
        {
          step: '03',
          label: 'Railway — Backend',
          sub: 'Container Express/Node avec Prisma. PostgreSQL + pgvector persistants sur le même service.',
        },
      ]
    : [
        {
          step: '01',
          label: 'GitHub — Monorepo',
          sub: 'frontend/ and backend/ in one repo. CI/CD triggered on main push.',
        },
        {
          step: '02',
          label: 'Vercel — Frontend',
          sub: 'React/TypeScript build auto-detected. VITE_API_URL env vars injected. Global CDN, HTTPS included.',
        },
        {
          step: '03',
          label: 'Railway — Backend',
          sub: 'Express/Node container with Prisma. PostgreSQL + pgvector persistent on the same service.',
        },
      ]

  return (
    <div className="relative font-sans text-white bg-black">
      <Header />

      {/* Hero */}
      <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-black">
        <TitleOpener
          title="COMMIS"
          titleOpacity={titleOpacity}
          subtitle={language === 'fr' ? 'Planificateur de recettes · Claude Haiku 4.5' : 'Recipe Planner · Claude Haiku 4.5'}
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
                commis-frontend.vercel.app
              </a>
            </div>

            {/* iFrame */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                {language === 'fr' ? 'Application en direct' : 'Live application'}
              </h3>
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-gray-950" style={{ aspectRatio: '16/9' }}>
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-white/10">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-4 text-xs font-mono text-gray-500 truncate">https://commis-frontend.vercel.app</span>
                </div>
                {!iframeLoaded && (
                  <div className="absolute inset-0 top-[42px] flex items-center justify-center bg-gray-950">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                  </div>
                )}
                <iframe
                  src="https://commis-frontend.vercel.app/"
                  title="Commis — Live Preview"
                  className="w-full border-0"
                  style={{ height: 'calc(100% - 42px)' }}
                  onLoad={() => setIframeLoaded(true)}
                  loading="lazy"
                  allow="clipboard-write"
                />
              </div>
            </div>

            {/* Meta + Description */}
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
                <div className="flex flex-col gap-3">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white hover:bg-white/5 transition-all text-sm font-mono">
                      ↗ {language === 'fr' ? 'Voir le site' : 'Live site'}
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white hover:bg-white/5 transition-all text-sm font-mono">
                      ↗ GitHub
                    </a>
                  )}
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                {deploySteps.map((step, i) => (
                  <div key={i} className="relative flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors">
                    <span className="text-xs font-mono text-gray-600">{step.step}</span>
                    <p className="text-sm font-semibold text-white">{step.label}</p>
                    <p className="text-xs text-gray-500 font-mono leading-relaxed">{step.sub}</p>
                    {i < deploySteps.length - 1 && (
                      <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-white/30">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Détail env vars */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 font-mono text-sm">
                <p className="text-gray-500 mb-4 text-xs uppercase tracking-widest">
                  {language === 'fr' ? 'Variables d\'environnement clés' : 'Key environment variables'}
                </p>
                <div className="space-y-2">
                  {[
                    { key: 'VITE_API_URL', val: 'https://commis-backend.railway.app', where: 'Vercel' },
                    { key: 'ANTHROPIC_API_KEY', val: 'sk-ant-…', where: 'Railway' },
                    { key: 'DATABASE_URL', val: 'postgresql://…railway.app/commis', where: 'Railway' },
                    { key: 'VECTOR_SIMILARITY_THRESHOLD', val: '0.82', where: 'Railway' },
                  ].map(({ key, val, where }) => (
                    <div key={key} className="flex items-center gap-3 flex-wrap">
                      <span className="text-violet-400">{key}</span>
                      <span className="text-gray-600">=</span>
                      <span className="text-green-400/70">{val}</span>
                      <span className="text-[10px] text-gray-600 ml-auto border border-white/10 px-2 py-0.5 rounded-full">{where}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── BASE DE DONNÉES VECTORIELLE ── */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                {language === 'fr' ? 'Mémoire sémantique auto-apprenante' : 'Self-learning semantic memory'}
              </h3>
              <p className="text-gray-600 font-mono text-xs mb-10">
                {language === 'fr' ? 'pgvector · PostgreSQL · Claude Haiku 4.5' : 'pgvector · PostgreSQL · Claude Haiku 4.5'}
              </p>

              {/* Explication */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-4 text-gray-300 text-base font-light leading-relaxed">
                  <p>
                    {language === 'fr'
                      ? "À chaque requête utilisateur, Haiku 4.5 génère une réponse et l'application vectorise simultanément la question via un modèle d'embedding. Ce vecteur, avec la réponse associée, est stocké dans PostgreSQL via l'extension pgvector."
                      : "On every user request, Haiku 4.5 generates a response while the app simultaneously vectorizes the question via an embedding model. This vector, along with the associated response, is stored in PostgreSQL via the pgvector extension."}
                  </p>
                  <p>
                    {language === 'fr'
                      ? "Pour chaque nouvelle requête, une recherche de similarité cosinus est d'abord exécutée en base. Si un résultat dépasse le seuil de confiance (0.82), la réponse est retournée directement — sans aucun appel API Anthropic."
                      : "For every new request, a cosine similarity search is first run on the database. If a result exceeds the confidence threshold (0.82), the response is returned directly — no Anthropic API call needed."}
                  </p>
                  <p>
                    {language === 'fr'
                      ? "Résultat : plus l'application est utilisée, plus le ratio DB/API s'inverse. L'application converge vers un fonctionnement quasi-autonome, avec un coût marginal proche de zéro."
                      : "Result: the more the app is used, the more the DB/API ratio inverts. The application converges toward near-autonomous operation, with marginal cost close to zero."}
                  </p>
                </div>

                {/* Schéma de flux */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3 font-mono text-sm">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
                    {language === 'fr' ? 'Flux de décision' : 'Decision flow'}
                  </p>
                  {[
                    { marker: '—', text: language === 'fr' ? 'Requête utilisateur' : 'User request', indent: 0 },
                    { marker: '—', text: language === 'fr' ? 'Recherche vectorielle pgvector' : 'pgvector similarity search', indent: 1 },
                    { marker: '>', text: language === 'fr' ? 'Similarité > 0.82 → réponse DB (gratuit)' : 'Similarity > 0.82 → DB response (free)', indent: 2, color: 'text-green-400' },
                    { marker: '>', text: language === 'fr' ? 'Similarité < 0.82 → appel Haiku 4.5' : 'Similarity < 0.82 → Haiku 4.5 call', indent: 2, color: 'text-violet-400' },
                    { marker: '—', text: language === 'fr' ? 'Vectorisation + stockage pgvector' : 'Vectorize + store in pgvector', indent: 3, color: 'text-indigo-400' },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-start gap-2 ${item.color || 'text-gray-300'}`} style={{ paddingLeft: `${item.indent * 1.2}rem` }}>
                      <span className="shrink-0">{item.marker}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diagramme évolution */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">
                  {language === 'fr' ? 'Évolution du ratio API vs DB dans le temps' : 'API vs DB ratio over time'}
                </p>
                <LearningDiagram language={language} />
                <p className="text-xs font-mono text-gray-600 mt-6">
                  {language === 'fr'
                    ? "* Projection indicative. Le seuil de similarité et la croissance de la base influencent la vitesse de convergence."
                    : "* Indicative projection. Similarity threshold and database growth influence convergence speed."}
                </p>
              </div>
            </div>

          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Commis
