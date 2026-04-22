export const workflows = [
  {
    id: 'ai-code-pipeline',
    slug: 'ai-code-pipeline',
    title: 'AI Code Pipeline',
    type: 'AI Pipeline / Developer Tool',
    year: '2026',
    image: '/assets/profile.webp',
    githubUrl: 'https://github.com/WilliamPeynichou/ai-code-pipeline',
    description: {
      fr: "Pipeline de recherche hybride (lexicale + sémantique) conçu pour les coding agents. Remonte les ~5 chunks réellement pertinents d'une codebase au lieu de dumper des fichiers entiers, avec un objectif de réduction de l'empreinte carbone des LLMs.",
      en: "Hybrid search pipeline (lexical + semantic) designed for coding agents. Surfaces the ~5 truly relevant chunks from a codebase instead of dumping entire files, with a goal of reducing the carbon footprint of LLM usage."
    },
    technologies: ['Python', 'FAISS', 'sentence-transformers', 'tree-sitter', 'ripgrep', 'cross-encoder']
  },
  {
    id: 'commis-ai',
    slug: 'commis-ai',
    title: 'CommisAI',
    type: 'Agentic RAG · Claude Haiku 4.5',
    year: '2026',
    image: '/assets/profile.webp',
    liveLink: 'https://commis-frontend.vercel.app',
    githubUrl: 'https://github.com/WilliamPeynichou/Commis',
    description: {
      fr: "Planificateur de recettes propulsé par Claude Haiku 4.5 avec une couche RAG auto-apprenante. L'agent route chaque requête : similarité vectorielle > 0.82 → réponse DB directe, sinon appel Anthropic SDK + vectorisation + stockage pgvector. Plus l'app est utilisée, moins elle appelle l'API.",
      en: "Recipe planner powered by Claude Haiku 4.5 with a self-learning RAG layer. The agent routes each request: vector similarity > 0.82 → direct DB response, otherwise Anthropic SDK call + vectorization + pgvector storage. The more the app is used, the fewer API calls it makes."
    },
    technologies: ['Claude Haiku 4.5', 'pgvector', 'PostgreSQL', 'Prisma', 'Express', 'TypeScript', 'React', 'Vercel', 'Railway']
  },
  {
    id: 'bot-veille-py',
    slug: 'bot-veille-py',
    title: 'BotVeillePy',
    type: 'Automation & Scraping',
    year: '2025',
    image: '/assets/profile.webp',
    githubUrl: 'https://github.com/WilliamPeynichou/BotVeillePy',
    description: {
      fr: "Bot Discord de veille technologique automatique, collectant l'actualité sur 4 catégories (IA dev, frameworks web, sécurité, emploi) via des flux RSS multi-sources et générant des rapports synthétiques chaque lundi à 11h. Développé comme expérimentation Vibecode pour évaluer Claude de bout en bout.",
      en: "Automated Discord tech monitoring bot collecting news across 4 categories (dev AI, web frameworks, security, job market) via multi-source RSS feeds, generating structured weekly reports every Monday at 11am. Built as a Vibecode experiment to evaluate Claude end-to-end."
    },
    technologies: ['Python', 'discord.py', 'APScheduler', 'feedparser', 'aiohttp', 'BeautifulSoup', 'Docker']
  }
];

