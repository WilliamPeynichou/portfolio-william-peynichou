import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'
import { workflows } from '@/data/workflows'
import Footer from '@/component/layout/footer'
import Header from '@/component/layout/header'

function TitleOpener({ title, titleOpacity }) {
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
      <p className="text-xl md:text-2xl text-white/70 font-light mt-4">
        Agentic RAG · Claude Haiku 4.5
      </p>
    </div>
  )
}

function LearningDiagram({ language }) {
  const phases = language === 'fr'
    ? [
        { pct: 10, label: 'Début',   api: '100%', db: '0%',  color: 'bg-violet-500' },
        { pct: 40, label: '1 mois',  api: '65%',  db: '35%', color: 'bg-violet-400' },
        { pct: 70, label: '3 mois',  api: '30%',  db: '70%', color: 'bg-indigo-400' },
        { pct: 95, label: '6 mois+', api: '8%',   db: '92%', color: 'bg-indigo-300' },
      ]
    : [
        { pct: 10, label: 'Start',     api: '100%', db: '0%',  color: 'bg-violet-500' },
        { pct: 40, label: '1 month',   api: '65%',  db: '35%', color: 'bg-violet-400' },
        { pct: 70, label: '3 months',  api: '30%',  db: '70%', color: 'bg-indigo-400' },
        { pct: 95, label: '6 months+', api: '8%',   db: '92%', color: 'bg-indigo-300' },
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

function CommisAIWorkflow() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [titleOpacity, setTitleOpacity] = useState(1)

  const workflow = workflows.find(w => w.slug === 'commis-ai')

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!workflow) navigate('/')
  }, [workflow, navigate])

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
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  if (!workflow) return null

  const t = {
    back:        language === 'fr' ? 'Retour' : 'Back',
    year:        language === 'fr' ? 'Année' : 'Year',
    about:       language === 'fr' ? 'À propos' : 'About',
    liveApp:     language === 'fr' ? 'Voir l\'app' : 'Live app',
    github:      'GitHub',
    deploy:      language === 'fr' ? 'Architecture & Déploiement' : 'Architecture & Deployment',
    envVars:     language === 'fr' ? 'Variables d\'environnement clés' : 'Key environment variables',
    ragTitle:    language === 'fr' ? 'Mémoire sémantique auto-apprenante' : 'Self-learning semantic memory',
    ragSub:      'pgvector · PostgreSQL · Claude Haiku 4.5',
    decisionFlow: language === 'fr' ? 'Flux de décision agent' : 'Agent decision flow',
    ratioTitle:  language === 'fr' ? 'Évolution du ratio API vs DB dans le temps' : 'API vs DB ratio over time',
    ratioNote:   language === 'fr'
      ? '* Projection indicative. Le seuil de similarité et la croissance de la base influencent la vitesse de convergence.'
      : '* Indicative projection. Similarity threshold and DB growth influence convergence speed.',
    apiTitle:    language === 'fr' ? 'Gestion des appels API Claude' : 'Claude API call management',
    apiSub:      'Anthropic SDK · claude-haiku-4-5-20251001 · temperature 1.0',
  }

  const deploySteps = language === 'fr'
    ? [
        { step: '01', label: 'GitHub — Monorepo', sub: 'frontend/ et backend/ dans le même dépôt. TypeScript 95%. CI/CD déclenché sur push main.' },
        { step: '02', label: 'Vercel — Frontend', sub: 'Build React/TypeScript auto-détecté. Variables VITE_API_URL injectées. CDN global, HTTPS inclus.' },
        { step: '03', label: 'Railway — Backend', sub: 'Container Express/Node avec Prisma. PostgreSQL + pgvector persistants sur le même service.' },
      ]
    : [
        { step: '01', label: 'GitHub — Monorepo', sub: 'frontend/ and backend/ in one repo. TypeScript 95%. CI/CD triggered on main push.' },
        { step: '02', label: 'Vercel — Frontend', sub: 'React/TypeScript build auto-detected. VITE_API_URL env vars injected. Global CDN, HTTPS included.' },
        { step: '03', label: 'Railway — Backend', sub: 'Express/Node container with Prisma. PostgreSQL + pgvector persistent on the same service.' },
      ]

  const ragExplain = language === 'fr'
    ? [
        "À chaque requête, l'agent calcule d'abord un embedding de la question et exécute une recherche cosinus sur pgvector. Si la similarité dépasse 0.82, la réponse en cache est retournée sans aucun appel Anthropic.",
        "En dessous du seuil, l'agent appelle claude-haiku-4-5-20251001 via l'Anthropic SDK (temperature 1.0). La réponse générée est immédiatement vectorisée et persistée dans pgvector pour les prochaines requêtes similaires.",
        "Résultat : la base s'enrichit à chaque appel API manqué. Le ratio DB/API s'inverse progressivement — l'agent converge vers un fonctionnement quasi-autonome avec un coût marginal proche de zéro.",
      ]
    : [
        "On every request, the agent first computes an embedding of the query and runs a cosine search on pgvector. If similarity exceeds 0.82, the cached response is returned without any Anthropic call.",
        "Below the threshold, the agent calls claude-haiku-4-5-20251001 via the Anthropic SDK (temperature 1.0). The generated response is immediately vectorized and persisted in pgvector for future similar requests.",
        "Result: the database grows richer with every API miss. The DB/API ratio progressively inverts — the agent converges toward near-autonomous operation with marginal cost close to zero.",
      ]

  const apiDetail = language === 'fr'
    ? [
        "Le service claude.ts initialise le client Anthropic via getClient() et expose deux fonctions principales : generateRecipes() et regenerateRecipe(). Chaque appel construit un prompt structuré intégrant les contraintes utilisateur : régimes alimentaires, ingrédients exclus, budget (économique / gourmand / plaisir) et temps de préparation.",
        "Avant injection dans le prompt, chaque entrée utilisateur passe par sanitizeTag() et sanitizeFreeText() pour prévenir les injections de prompt. Le contexte est ainsi contrôlé et borné avant tout appel LLM.",
        "L'appel API ne se déclenche que si le score de similarité pgvector est inférieur à 0.82 — le seuil de confiance qui détermine si la DB peut répondre seule. Ce routing est géré par la couche service avant même d'atteindre claude.ts.",
      ]
    : [
        "The claude.ts service initializes the Anthropic client via getClient() and exposes two main functions: generateRecipes() and regenerateRecipe(). Each call builds a structured prompt embedding user constraints: dietary restrictions, excluded ingredients, budget tier (economique / gourmand / plaisir), and prep time.",
        "Before injection into the prompt, every user input passes through sanitizeTag() and sanitizeFreeText() to prevent prompt injection. Context is controlled and bounded before any LLM call.",
        "The API call is only triggered if the pgvector similarity score falls below 0.82 — the confidence threshold that determines whether the DB can respond alone. This routing is handled by the service layer before ever reaching claude.ts.",
      ]

  return (
    <div className="relative font-sans text-white bg-black">
      <Header />

      <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-black">
        <TitleOpener title="COMMIS" titleOpacity={titleOpacity} />
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
                ← {t.back}
              </Link>
            </div>

            {/* Title + links */}
            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-8xl font-light tracking-tight mb-4">{workflow.title}</h1>
                <p className="text-xl md:text-2xl text-gray-400 font-light">{workflow.type}</p>
              </div>
              <div className="flex gap-3">
                <a href={workflow.liveLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white hover:bg-white/5 transition-all text-sm font-mono">
                  ↗ {t.liveApp}
                </a>
                <a href={workflow.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white hover:bg-white/5 transition-all text-sm font-mono">
                  ↗ {t.github}
                </a>
              </div>
            </div>

            {/* Meta + description */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
              <div className="md:col-span-4 space-y-8">
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">{t.year}</h3>
                  <p className="text-lg">{workflow.year}</p>
                </div>
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {workflow.technologies?.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:col-span-8">
                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">{t.about}</h3>
                <p className="text-gray-300 leading-relaxed text-xl font-light">
                  {workflow.description?.[language] || workflow.description?.['en']}
                </p>
              </div>
            </div>

            {/* ── GESTION API CLAUDE ── */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">{t.apiTitle}</h3>
              <p className="text-gray-600 font-mono text-xs mb-10">{t.apiSub}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-4 text-gray-300 text-base font-light leading-relaxed">
                  {apiDetail.map((p, i) => <p key={i}>{p}</p>)}
                </div>

                {/* Code snippet */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 font-mono text-sm space-y-3 overflow-x-auto">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">claude.ts — service layer</p>
                  {[
                    { t: 'const client = getClient()',                         c: 'text-violet-400' },
                    { t: '// Routing : DB first, API fallback',                c: 'text-gray-600' },
                    { t: 'if (similarity >= 0.82) return dbResponse',          c: 'text-green-400' },
                    { t: '// Below threshold → call Haiku',                    c: 'text-gray-600' },
                    { t: 'const res = await client.messages.create({',         c: 'text-white/80' },
                    { t: '  model: "claude-haiku-4-5-20251001",',               c: 'text-indigo-300' },
                    { t: '  temperature: 1.0,',                                c: 'text-indigo-300' },
                    { t: '  messages: [{ role: "user", content: prompt }]',    c: 'text-indigo-300' },
                    { t: '})',                                                  c: 'text-white/80' },
                    { t: '// Vectorize + persist for next time',               c: 'text-gray-600' },
                    { t: 'await storeEmbedding(query, res.content)',           c: 'text-violet-400' },
                  ].map((line, i) => (
                    <div key={i} className={`${line.c} leading-6`}>{line.t}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RAG ── */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">{t.ragTitle}</h3>
              <p className="text-gray-600 font-mono text-xs mb-10">{t.ragSub}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-4 text-gray-300 text-base font-light leading-relaxed">
                  {ragExplain.map((p, i) => <p key={i}>{p}</p>)}
                </div>

                {/* Decision flow */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3 font-mono text-sm">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">{t.decisionFlow}</p>
                  {[
                    { marker: '—', text: language === 'fr' ? 'Requête utilisateur' : 'User request',                          indent: 0, color: 'text-gray-300' },
                    { marker: '—', text: language === 'fr' ? 'Embedding → recherche cosinus pgvector' : 'Embedding → pgvector cosine search', indent: 1, color: 'text-gray-300' },
                    { marker: '›', text: language === 'fr' ? 'Similarité ≥ 0.82 → réponse DB (gratuit)' : 'Similarity ≥ 0.82 → DB response (free)', indent: 2, color: 'text-green-400' },
                    { marker: '›', text: language === 'fr' ? 'Similarité < 0.82 → appel Haiku 4.5' : 'Similarity < 0.82 → Haiku 4.5 call', indent: 2, color: 'text-violet-400' },
                    { marker: '—', text: language === 'fr' ? 'Vectorisation + stockage pgvector' : 'Vectorize + store in pgvector', indent: 3, color: 'text-indigo-400' },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-start gap-2 ${item.color}`} style={{ paddingLeft: `${item.indent * 1.2}rem` }}>
                      <span className="shrink-0">{item.marker}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning diagram */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">{t.ratioTitle}</p>
                <LearningDiagram language={language} />
                <p className="text-xs font-mono text-gray-600 mt-6">{t.ratioNote}</p>
              </div>
            </div>

            {/* ── DÉPLOIEMENT ── */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8">{t.deploy}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {deploySteps.map((step, i) => (
                  <div key={i} className="relative flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-white/5">
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

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 font-mono text-sm">
                <p className="text-gray-500 mb-4 text-xs uppercase tracking-widest">{t.envVars}</p>
                <div className="space-y-2">
                  {[
                    { key: 'VITE_API_URL',               val: 'https://commis-backend.railway.app', where: 'Vercel' },
                    { key: 'ANTHROPIC_API_KEY',           val: 'sk-ant-…',                          where: 'Railway' },
                    { key: 'DATABASE_URL',                val: 'postgresql://…railway.app/commis',   where: 'Railway' },
                    { key: 'VECTOR_SIMILARITY_THRESHOLD', val: '0.82',                              where: 'Railway' },
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

          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default CommisAIWorkflow
