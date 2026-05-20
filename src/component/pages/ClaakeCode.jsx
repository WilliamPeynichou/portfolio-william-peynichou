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

function ClaakeCode() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [titleOpacity, setTitleOpacity] = useState(1)
  const [scrollProgress, setScrollProgress] = useState(0)

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
            label: 'Frontend React + Monaco',
            detail:
              'Interface utilisateur React avec éditeur Monaco intégré, terminal xterm et panneau de chat pour interagir avec les agents IA.',
          },
          {
            step: '02',
            label: 'Backend Rust (Tauri 2)',
            detail:
              'Cœur natif en Rust via Tauri 2 pour la gestion des fichiers, l\'exécution shell et la communication inter-processus.',
          },
          {
            step: '03',
            label: 'Harness IA personnalisable',
            detail:
              'Outils, prompts et descriptions entièrement éditables par l\'utilisateur. Chaque outil a un contrat modifiable sans toucher au code.',
          },
          {
            step: '04',
            label: 'Multi-providers simultanés',
            detail:
              'Support Anthropic, OpenAI, Google, Kimi et OpenRouter. L\'utilisateur switch de provider sans changer de workflow.',
          },
        ]
      : [
          {
            step: '01',
            label: 'React + Monaco frontend',
            detail:
              'React-based UI with embedded Monaco editor, xterm terminal, and a chat panel to interact with AI agents.',
          },
          {
            step: '02',
            label: 'Rust backend (Tauri 2)',
            detail:
              'Native Rust core via Tauri 2 for file management, shell execution, and inter-process communication.',
          },
          {
            step: '03',
            label: 'Customizable AI harness',
            detail:
              'Tools, prompts, and descriptions fully editable by the user. Each tool has a modifiable contract without touching the code.',
          },
          {
            step: '04',
            label: 'Simultaneous multi-providers',
            detail:
              'Supports Anthropic, OpenAI, Google, Kimi, and OpenRouter. Users switch providers without changing their workflow.',
          },
        ]

  const modes =
    language === 'fr'
      ? [
          {
            title: 'Act — Single-turn',
            text: 'Exécution unique : l\'agent reçoit une instruction, utilise les outils nécessaires et renvoie un résultat immédiat sans boucle.',
          },
          {
            title: 'Goal — Boucle autonome',
            text: 'L\'agent poursuit un objectif en boucle, enchaînant les appels d\'outils jusqu\'à atteindre le résultat défini par l\'utilisateur.',
          },
          {
            title: 'Plan — Exploration interactive',
            text: 'Mode question-réponse : l\'agent explore le problème avec l\'utilisateur, pose des questions de clarification et propose un plan avant d\'agir.',
          },
        ]
      : [
          {
            title: 'Act — Single-turn',
            text: 'One-shot execution: the agent receives an instruction, uses the required tools, and returns an immediate result with no looping.',
          },
          {
            title: 'Goal — Autonomous loop',
            text: 'The agent pursues an objective in a loop, chaining tool calls until the user-defined result is achieved.',
          },
          {
            title: 'Plan — Interactive exploration',
            text: 'Q&A mode: the agent explores the problem with the user, asks clarifying questions, and proposes a plan before acting.',
          },
        ]

  const features =
    language === 'fr'
      ? [
          {
            title: 'Descriptions d\'outils éditables',
            text: 'Chaque outil (shell, fichiers, web, MCP…) a une description que l\'utilisateur peut reformuler, restreindre ou étendre pour modifier le comportement de l\'agent.',
          },
          {
            title: 'Swarm d\'agents',
            text: 'Système de coordination pair-à-pair avec tableau de tâches partagé. Plusieurs agents travaillent ensemble sur des sous-tâches en parallèle.',
          },
        ]
      : [
          {
            title: 'Editable tool descriptions',
            text: 'Each tool (shell, files, web, MCP…) has a description the user can rephrase, scope down, or extend to modify agent behavior.',
          },
          {
            title: 'Agent swarms',
            text: 'Peer-to-peer coordination system with shared task boards. Multiple agents work together on parallel sub-tasks.',
          },
        ]

  const tools = [
    'Shell', 'File Read', 'File Write', 'File Edit', 'Web Search', 'Web Fetch',
    'Image Generation', 'MCP Protocol', 'Git', 'Grep', 'Find', 'Directory Listing',
    'Code Analysis', 'Diff', 'Patch', 'Task Management', 'Agent Spawn',
    'Notification', 'Clipboard',
  ]

  return (
    <div className="relative font-sans text-white bg-black">
      <Header />

      <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-black">
        <TitleOpener
          title="CLAAKE CODE"
          titleOpacity={titleOpacity}
          subtitle={language === 'fr' ? 'IDE Desktop · Agents IA de développement' : 'Desktop IDE · AI Coding Agents'}
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
                GitHub — ClaakeCode
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
                    {language === 'fr' ? 'Solo Developer — Desktop, IA, Rust' : 'Solo Developer — Desktop, AI, Rust'}
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
                      ? "Claake Code est un IDE desktop qui embarque des agents IA de développement entièrement personnalisables. Le harness — outils, prompts et providers — est totalement remodelable, sans être imposé par un fournisseur."
                      : 'Claake Code is a desktop IDE featuring built-in AI coding agents that users can fully customize. The harness — tools, prompts, and providers — is entirely reshapeable rather than vendor-determined.'}
                  </p>
                  <p className="text-gray-400 leading-relaxed text-lg font-light">
                    {language === 'fr'
                      ? "L'IDE propose trois modes opérationnels distincts et intègre plus de 19 outils — shell, fichiers, recherche web, génération d'images, MCP — tout en supportant simultanément plusieurs providers IA."
                      : 'The IDE offers three distinct operational modes and integrates 19+ tools — shell, files, web search, image generation, MCP — while supporting multiple AI providers simultaneously.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                {language === 'fr' ? 'Trois modes opérationnels' : 'Three operational modes'}
              </h3>
              <p className="text-gray-600 font-mono text-xs mb-10">
                {language === 'fr'
                  ? 'Act · Goal · Plan — du one-shot à l\'autonomie complète'
                  : 'Act · Goal · Plan — from one-shot to full autonomy'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {modes.map((mode) => (
                  <div key={mode.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
                    <p className="text-sm font-semibold text-white mb-3">{mode.title}</p>
                    <p className="text-sm text-gray-400 font-light leading-relaxed">{mode.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                {language === 'fr' ? 'Architecture & stack technique' : 'Architecture & tech stack'}
              </h3>
              <p className="text-gray-600 font-mono text-xs mb-10">
                {language === 'fr'
                  ? 'Tauri 2 · React · Rust · Monaco Editor · xterm · MCP'
                  : 'Tauri 2 · React · Rust · Monaco Editor · xterm · MCP'}
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
                    { indent: 0, text: 'claake-code/', color: 'text-white' },
                    { indent: 1, text: 'src-tauri/ — Backend Rust, commandes Tauri', color: 'text-violet-400' },
                    { indent: 1, text: 'src/ — Frontend React + TypeScript', color: 'text-violet-400' },
                    { indent: 2, text: 'components/ — UI : éditeur, terminal, chat', color: 'text-indigo-400' },
                    { indent: 2, text: 'agents/ — Modes Act, Goal, Plan', color: 'text-indigo-400' },
                    { indent: 2, text: 'tools/ — 19+ outils avec descriptions éditables', color: 'text-green-400' },
                    { indent: 2, text: 'providers/ — Multi-provider IA', color: 'text-green-400' },
                    { indent: 1, text: 'tauri.conf.json — Config Tauri 2', color: 'text-gray-500' },
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
                {language === 'fr' ? 'Fonctionnalités clés' : 'Key features'}
              </h3>
              <p className="text-gray-600 font-mono text-xs mb-10">
                {language === 'fr'
                  ? 'Descriptions d\'outils éditables · Swarm d\'agents pair-à-pair'
                  : 'Editable tool descriptions · Peer-to-peer agent swarms'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {features.map((feat) => (
                  <div key={feat.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">{feat.title}</p>
                    <p className="text-gray-300 text-lg font-light leading-relaxed">{feat.text}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
                <p className="text-gray-500 mb-6 text-xs font-mono uppercase tracking-widest">
                  {language === 'fr' ? '19+ outils intégrés' : '19+ integrated tools'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span key={tool} className="px-3 py-1.5 bg-white/10 rounded-full text-sm text-gray-300 font-mono">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                {language === 'fr' ? 'Providers IA supportés' : 'Supported AI providers'}
              </h3>
              <p className="text-gray-600 font-mono text-xs mb-10">
                {language === 'fr'
                  ? 'Switch de provider sans changer de workflow'
                  : 'Switch providers without changing your workflow'}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {['Anthropic', 'OpenAI', 'Google', 'Kimi', 'OpenRouter'].map((provider) => (
                  <div key={provider} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                    <p className="text-sm font-mono text-white">{provider}</p>
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
