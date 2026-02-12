export const workflows = [
  {
    id: 'velo-expert',
    slug: 'velo-expert',
    title: 'Velo Expert',
    type: 'AI Agent & Automation',
    year: '2025',
    image: '/assets/profile.webp', // Placeholder
    description: {
      fr: "Un agent spécialisé dans l'expertise technique et le conseil pour les passionnés de cyclisme, optimisé par n8n.",
      en: "A specialized agent for technical expertise and advice for cycling enthusiasts, powered by n8n."
    },
    technologies: ['n8n', 'OpenAI', 'Google Sheets', 'Discord']
  },
  {
    id: 'nutrition-assistant',
    slug: 'assistant-sport-nutrition',
    title: 'Assistant Sport Nutrition',
    type: 'AI Health Coach',
    year: '2025',
    image: '/assets/profile.webp', // Placeholder
    description: {
      fr: "Assistant intelligent analysant vos besoins nutritionnels en fonction de votre activité physique réelle.",
      en: "Intelligent assistant analyzing your nutritional needs based on your actual physical activity."
    },
    technologies: ['n8n', 'Gemini', 'Strava API', 'PostgreSQL']
  },
  {
    id: 'discord-veille',
    slug: 'bot-veille-discord',
    title: 'Bot Veille Discord',
    type: 'Automation & Scraping',
    year: '2025',
    image: '/assets/profile.webp', // Placeholder
    description: {
      fr: "Bot de veille automatisé scrutant le web pour centraliser les actualités tech sur un serveur Discord.",
      en: "Automated monitoring bot scanning the web to centralize tech news on a Discord server."
    },
    technologies: ['n8n', 'RSS', 'Discord API', 'Node.js']
  }
];

