import ScreenLoginAtIfit from '@/assets/ScreenLoginAt-Ifit.webp'
import HomeAtIfit from '@/assets/HomeAt-Ifit.webp'
import FormAddWeightAtIfit from '@/assets/FormAddWeightAt-Ifit.webp'
import GraphiqueWeightAtIfit from '@/assets/GraphiqueWeightAt-Ifit.webp'
import N8nAtIfit from '@/assets/8nAt-Ifit.webp'

export const projects = [
  {
    id: 0,
    slug: 'trouvetaboite',
    title: "TrouveTaBoite",
    type: "Company Finder — Open Data APIs",
    year: "2025",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
    description: {
      fr: "TrouveTaBoite est un outil de recherche d'entreprises basé sur les données open data du gouvernement français. En quelques clics : un lieu, un rayon, un secteur d'activité — et tu obtiens toutes les entreprises autour de toi avec leurs coordonnées.\n\nL'idée est née d'un constat simple : les meilleurs recrutements passent par la candidature spontanée. Encore faut-il savoir qui contacter. Plutôt que d'utiliser des données privées ou payantes, le projet exploite les APIs officielles et gratuites mises à disposition par les services publics français.\n\nL'application totalise plus de 1 000 utilisateurs par mois et répond à un besoin concret : stagiaires, alternants, freelances et patrons qui cherchent des prestataires à proximité.",
      en: "TrouveTaBoite is a company search tool built on French government open data. A few clicks — a location, a radius, a business sector — and you get every company around you with their contact details.\n\nThe idea came from a simple observation: the best recruitments happen through direct outreach, not job listings. But that requires knowing who to contact. Rather than using private or paid data, the project leverages the official, free APIs provided by French public services.\n\nThe app reaches over 1,000 users per month and addresses a real need: interns, apprentices, freelancers, and business owners looking for nearby service providers."
    },
    technologies: ["React", "Node.js", "Express", "API Sirene", "API Recherche Entreprises", "geo.gouv.fr", "Vercel"],
    liveLink: "https://trouvetaboite.com",
    githubLink: "https://github.com/WilliamPeynichou/FindYourCompany",
    gallery: []
  },
  {
    id: 1,
    slug: 'at-ifit',
    title: "At Ifit",
    type: "Sport Data with RAG on chat bot",
    year: "2025",
    image: HomeAtIfit,
    description: {
      fr: "Cet outil est un double tracker (2-en-1) qui met en corrélation l'évolution du poids avec les activités importées de Strava. Il offre des visualisations graphiques dédiées aux performances sportives ainsi qu'à la perte ou au gain de poids.\n\nLe fonctionnement est simple : après l'inscription, l'utilisateur renseigne son poids actuel, son objectif (perte ou gain) et connecte son compte Strava. Une analyse personnalisée basée sur le profil (genre inclusif, poids) fournit l'IMC et une cible calorique journalière. Une section d'aide détaillée accompagne l'utilisateur pour comprendre chaque métrique.\n\nL'application est inclusive et adaptée à tous : femmes, hommes et personnes transgenres.",
      en: "This tool is a 2-in-1 tracker correlating weight evolution with Strava activities. It features dedicated charts for both sports performance and weight loss/gain analysis.\n\nHow it works: after signing up, users enter their current weight, their goal (loss or gain), and connect their Strava account. A personalized analysis based on the profile (inclusive gender, weight) provides BMI and a daily caloric target. A detailed help section explains every metric.\n\nThe platform is inclusive and designed for everyone: women, men, and transgender individuals."
    },
    technologies: [
      "React",
      "Node.js",
      "Express",
      "n8n AI Agent",
      "Gemini",
      "MySQL",
      "Bore Tunnel"
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
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
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
]
