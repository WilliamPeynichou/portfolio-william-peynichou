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
        { title: 'Harness éditable', desc: "Chaque outil intégré (read, glob, grep, edit_file, write_file, bash, web, image, todo, question…) peut être activé, désactivé ou décrit autrement." },
        { title: 'Multi-provider', desc: 'Anthropic, OpenAI, Google, Kimi, Mistral, xAI, OpenRouter — clé API ou OAuth sur un abonnement existant. Les identifiants restent en local.' },
        { title: 'Sous-agents & swarms', desc: "Agents spécialisés configurables, équipes de 2 à 8 agents avec tableau de tâches partagé et messagerie." },
        { title: 'Serveurs MCP', desc: "Serveurs Model Context Protocol limités au workspace (commande, arguments, environnement, dossier de travail) et rechargés à chaud." },
        { title: 'Skills', desc: "34 skills incluses, licences tierces préservées. Skills locales en Markdown dans ~/.claakecode/skills et clonage de dépôts de skills." },
        { title: 'Bases de données', desc: 'Postgres, MySQL, SQLite, MSSQL ou Supabase REST, avec lecture seule, limite de lignes par source et confirmation des opérations destructives.' },
        { title: 'Contexte maîtrisé', desc: "Rollback par checkpoints, compaction auto/manuelle, et un outil clean_context pour que le modèle nettoie son propre contexte." },
        { title: 'Mémoire du projet', desc: "AGENTS.md et DESIGN.md sont injectés comme instructions : chaque dépôt porte son propre mode d'emploi et son design system." },
        { title: 'Recherche sémantique', desc: "Option mgrep : recherche en langage naturel à côté de ripgrep pour les correspondances exactes. L'indexation s'appuie sur le cloud et se lance manuellement." },
      ]
    : [
        { title: 'Editable harness', desc: 'Every built-in tool (read, glob, grep, edit_file, write_file, bash, web, image, todo, question…) can be toggled or described differently.' },
        { title: 'Multi-provider', desc: 'Anthropic, OpenAI, Google, Kimi, Mistral, xAI, OpenRouter — API key or OAuth on an existing subscription. Credentials stay local.' },
        { title: 'Sub-agents & swarms', desc: 'Configurable specialised agents, teams of 2 to 8 agents with a shared task board and messaging.' },
        { title: 'MCP servers', desc: 'Workspace-scoped Model Context Protocol servers (command, args, environment, working directory), hot-reloaded.' },
        { title: 'Skills', desc: '34 bundled skills with third-party licenses preserved. Local Markdown skills in ~/.claakecode/skills and skill repository cloning.' },
        { title: 'Databases', desc: 'Postgres, MySQL, SQLite, MSSQL or Supabase REST, with read-only mode, per-source row limits and destructive-operation confirmation.' },
        { title: 'Context under control', desc: 'Checkpoint rollback, auto/manual compaction, and a clean_context tool so the model cleans its own context.' },
        { title: 'Project memory', desc: 'AGENTS.md and DESIGN.md are injected as instructions: each repo carries its own operating manual and design system.' },
        { title: 'Semantic search', desc: 'Optional mgrep: natural-language search beside ripgrep for exact matches. Indexing is cloud-backed and started manually.' },
      ]

  const latest = fr
    ? [
        { title: 'Claaky, compagnon desktop', desc: "Toujours au premier plan, déplaçable (sa position est mémorisée), il réagit en temps réel aux 7 états de l'agent : repos, réflexion, travail, planification, terminé, erreur, sommeil. Un clic ouvre un chat en verre dépoli ; le raccourci global ⌃⌥Espace l'ouvre depuis n'importe quelle application." },
        { title: 'Modes Ask & Code', desc: "Ask répond directement, sans outils et sans ouvrir Claake Code. Code confie la tâche à l'IDE et l'ouvre si besoin. On peut coller du texte ou capturer une zone d'écran (macOS). Le compagnon a son historique, avec « Continuer dans Claake Code »." },
        { title: 'Salle 3D animée', desc: "Claaky tape à son bureau quand l'agent travaille, réfléchit devant le tableau blanc et dort sous une couverture au repos. La machine de test clignote en orange quand un test échoue. Plus léger : 7 animations au lieu de 20, 3 Mo d'images au lieu de 13 Mo." },
        { title: 'Nouveaux modèles', desc: "Kimi 3.1 Pro rejoint le provider Kimi : contexte de 256k, jusqu'à 32k de sortie, réflexion désactivée ou élevée (élevée par défaut). Mistral Large 4 arrive avec la v0.2.3." },
        { title: 'Benchmark & quota', desc: "Tours, durées et tokens mesurés par modèle depuis les sessions. Les coûts sont des estimations basées sur les prix que tu configures, ni des factures ni des scores de qualité. Le panneau de quota Anthropic affiche les derniers en-têtes de rate limit observés, pas le solde de l'abonnement." },
        { title: 'Skills Git & correctif Windows', desc: "Clonage de dépôts de skills avec leurs scripts et références, vérification et mise à jour manuelles : rien ne s'exécute à l'installation. Sous Windows, Reveal ouvre le dossier de la skill dans l'Explorateur, y compris avec des espaces dans le chemin." },
      ]
    : [
        { title: 'Claaky, desktop companion', desc: "Always on top and draggable (his position is remembered), he reacts in real time to the agent's 7 states: idle, thinking, working, planning, done, error and sleeping. A click opens a frosted-glass chat; the global ⌃⌥Space shortcut opens it from any app." },
        { title: 'Ask & Code modes', desc: "Ask answers directly, without tools and without opening Claake Code. Code hands the task to the IDE and opens it if needed. You can paste text or capture a screen area (macOS). The companion keeps its own history, with “Continue in Claake Code”." },
        { title: 'Animated 3D room', desc: "Claaky types at his desk while the agent works, thinks at the whiteboard and sleeps under a blanket when idle. The test machine flashes orange when a test fails. Lighter: 7 animations instead of 20, 3 MB of images instead of 13 MB." },
        { title: 'New models', desc: "Kimi 3.1 Pro joins the Kimi provider: 256k context window, up to 32k output tokens, thinking off or high (high by default). Mistral Large 4 arrives with v0.2.3." },
        { title: 'Benchmark & quota', desc: "Measured turns, timing and token usage by model from your sessions. Costs are estimates based on prices you configure, not invoices or quality scores. The Anthropic quota panel shows the latest rate-limit headers observed, not the subscription balance." },
        { title: 'Git skills & Windows fix', desc: "Clone skill repositories with their scripts and references intact, then check and update them manually: nothing runs on install. On Windows, Reveal opens the skill's folder in Explorer, including paths with spaces." },
      ]

  const rlmSteps = fr
    ? [
        { title: 'Onglet Chat | RLM', desc: "Un onglet à côté du chat, avec son propre historique. Même sélecteur de modèle, mêmes connexions et clés : comptes Anthropic et OpenAI, clés OpenRouter et Mistral." },
        { title: 'Auto Compute', desc: "Depuis un chat d'agent, un clic ouvre un chat RLM sur le même modèle : il reçoit la conversation, puis vérifie, mesure et relance ce qu'il faut en Python. Le chat d'origine reste intact." },
        { title: 'Worktree isolé', desc: "Chaque conversation a son git worktree sur une branche claakecode/rlm-…, tes fichiers ne sont pas touchés. L'agent s'exécute en local avec tes permissions : il n'y a pas de sandbox." },
        { title: 'Python persistant', desc: "Les variables survivent entre les messages : charge les données une fois, réutilise-les trois questions plus tard. Une page des Settings montre l'état du moteur, la version, la taille, l'emplacement et les paquets, avec un bouton de redémarrage." },
        { title: 'Reprise après coupure', desc: "Si la connexion tombe, Claake Code se rattache au tour en cours et comble le trou depuis le snapshot de Prime sans dupliquer le texte ni renvoyer ton prompt. Les conversations rouvrent avec leur historique." },
      ]
    : [
        { title: 'Chat | RLM tab', desc: 'A tab next to the chat, with its own history. Same model picker, sign-ins and keys: Anthropic and OpenAI accounts, OpenRouter and Mistral keys.' },
        { title: 'Auto Compute', desc: 'From an agent chat, one click opens an RLM chat on the same model: it receives the conversation, then checks, measures and re-runs what it needs in Python. The original chat stays untouched.' },
        { title: 'Isolated worktree', desc: 'Each conversation gets a git worktree on a claakecode/rlm-… branch, so your files stay untouched. The agent runs locally with your permissions: there is no sandbox.' },
        { title: 'Persistent Python', desc: 'Variables survive between messages: load data once, reuse it three questions later. A Settings page shows the engine state, version, size, location and packages, with a restart button.' },
        { title: 'Resumes after a cut', desc: "If the connection drops, Claake Code reattaches to the running turn and fills the gap from Prime's snapshot without duplicating text or resending your prompt. Conversations reopen with their history." },
      ]

  const rlmLimits = fr
    ? [
        { k: 'Moteur', v: 'Prime Agent 0.9.8, open source, épinglé sur un commit relu et embarqué dans l’application.' },
        { k: 'Plateformes', v: 'macOS uniquement. Windows et Linux n’embarquent pas encore le sidecar Prime Agent.' },
        { k: 'Providers', v: 'Anthropic, OpenAI, OpenRouter, Mistral. La connexion Google n’est pas encore prise en charge.' },
        { k: 'Statut', v: 'Expérimental. Nécessite un dépôt git avec au moins un commit. Auto Compute transmet le texte du chat, pas les résultats d’outils.' },
      ]
    : [
        { k: 'Engine', v: 'Prime Agent 0.9.8, open source, pinned to a reviewed commit and bundled with the app.' },
        { k: 'Platforms', v: 'macOS only. Windows and Linux do not bundle the Prime Agent sidecar yet.' },
        { k: 'Providers', v: 'Anthropic, OpenAI, OpenRouter, Mistral. Google sign-in is not supported yet.' },
        { k: 'Status', v: 'Experimental. Needs a git repository with at least one commit. Auto Compute hands over the chat text, not tool results.' },
      ]

  const webItems = fr
    ? [
        "Site multi-pages : Nouveautés, Features, Settings, Agent, Why et FAQ, avec une section RLM animée au scroll sur l'accueil",
        'SEO + GEO : données structurées, sitemap, robots, llms.txt, social preview',
        'Performance : vidéo 22 Mo → 0,9 Mo, shader capé, lazy loading',
        'Trois palettes de fond liquide au choix : forest, dusk et tide',
        'Pages légales, security.txt, headers de sécurité, assets auto-hébergés',
        'Téléchargements directs macOS, Windows et Linux',
      ]
    : [
        'Multi-page site: What’s new, Features, Settings, Agent, Why and FAQ, with a scroll-animated RLM section on the home page',
        'SEO + GEO: structured data, sitemap, robots, llms.txt, social preview',
        'Performance: video 22 MB → 0.9 MB, capped shader, lazy loading',
        'Three liquid-background palettes to choose from: forest, dusk and tide',
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
              <p className="text-gray-400 font-mono text-sm mt-6">
                {fr
                  ? 'La même boucle tourne sur tous les providers : Planifier → Agir → Observer → Réfléchir, jusqu’à ce que ce soit terminé.'
                  : 'The same loop runs across providers: Plan → Act → Observe → Reflect, until it is done.'}
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

            {/* Dernière version */}
            <div className="mb-24">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                    {fr ? 'Dernière version' : 'Latest version'} · {project.version}
                  </h3>
                  <p className="text-gray-600 font-mono text-xs">
                    {fr
                      ? 'Publiée le 25 octobre 2026. La v0.2.0 reste la plus grosse mise à jour à ce jour.'
                      : 'Released on October 25, 2026. v0.2.0 is still the biggest update so far.'}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href={`${project.liveLink}whats-new`} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white hover:bg-white/5 transition-all text-sm font-mono">
                    ↗ {fr ? 'Nouveautés' : "What's new"}
                  </a>
                  <a href={`${project.githubLink}/releases/tag/${project.version}`} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white hover:bg-white/5 transition-all text-sm font-mono">
                    ↗ {fr ? 'Notes de version' : 'Release notes'}
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {latest.map((f, i) => (
                  <div key={f.title} className="flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-white/5">
                    <span className="text-xs font-mono text-gray-600">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-sm font-semibold text-white">{f.title}</p>
                    <p className="text-xs text-gray-500 font-mono leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat RLM */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                {fr ? 'Chat RLM' : 'RLM chat'} · {fr ? 'expérimental, macOS' : 'experimental, macOS'}
              </h3>
              <p className="text-gray-300 text-lg font-light leading-relaxed max-w-3xl mb-10">
                {fr
                  ? "Un second chat qui garde son état : le moteur open source Prime Agent, avec un noyau Python persistant, qui travaille dans son propre git worktree."
                  : 'A second chat that keeps its state: the open-source Prime Agent engine, with a persistent Python kernel, working in its own git worktree.'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {rlmSteps.map((f, i) => (
                  <div key={f.title} className="flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-white/5">
                    <span className="text-xs font-mono text-gray-600">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-sm font-semibold text-white">{f.title}</p>
                    <p className="text-xs text-gray-500 font-mono leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">
                  {fr ? 'Limites à connaître' : 'Limits to know'}
                </p>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                  {rlmLimits.map(item => (
                    <div key={item.k}>
                      <dt className="text-sm font-semibold text-white mb-1">{item.k}</dt>
                      <dd className="text-xs text-gray-500 font-mono leading-relaxed">{item.v}</dd>
                    </div>
                  ))}
                </dl>
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
                      { label: 'Auto-updater', sub: "Mise à jour intégrée à l'application — plus de 80 releases publiées." },
                      { label: 'Zéro télémétrie', sub: 'Aucune collecte, aucun entraînement sur les conversations.' },
                    ]
                  : [
                      { label: 'Tauri 2 + Rust', sub: 'Core split into Rust crates (core, app, one crate per provider), React UI.' },
                      { label: 'GitHub Actions', sub: 'Universal macOS (.dmg), Windows (.exe) and Linux (.AppImage) builds on every tag.' },
                      { label: 'Auto-updater', sub: 'In-app updates — more than 80 releases shipped.' },
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
