import ScreenLoginAtIfit from '@/assets/ScreenLoginAt-Ifit.webp'
import HomeAtIfit from '@/assets/HomeAt-Ifit.webp'
import FormAddWeightAtIfit from '@/assets/FormAddWeightAt-Ifit.webp'
import GraphiqueWeightAtIfit from '@/assets/GraphiqueWeightAt-Ifit.webp'
import N8nAtIfit from '@/assets/8nAt-Ifit.webp'

// Youtube Design (PY) Imports
import HomePY from '@/assets/HomePY.webp'
import LoginPY from '@/assets/LoginPY.webp'
import AddVideoPY from '@/assets/AddVideoPY.webp'
import AdminPY from '@/assets/AdminPY.webp'
import CommPY from '@/assets/CommPY.webp'
import ListVideoPY from '@/assets/ListVideoPY.webp'
import PageVideoPY from '@/assets/PageVideoPY.webp'

export const projects = [
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
    githubLink: "https://github.com/WilliamPeynichou/At-ifit",
    n8nImage: N8nAtIfit,
    gallery: [
      ScreenLoginAtIfit,
      FormAddWeightAtIfit,
      GraphiqueWeightAtIfit,
    ]
  },
  {
    id: 2,
    slug: 'ecocycle',
    title: "Ecocycle",
    type: "E-commerce with chat bot and RAG with n8n",
    year: "2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    description: {
      fr: "Plateforme e-commerce écologique intégrant un assistant virtuel intelligent.",
      en: "Eco-friendly e-commerce platform integrating an intelligent virtual assistant."
    },
    technologies: ["React", "Node.js", "n8n", "MongoDB"],
    githubLink: null,
    gallery: []
  },
  {
    id: 3,
    slug: 'youtube-design',
    title: "Youtube Design",
    type: "Video website with Artistic Direction",
    year: "2025",
    image: HomePY,
    description: {
      fr: "Une plateforme de streaming vidéo inspirée de YouTube, mettant l'accent sur une interface utilisateur épurée et une direction artistique moderne. Le projet inclut une gestion complète des vidéos, des commentaires et un panneau d'administration.",
      en: "A video streaming platform inspired by YouTube, focusing on a clean user interface and modern artistic direction. The project includes full video management, comments, and an admin panel."
    },
    technologies: ["React", "CSS Modules", "Node.js", "Express", "MySQL"],
    githubLink: null,
    gallery: [
      LoginPY,
      PageVideoPY,
      ListVideoPY,
      AddVideoPY,
      CommPY,
      AdminPY
    ]
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
  },
  {
    id: 6,
    slug: 'trouve-ta-boite',
    title: "TrouveTaBoite",
    type: "Company Search Engine by Location & Activity",
    year: "2025",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
    description: {
      fr: "TrouveTaBoite est un moteur de recherche d'entreprises et d'associations basé sur une zone géographique et un domaine d'activité.\n\nLe principe est volontairement simple : un lieu, un rayon, un secteur d'activité — et tu obtiens toutes les entreprises autour de toi, avec leurs coordonnées.\n\nLe site exploite des APIs officielles du gouvernement français (open data), offrant des données légales et fiables. Utile pour un stagiaire qui cherche une entreprise à démarcher, un alternant en recherche de contrat, ou un patron qui a besoin d'un freelance à proximité.\n\nC'est un projet full-stack construit avec Node.js/Express en back-end et Vue.js avec TypeScript en front-end.",
      en: "TrouveTaBoite is a company and association search engine based on geographic area and business sector.\n\nThe concept is intentionally simple: a location, a radius, an activity sector — and you get all the companies around you, with their contact details.\n\nThe site leverages official French government APIs (open data), providing legal and reliable data. Useful for an intern looking for companies to contact, a work-study student seeking a contract, or a business owner needing a nearby freelancer.\n\nIt's a full-stack project built with Node.js/Express on the back-end and Vue.js with TypeScript on the front-end."
    },
    technologies: ["Vue.js", "TypeScript", "Node.js", "Express", "API Gouvernement"],
    githubLink: null,
    siteLink: "https://trouvetaboite.com",
    gallery: []
  }
]
