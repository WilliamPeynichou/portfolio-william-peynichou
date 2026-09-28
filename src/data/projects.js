import ScreenLoginAtIfit from '@/assets/ScreenLoginAt-Ifit.webp'
import HomeAtIfit from '@/assets/HomeAt-Ifit.webp'
import FormAddWeightAtIfit from '@/assets/FormAddWeightAt-Ifit.webp'
import GraphiqueWeightAtIfit from '@/assets/GraphiqueWeightAt-Ifit.webp'
import N8nAtIfit from '@/assets/8nAt-Ifit.webp'
import FiscaliaInterface from '@/assets/Fiscalia-interface.png'
import FiscaliaResponse from '@/assets/Fiscalia-response.png'
import ClaakeCodePoster from '@/assets/ClaakeCodePoster.webp'
import ClaakeCodePreview from '@/assets/ClaakeCodePreview.webp'
import RoadNetworkReseau from '@/assets/RoadNetwork-reseau.webp'
import RoadNetworkApprentissage from '@/assets/RoadNetwork-apprentissage.webp'
import RoadNetworkComparaison from '@/assets/RoadNetwork-comparaison.webp'

const projectOrder = [
  'at-ifit',
  'claake-code',
  'trouvetaboite',
  'fiscalia',
  'commis',
  'mars-ia',
  'portfolio',
  'road-network',
]

export const projects = [
  {
    id: 8,
    slug: 'claake-code',
    title: "Claake Code",
    type: "Open-source desktop AI coding IDE",
    year: "2026",
    image: ClaakeCodePoster,
    version: "v0.1.64",
    description: {
      fr: "Claake Code est un IDE desktop open source (MIT) pour coder avec des agents IA — en gardant la main sur tout le harness de l'agent. Chaque outil peut être activé, désactivé ou réécrit, chaque provider est branchable, et l'agent ne voit que la surface que tu lui laisses.\n\nLe projet est parti d'un fork de Sinew, puis a été entièrement rebrandé et étendu : 4 modes (Act, Ask en lecture seule, Goal, Plan) avec un modèle et un prompt éditable par mode, sous-agents et swarms d'agents avec tableau de tâches partagé, serveurs MCP, skills en Markdown, sources de bases de données sécurisées (lecture seule, limite de lignes, confirmation des opérations destructives), rollback par checkpoints, compaction et nettoyage de contexte, et un vrai éditeur Monaco + terminal xterm.\n\nMulti-provider sur la même boucle d'agent : Anthropic, OpenAI, Google, Kimi, Mistral, xAI et OpenRouter — par clé API ou via OAuth pour réutiliser un abonnement existant. Aucune télémétrie. Distribué pour macOS, Windows et Linux avec auto-updater, et accompagné de ClaakeCodeWeb, le site vitrine (landing FR/EN, SEO/GEO, pages légales).",
      en: "Claake Code is an open-source (MIT) desktop IDE for coding with AI agents — while keeping full control over the agent harness. Every tool can be toggled or rewritten, every provider is pluggable, and the agent only sees the surface area you keep.\n\nThe project started as a fork of Sinew and was fully rebranded and extended: 4 modes (Act, read-only Ask, Goal, Plan) each with its own model and editable prompt, sub-agents and agent swarms with a shared task board, MCP servers, Markdown skills, safeguarded database sources (read-only mode, row limits, destructive-operation confirmation), checkpoint rollback, compaction and context cleaning, and a real Monaco editor + xterm terminal.\n\nMulti-provider on the same agent loop: Anthropic, OpenAI, Google, Kimi, Mistral, xAI and OpenRouter — through API keys or OAuth to reuse an existing subscription. No telemetry. Shipped for macOS, Windows and Linux with an auto-updater, alongside ClaakeCodeWeb, the product website (FR/EN landing, SEO/GEO, legal pages)."
    },
    technologies: ["Tauri 2", "Rust", "React", "TypeScript", "Monaco", "xterm.js", "MCP", "GitHub Actions", "Vercel"],
    liveLink: "https://claakecode-web.vercel.app/",
    githubLink: "https://github.com/WilliamPeynichou/ClaakeCode",
    downloadLink: "https://github.com/WilliamPeynichou/ClaakeCode/releases/latest",
    gallery: [ClaakeCodePreview]
  },
  {
    id: 9,
    slug: 'road-network',
    title: "RoadNetwork",
    type: "Machine learning · Q-learning · Matplotlib",
    year: "2026",
    image: RoadNetworkReseau,
    description: {
      fr: "RoadNetwork est un projet de machine learning appliqué à la circulation : des véhicules apprennent par renforcement à choisir leur trajectoire et leur allure pour réduire les collisions. Le projet comprend aussi un générateur procédural de réseau routier sur une grille, avec animation de la construction des routes et circulation des véhicules, entièrement rendu avec Matplotlib (animation, widgets, patches). Projet d'équipe du Bootcamp Python B3 — Sup de Vinci.\n\nLa fenêtre propose des curseurs (routes, intersections visées, véhicules), une seed reproductible, le plus court chemin START → END (BFS) surligné, la détection et le comptage des collisions, et trois conduites au choix : hasard, règle de divergence, ou conduite apprise.\n\nLa conduite apprise repose sur un Q-learning écrit à la main (~170 lignes, sans librairie ML) : les véhicules apprennent seuls à choisir leur sortie et leur allure pour éviter les collisions. Sur 20 réseaux jamais vus, ils passent de 86 collisions/min (hasard) à moins de 10, avec des trajets plus courts. Le tout couvert par 137 tests pytest, ruff et un balayage automatique de 120 réseaux.",
      en: "RoadNetwork is a machine learning project applied to traffic: vehicles learn through reinforcement to choose routes and speeds that reduce collisions. It also includes a procedural road-network generator on a grid, with animated road construction and vehicle traffic, fully rendered with Matplotlib (animation, widgets, patches). Team project for the Python B3 Bootcamp — Sup de Vinci.\n\nThe window offers sliders (roads, target intersections, vehicles), a reproducible seed, the START → END shortest path (BFS) highlighted, collision detection and counting, and three driving modes: random, divergence rule, or learned driving.\n\nLearned driving relies on hand-written Q-learning (~170 lines, no ML library): vehicles learn by themselves which exit and pace to pick to avoid collisions. On 20 unseen networks, they go from 86 collisions/min (random) to under 10, with shorter trips. Everything is covered by 137 pytest tests, ruff and an automated sweep over 120 networks."
    },
    technologies: ["Python 3.14", "Matplotlib", "Q-learning", "BFS", "pytest", "ruff"],
    githubLink: "https://github.com/WilliamPeynichou/Matplotlib",
    gallery: [RoadNetworkReseau, RoadNetworkApprentissage, RoadNetworkComparaison]
  },
  {
    id: 0,
    slug: 'trouvetaboite',
    title: "TrouveTaBoite",
    type: "Company Finder & job-search toolkit — Open Data",
    year: "2025 — 2026",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
    description: {
      fr: "TrouveTaBoite est un outil de recherche d'entreprises basé sur les données open data du gouvernement français. En quelques clics : un lieu, un rayon, un secteur d'activité, une forme juridique — et tu obtiens toutes les entreprises autour de toi avec leurs coordonnées, sur une carte.\n\nL'idée est née d'un constat simple : les meilleurs recrutements passent par la candidature spontanée. Encore faut-il savoir qui contacter. Plutôt que d'utiliser des données privées ou payantes, le projet exploite les APIs officielles et gratuites mises à disposition par les services publics français.\n\nL'outil est devenu une boîte à outils de recherche d'emploi : recherche d'associations, sélection de candidatures avec suivi (à contacter, contactée, à relancer) et export sans compte, guide de l'alternance, et un générateur de CV assisté par IA adapté au type de contrat (CDI, CDD, intérim, alternance) et au secteur, en version ATS ou design.\n\nL'application totalise plus de 1 000 utilisateurs par mois : stagiaires, alternants, freelances et patrons qui cherchent des prestataires à proximité.",
      en: "TrouveTaBoite is a company search tool built on French government open data. A few clicks — a location, a radius, a business sector, a legal form — and you get every company around you with their contact details, on a map.\n\nThe idea came from a simple observation: the best recruitments happen through direct outreach, not job listings. But that requires knowing who to contact. Rather than using private or paid data, the project leverages the official, free APIs provided by French public services.\n\nThe tool has grown into a job-search toolkit: association search, an application shortlist with tracking (to contact, contacted, follow up) and export with no account needed, a work-study guide, and an AI-assisted CV builder adapted to the contract type (permanent, fixed-term, temp, work-study) and the sector, in ATS or design flavour.\n\nThe app reaches over 1,000 users per month: interns, apprentices, freelancers, and business owners looking for nearby service providers."
    },
    technologies: ["React", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "API Recherche Entreprises", "API Sirene", "geo.gouv.fr", "Vercel", "Railway", "GitHub Actions"],
    liveLink: "https://www.trouvetaboite.com",
    githubLink: "https://github.com/WilliamPeynichou/FindYourCompany",
    gallery: []
  },
  {
    id: 1,
    slug: 'at-ifit',
    title: "At Ifit",
    type: "Data science appliquée au sport · Strava & nutrition",
    year: "2025 — 2026",
    image: HomeAtIfit,
    description: {
      fr: "At Ifit est mon projet de data science appliquée au sport : une application de suivi sportif et nutritionnel connectée à Strava. Elle met en corrélation l'évolution du poids avec les activités importées, et propose des dashboards dédiés au vélo, à la course et à la natation, avec un sélecteur temporel global (3M, 6M, 12M, personnalisé) et des modales d'analyse plein écran.\n\nLe fonctionnement est simple : après l'inscription, l'utilisateur renseigne son profil et son objectif, puis connecte Strava (ou passe cette étape). Le calculateur KCAL estime le métabolisme (Mifflin-St Jeor) et l'ajuste avec l'activité réelle pour donner une cible calorique journalière.\n\nL'application s'est enrichie d'un pôle nutrition (carte nutrition d'effort, préparation de course et plan de ravitaillement triathlon, modèles de produits recommandés selon le profil, comparateur d'aliments, page sources) et d'un coach IA agentique qui interroge les données de l'utilisateur via des outils. Mode sombre, multilingue (FR, EN, IT, TR), et une conformité complète : bandeau de consentement, pages légales, export et suppression des données (RGPD).\n\nL'application est inclusive et adaptée à tous : femmes, hommes et personnes transgenres.",
      en: "At Ifit is my sports data science project: a sports and nutrition tracking app connected to Strava. It correlates weight evolution with imported activities and offers dedicated cycling, running and swimming dashboards, with a global time selector (3M, 6M, 12M, custom) and full-screen analysis modals.\n\nHow it works: after signing up, users fill in their profile and goal, then connect Strava (or skip it). The KCAL calculator estimates metabolism (Mifflin-St Jeor) and adjusts it with real activity to give a daily caloric target.\n\nThe app has grown a nutrition hub (effort nutrition card, race preparation and triathlon fueling plan, product models recommended by athlete profile, food comparisons, sources page) and an agentic AI coach that queries the user's data through tools. Dark mode, multilingual (FR, EN, IT, TR), and full compliance: consent banner, legal pages, data export and deletion (GDPR).\n\nThe platform is inclusive and designed for everyone: women, men, and transgender individuals."
    },
    technologies: [
      "React",
      "Node.js",
      "Express",
      "Tailwind CSS",
      "Recharts",
      "Strava API",
      "AI agent (Anthropic / Mistral)",
      "MySQL",
      "Sequelize",
      "Railway"
    ],
    liveLink: "https://atifit.up.railway.app/",
    githubLink: "https://github.com/WilliamPeynichou/At-ifit",
    n8nImage: N8nAtIfit,
    gallery: [
      ScreenLoginAtIfit,
      FormAddWeightAtIfit,
      GraphiqueWeightAtIfit,
    ]
  },
  {
    id: 3,
    slug: 'commis',
    title: "Commis",
    type: "Recipe Planner with Claude AI",
    year: "2026",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=2680&auto=format&fit=crop",
    description: {
      fr: "Commis est un planificateur de recettes intelligent propulsé par Claude Haiku (Anthropic). L'application génère, organise et planifie des recettes personnalisées grâce à un assistant IA intégré.\n\nChaque appel à l'API Haiku 4.5 enrichit automatiquement une base de données vectorielle. Avec le temps, les requêtes similaires sont résolues directement depuis cette mémoire sémantique — sans appel API — rendant l'application progressivement autonome et moins coûteuse.\n\nL'architecture est un monorepo : frontend React/TypeScript sur Vercel, backend Express/Prisma sur Railway avec PostgreSQL + pgvector.",
      en: "Commis is an intelligent recipe planner powered by Claude Haiku (Anthropic). The app lets users generate, organize, and plan personalized recipes through an integrated AI assistant.\n\nEvery Haiku 4.5 API call automatically enriches a vector database. Over time, similar queries are resolved directly from this semantic memory — no API call needed — making the app progressively autonomous and cheaper to run.\n\nThe architecture is a monorepo: React/TypeScript frontend on Vercel, Express/Prisma backend on Railway with PostgreSQL + pgvector."
    },
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Express", "Prisma", "Claude Haiku 4.5", "pgvector", "Railway", "Vercel"],
    liveLink: "https://commis-frontend.vercel.app/",
    githubLink: "https://github.com/WilliamPeynichou/Commis",
    gallery: []
  },
  {
    id: 7,
    slug: 'fiscalia',
    title: "Fiscalia",
    type: "French Tax AI Agent — RAG & Vector Search",
    year: "2026",
    image: FiscaliaInterface,
    description: {
      fr: "Fiscalia est un agent IA spécialisé dans la fiscalité et la bureaucratie française. L'objectif côté produit est simple : transformer des démarches complexes en réponses compréhensibles, actionnables et contextualisées.\n\nSous le capot, le projet repose sur un pipeline RAG complet avec base de données vectorielle, embeddings Voyage AI, PostgreSQL + pgvector et une interface web Next.js pensée pour un usage conversationnel fluide.",
      en: "Fiscalia is an AI agent focused on French tax and administrative topics. From a product perspective, the goal is simple: turn complex procedures into understandable, actionable, and contextualized answers.\n\nUnder the hood, the project relies on a full RAG pipeline with a vector database, Voyage AI embeddings, PostgreSQL + pgvector, and a Next.js web interface designed for smooth conversational use."
    },
    technologies: [
      "Next.js 15",
      "React 19",
      "Claude Sonnet 4.6",
      "Voyage AI",
      "PostgreSQL 16",
      "pgvector",
      "Drizzle ORM",
      "Docker Compose"
    ],
    githubLink: "https://github.com/WilliamPeynichou/fiscalia",
    gallery: [FiscaliaInterface, FiscaliaResponse]
  },
  {
    id: 4,
    slug: 'portfolio',
    title: "Portfolio",
    type: "Portfolio website with React and Tailwind CSS/Animate UI",
    year: "2025",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2574&auto=format&fit=crop",
    description: {
      fr: "Mon portfolio personnel présentant mes projets et compétences.",
      en: "My personal portfolio showcasing my projects and skills."
    },
    technologies: ["React", "Tailwind CSS", "Three.js", "React Three Fiber", "Anime.js"],
    githubLink: "https://github.com/WilliamPeynichou/Portfolio_",
    gallery: []
  },
  {
    id: 5,
    slug: 'mars-ia',
    title: "MarsIA",
    type: "AI Short Film Festival Mockup",
    year: "2026",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2574&auto=format&fit=crop",
    description: {
      fr: "Maquette pour un festival de court métrage basé sur la réalisation IA.",
      en: "Mockup for an AI-based short film festival."
    },
    technologies: ["React", "CSS", "Design"],
    githubLink: "https://github.com/WilliamPeynichou/marsIA",
    gallery: []
  }
].sort((a, b) => projectOrder.indexOf(a.slug) - projectOrder.indexOf(b.slug))
