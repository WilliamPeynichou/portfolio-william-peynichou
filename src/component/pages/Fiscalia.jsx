import { useEffect, useRef, useState } from 'react'
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
      setDisplayText(
        title
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) return title[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

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
        className="text-5xl md:text-[10rem] font-bold tracking-tighter text-white text-center leading-none cursor-default px-4"
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        onMouseEnter={scramble}
      >
        {displayText}
      </h1>
      <p className="text-xl md:text-2xl text-white/70 font-light mt-4 text-center px-4">{subtitle}</p>
    </div>
  )
}

function Fiscalia() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [titleOpacity, setTitleOpacity] = useState(1)
  const [scrollProgress, setScrollProgress] = useState(0)

  const project = projects.find(p => p.slug === 'fiscalia')

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
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  if (!project) return null

  const stackRows =
    language === 'fr'
      ? [
          {
            step: '01',
            label: 'App web conversationnelle',
            detail:
              'Frontend Next.js 15 + React 19 avec interface chat, streaming de réponse et routes API intégrées dans la même application.',
          },
          {
            step: '02',
            label: 'RAG documentaire',
            detail:
              'Les contenus Paperasse sont chunkés, indexés puis réinjectés au moment de la réponse pour fournir un contexte métier précis et vérifiable.',
          },
          {
            step: '03',
            label: 'Embeddings Voyage AI',
            detail:
              'Les documents et les requêtes sont vectorisés avec Voyage AI (`voyage-3-large`) pour permettre une recherche sémantique robuste.',
          },
          {
            step: '04',
            label: 'PostgreSQL + pgvector',
            detail:
              'La mémoire vectorielle, les conversations et les métadonnées sont centralisées dans PostgreSQL 16 avec pgvector et index `ivfflat`.',
          },
        ]
      : [
          {
            step: '01',
            label: 'Conversational web app',
            detail:
              'Next.js 15 + React 19 frontend with chat UI, response streaming, and API routes embedded inside the same application.',
          },
          {
            step: '02',
            label: 'Document RAG',
            detail:
              'Paperasse contents are chunked, indexed, and injected back at answer time to provide precise and verifiable domain context.',
          },
          {
            step: '03',
            label: 'Voyage AI embeddings',
            detail:
              'Documents and user queries are vectorized with Voyage AI (`voyage-3-large`) to enable robust semantic retrieval.',
          },
          {
            step: '04',
            label: 'PostgreSQL + pgvector',
            detail:
              'Vector memory, conversations, and metadata are centralized in PostgreSQL 16 with pgvector and an `ivfflat` index.',
          },
        ]

  const modes =
    language === 'fr'
      ? [
          {
            title: 'Mode web',
            text:
              "Une application sécurisée avec OAuth GitHub pour discuter avec l'agent, conserver les conversations et proposer une expérience produit propre à un usage quotidien.",
          },
          {
            title: 'Mode agent autonome',
            text:
              "Un manifest `agent.json` et un usage Docker/local pour exécuter Fiscalia hors de l'interface web, sans dépendre d'une base utilisateurs partagée.",
          },
        ]
      : [
          {
            title: 'Web mode',
            text:
              'A secured application with GitHub OAuth to chat with the agent, persist conversations, and provide a product-grade daily experience.',
          },
          {
            title: 'Autonomous agent mode',
            text:
              'An `agent.json` manifest and Docker/local usage to run Fiscalia outside the web interface, without relying on a shared user database.',
          },
        ]

  const previewCards =
    language === 'fr'
      ? [
          {
            title: 'Interface dossier actif',
            text:
              'Une UI pensée comme un cabinet documentaire : historique de dossiers, requête active et réponse structurée dans une lecture très claire.',
          },
          {
            title: 'Réponses actionnables',
            text:
              'Le système ne renvoie pas seulement du texte brut : il reformate, structure, ordonne et priorise les informations utiles pour l’utilisateur final.',
          },
        ]
      : [
          {
            title: 'Active case interface',
            text:
              'A UI designed like a digital case file: archived topics, active query, and a structured answer with a very clear reading flow.',
          },
          {
            title: 'Actionable answers',
            text:
              'The system does not only return raw text: it reformats, structures, orders, and prioritizes the information that matters to the end user.',
          },
        ]

  const screenshotLabels =
    language === 'fr'
      ? [
          {
            title: 'Vue conversationnelle',
            text:
              "Une interface orientée dossier actif, pensée pour rendre une question fiscale lisible, contextualisée et simple à reprendre côté utilisateur.",
          },
          {
            title: 'Réponse structurée',
            text:
              "La réponse n'est pas un simple bloc de texte : elle est hiérarchisée, annotée et organisée pour aider à la compréhension et à la prise d'action.",
          },
        ]
      : [
          {
            title: 'Conversation view',
            text:
              'An active-case interface designed to make a tax question readable, contextualized, and easy to reuse for the end user.',
          },
          {
            title: 'Structured answer',
            text:
              'The answer is not just a text block: it is organized, annotated, and structured to support understanding and action.',
          },
        ]

  return (
    <div className="relative font-sans text-white bg-black">
      <Header />

      <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-black">
        <TitleOpener
          title="FISCALIA"
          titleOpacity={titleOpacity}
          subtitle={language === 'fr' ? 'Agent fiscal IA · RAG documentaire' : 'Tax AI Agent · Document RAG'}
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
                {language === 'fr' ? '← Retour' : '← Back'}
              </Link>
            </div>

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
                <ExternalLink size={16} />
                GitHub — Fiscalia
              </a>
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
                    {language === 'fr' ? 'Rôle' : 'Role'}
                  </h3>
                  <p className="text-lg">
                    {language === 'fr' ? 'Solo Developer — IA, Full-Stack, Produit' : 'Solo Developer — AI, Full-Stack, Product'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech, i) => (
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
                <div className="space-y-6">
                  <p className="text-gray-300 leading-relaxed text-xl font-light">
                    {language === 'fr'
                      ? "Fiscalia a été pensé comme un cabinet numérique documentaire : l'utilisateur pose une question fiscale ou administrative en langage naturel, et l'agent reformule une réponse claire, structurée et directement exploitable."
                      : 'Fiscalia was designed like a digital documentary office: the user asks a tax or administrative question in natural language, and the agent returns a clear, structured, and directly usable answer.'}
                  </p>
                  <p className="text-gray-400 leading-relaxed text-lg font-light">
                    {language === 'fr'
                      ? "L'intro produit est volontairement simple, mais toute la valeur vient du moteur derrière : récupération de contexte documentaire, vectorisation, recherche sémantique et orchestration d'un vrai pipeline RAG pour fiabiliser les réponses."
                      : 'The product entry point stays intentionally simple, but the real value comes from the engine behind it: document retrieval, vectorization, semantic search, and a true RAG pipeline to improve response reliability.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                {language === 'fr' ? 'Vision produit' : 'Product vision'}
              </h3>
              <p className="text-gray-600 font-mono text-xs mb-10">
                {language === 'fr'
                  ? 'Intro vulgarisée côté client, backend très orienté IA et data'
                  : 'Client-friendly entry point, deeply technical AI and data backend'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {previewCards.map((card) => (
                  <div key={card.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">{card.title}</p>
                    <p className="text-gray-300 text-lg font-light leading-relaxed">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {project.gallery && project.gallery.length > 0 && (
              <div className="mb-24">
                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                  {language === 'fr' ? 'Screens produit' : 'Product screens'}
                </h3>
                <p className="text-gray-600 font-mono text-xs mb-10">
                  {language === 'fr'
                    ? 'Interface conversationnelle · réponses structurées · expérience documentaire'
                    : 'Conversational UI · structured answers · documentary experience'}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {project.gallery.slice(0, 2).map((image, index) => (
                    <div key={image} className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6">
                      <div className="rounded-xl overflow-hidden border border-white/10 bg-black">
                        <img
                          src={image}
                          alt={screenshotLabels[index]?.title || project.title}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                      <div className="mt-5">
                        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">
                          {screenshotLabels[index]?.title}
                        </p>
                        <p className="text-gray-300 text-base font-light leading-relaxed">
                          {screenshotLabels[index]?.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                {language === 'fr' ? 'Architecture IA & développement' : 'AI & engineering architecture'}
              </h3>
              <p className="text-gray-600 font-mono text-xs mb-10">
                {language === 'fr'
                  ? 'Claude · Voyage AI · PostgreSQL 16 · pgvector · Drizzle · Next.js'
                  : 'Claude · Voyage AI · PostgreSQL 16 · pgvector · Drizzle · Next.js'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {stackRows.map((step, i, arr) => (
                  <div key={step.step} className="relative flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-white/5">
                    <span className="text-xs font-mono text-gray-600">{step.step}</span>
                    <p className="text-sm font-semibold text-white">{step.label}</p>
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

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 font-mono text-sm overflow-x-auto">
                <p className="text-gray-500 mb-4 text-xs uppercase tracking-widest">
                  {language === 'fr' ? 'Structure du projet' : 'Project structure'}
                </p>
                <div className="space-y-1 text-gray-400 min-w-[320px]">
                  {[
                    { indent: 0, text: 'fiscalia/', color: 'text-white' },
                    { indent: 1, text: 'frontend/ — Next.js 15 + React 19', color: 'text-violet-400' },
                    { indent: 1, text: 'scripts/ — migrate.ts, ingest.ts, chunk.ts', color: 'text-violet-400' },
                    { indent: 1, text: 'docs/dev.md — architecture et RAG', color: 'text-indigo-400' },
                    { indent: 1, text: 'agent.json — mode agent autonome', color: 'text-indigo-400' },
                    { indent: 1, text: 'docker-compose.yml — PostgreSQL local', color: 'text-gray-500' },
                  ].map((line, i) => (
                    <div key={i} className={line.color} style={{ paddingLeft: `${line.indent * 1.5}rem` }}>
                      {line.indent > 0 ? '├── ' : ''}
                      {line.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                {language === 'fr' ? 'Base vectorielle & retrieval' : 'Vector database & retrieval'}
              </h3>
              <p className="text-gray-600 font-mono text-xs mb-10">
                {language === 'fr'
                  ? 'Voyage AI (`voyage-3-large`) · vector(1024) · ivfflat · cosine similarity'
                  : 'Voyage AI (`voyage-3-large`) · vector(1024) · ivfflat · cosine similarity'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-4 text-gray-300 text-base font-light leading-relaxed">
                  <p>
                    {language === 'fr'
                      ? "La partie la plus importante côté IA est la mise en place d'une vraie base vectorielle : les documents issus de la base Paperasse sont découpés en chunks, vectorisés avec Voyage AI puis persistés dans PostgreSQL via pgvector."
                      : 'The most important AI layer is the actual vector database setup: documents coming from the Paperasse knowledge base are chunked, embedded with Voyage AI, and persisted in PostgreSQL through pgvector.'}
                  </p>
                  <p>
                    {language === 'fr'
                      ? "À chaque nouvelle question, Fiscalia embed d'abord la requête utilisateur, exécute une recherche de similarité cosinus sur les chunks les plus proches, puis injecte ce contexte dans le prompt envoyé à Claude Sonnet 4.6."
                      : 'For every new question, Fiscalia first embeds the user query, runs a cosine similarity search against the closest chunks, then injects that context into the prompt sent to Claude Sonnet 4.6.'}
                  </p>
                  <p>
                    {language === 'fr'
                      ? "Techniquement, cela permet de sortir d'un simple chatbot généraliste : on obtient un agent spécialisé, relié à un corpus documentaire métier, avec des réponses plus pertinentes et plus traçables."
                      : 'Technically, this moves the product away from being a generic chatbot: it becomes a specialized agent tied to a domain corpus, with answers that are more relevant and more traceable.'}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3 font-mono text-sm">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
                    {language === 'fr' ? 'Flux RAG' : 'RAG flow'}
                  </p>
                  {[
                    {
                      marker: '01',
                      text: language === 'fr' ? 'Chunking des contenus `paperasse/`' : 'Chunk `paperasse/` contents',
                      color: 'text-white',
                    },
                    {
                      marker: '02',
                      text: language === 'fr' ? 'Embeddings Voyage AI (`voyage-3-large`)' : 'Voyage AI embeddings (`voyage-3-large`)',
                      color: 'text-violet-400',
                    },
                    {
                      marker: '03',
                      text: language === 'fr' ? 'Stockage PostgreSQL + pgvector `vector(1024)`' : 'Store in PostgreSQL + pgvector `vector(1024)`',
                      color: 'text-indigo-400',
                    },
                    {
                      marker: '04',
                      text: language === 'fr' ? 'Recherche `ivfflat` + `vector_cosine_ops`' : '`ivfflat` search + `vector_cosine_ops`',
                      color: 'text-green-400',
                    },
                    {
                      marker: '05',
                      text: language === 'fr' ? 'Contexte injecté dans Claude Sonnet 4.6' : 'Context injected into Claude Sonnet 4.6',
                      color: 'text-orange-400',
                    },
                  ].map((item) => (
                    <div key={item.marker} className={`flex items-start gap-3 ${item.color}`}>
                      <span className="shrink-0 text-gray-600">{item.marker}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 font-mono text-sm">
                <p className="text-gray-500 mb-4 text-xs uppercase tracking-widest">
                  {language === 'fr' ? 'Variables clés' : 'Key variables'}
                </p>
                <div className="space-y-2">
                  {[
                    { key: 'ANTHROPIC_API_KEY', val: 'Claude Sonnet 4.6', where: 'LLM' },
                    { key: 'VOYAGE_API_KEY', val: 'voyage-3-large', where: 'Embeddings' },
                    { key: 'DATABASE_URL', val: 'PostgreSQL 16 + pgvector', where: 'Storage' },
                    { key: 'AUTH_GITHUB_ID', val: 'GitHub OAuth', where: 'Web auth' },
                    { key: 'NEXTAUTH_URL', val: 'public app url', where: 'Session' },
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

            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8">
                {language === 'fr' ? 'Deux modes de distribution' : 'Two distribution modes'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {modes.map((mode) => (
                  <div key={mode.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
                    <p className="text-sm font-semibold text-white mb-3">{mode.title}</p>
                    <p className="text-sm text-gray-400 font-light leading-relaxed">{mode.text}</p>
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

export default Fiscalia
