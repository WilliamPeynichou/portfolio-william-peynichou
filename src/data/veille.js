// Références de veille et recommandations, classées par plateforme.
// note.fr / note.en : ton commentaire personnel sur chaque référence.

export const veilleCategories = [
  {
    id: 'youtube',
    label: 'YouTube',
    items: [
      {
        name: 'Shubham Sharma',
        handle: '@Shubham_Sharma',
        url: 'https://www.youtube.com/@Shubham_Sharma',
        note: { fr: 'Recommandé par Yusuf.', en: 'Recommended by Yusuf.' },
      },
      {
        name: 'Underscore_',
        handle: '@Underscore_',
        url: 'https://www.youtube.com/@Underscore_',
        note: { fr: 'Le podcast de Micode.', en: "Micode's podcast." },
      },
    ],
  },
  {
    id: 'x',
    label: 'X (Twitter)',
    items: [
      {
        name: 'Rayane Rachid',
        handle: '@RayaneRachid_',
        url: 'https://x.com/RayaneRachid_',
        note: {
          fr: 'Il est marrant, il a un énorme FOMO, mais il dit et fait des choses très intéressantes.',
          en: 'He is funny and has a huge FOMO, but he says and does very interesting things.',
        },
      },
      {
        name: 'leasdsgn',
        handle: '@leasdsgn',
        url: 'https://x.com/leasdsgn',
        note: {
          fr: 'Parle de design avec l’IA sur les sites web.',
          en: 'Talks about AI-assisted web design.',
        },
      },
      {
        name: 'Yann Decoopman',
        handle: '@YannDecoopman',
        url: 'https://x.com/YannDecoopman',
        note: {
          fr: 'Il parle moins, mais quand il parle, ce n’est pas pour rien.',
          en: 'He talks less, but when he does, it is never for nothing.',
        },
      },
      {
        name: 'bcherny',
        handle: '@bcherny',
        url: 'https://x.com/bcherny',
        note: { fr: 'Le créateur de Claude Code.', en: 'The creator of Claude Code.' },
      },
      {
        name: 'steipete',
        handle: '@steipete',
        url: 'https://x.com/steipete',
        note: { fr: 'Celui qui a fait OpenClaw.', en: 'The person behind OpenClaw.' },
      },
      {
        name: 'Nous Research',
        handle: '@NousResearch',
        url: 'https://x.com/NousResearch',
        note: { fr: 'Hermes Agent.', en: 'Hermes Agent.' },
      },
      {
        name: 'hilbertspaess',
        handle: '@hilbertspaess',
        url: 'https://x.com/hilbertspaess',
        note: { fr: 'Lanceur d’alerte sur l’IA.', en: 'AI whistleblower.' },
      },
      {
        name: 'Yann LeCun',
        handle: '@ylecun',
        url: 'https://x.com/ylecun',
        note: {
          fr: 'Français, ex-Meta, travaille sur l’AGI.',
          en: 'French, ex-Meta, works on AGI.',
        },
      },
      {
        name: 'Capetlevrai',
        handle: '@Capetlevrai',
        url: 'https://x.com/Capetlevrai',
        note: { fr: 'Le vibecodeur riche.', en: 'The rich vibe coder.' },
      },
      {
        name: 'Polymarket',
        handle: '@Polymarket',
        url: 'https://x.com/Polymarket',
        note: {
          fr: 'À regarder pour ce qu’ils tweetent, pas pour ce qu’ils font.',
          en: 'Look at what they tweet, not at what they do.',
        },
      },
      {
        name: 'OpenAI Devs',
        handle: '@OpenAIDevs',
        url: 'https://x.com/OpenAIDevs',
        note: { fr: 'OpenAI pour les développeurs.', en: 'OpenAI for developers.' },
      },
      {
        name: 'Mistral Devs',
        handle: '@MistralDevs',
        url: 'https://x.com/MistralDevs',
        note: { fr: 'Mistral pour les développeurs.', en: 'Mistral for developers.' },
      },
      {
        name: 'Claude Devs',
        handle: '@ClaudeDevs',
        url: 'https://x.com/ClaudeDevs',
        note: { fr: 'Claude pour les développeurs.', en: 'Claude for developers.' },
      },
    ],
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    items: [
      {
        name: 'Alexandre Lebrun',
        handle: 'alexandrelebrun',
        url: 'https://www.linkedin.com/in/alexandrelebrun/',
        note: {
          fr: 'Chercheur sur les world models.',
          en: 'Researcher on world models.',
        },
      },
      {
        name: 'Yann LeCun',
        handle: 'yann-lecun',
        url: 'https://www.linkedin.com/in/yann-lecun/',
        note: { fr: 'Yann LeCun.', en: 'Yann LeCun.' },
      },
      {
        name: 'École Polytechnique',
        handle: 'ecole-polytechnique',
        url: 'https://www.linkedin.com/school/ecole-polytechnique/home/',
        note: { fr: 'Polytechnique.', en: 'Polytechnique.' },
      },
      {
        name: 'Rayane Rachid',
        handle: 'rayane-rachid',
        url: 'https://www.linkedin.com/in/rayane-rachid-a47514275/',
        note: { fr: 'Rayane Rachid lui-même.', en: 'Rayane Rachid himself.' },
      },
    ],
  },
  {
    id: 'sites',
    label: { fr: 'Sites & outils', en: 'Sites & tools' },
    items: [
      {
        name: 'Claude Code — Skills',
        handle: 'code.claude.com',
        url: 'https://code.claude.com/docs/fr/skills',
        note: {
          fr: 'Tutos pour apprendre à utiliser les skills.',
          en: 'Tutorials on how to use skills.',
        },
      },
      {
        name: 'caveman',
        handle: 'github.com/juliusbrussee/caveman',
        url: 'https://github.com/juliusbrussee/caveman',
        note: {
          fr: 'Repo Git pour économiser des tokens.',
          en: 'Git repo to save tokens.',
        },
      },
      {
        name: 'Cursor Agents',
        handle: 'cursor.com/agents',
        url: 'https://cursor.com/agents',
        note: {
          fr: 'IDE pour découvrir le code avec des agents. Nécessite un abonnement Cursor.',
          en: 'IDE to discover code with agents. Requires a Cursor subscription.',
        },
      },
      {
        name: 'Claake Code',
        handle: 'claakecode-web.vercel.app',
        url: 'https://claakecode-web.vercel.app/',
        note: {
          fr: 'IDE pour apprendre à comprendre et gérer l’IA. Fonctionne avec les abonnements de base.',
          en: 'IDE to learn how to understand and manage AI. Works with standard subscriptions.',
        },
      },
    ],
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    items: [
      {
        name: 'trotelalexandre',
        handle: '@trotelalexandre',
        url: 'https://www.tiktok.com/@trotelalexandre',
        note: { fr: 'Vulgarise ses sujets tech.', en: 'Makes tech topics easy to understand.' },
      },
      {
        name: 'hasheur',
        handle: '@hasheur',
        url: 'https://www.tiktok.com/@hasheur',
        note: {
          fr: 'Orienté finance et tech blockchain.',
          en: 'Focused on finance and blockchain tech.',
        },
      },
      {
        name: 'hadrien.ai',
        handle: '@hadrien.ai',
        url: 'https://www.tiktok.com/@hadrien.ai',
        note: {
          fr: 'Il crame des tokens, mais c’est parfois cool.',
          en: 'He burns through tokens, but it is sometimes cool.',
        },
      },
      {
        name: 'estherium__',
        handle: '@estherium__',
        url: 'https://www.tiktok.com/@estherium__',
        note: { fr: 'Parle d’actu et de tests.', en: 'Talks about news and tests.' },
      },
      {
        name: 'komi_tech',
        handle: '@komi_tech',
        url: 'https://www.tiktok.com/@komi_tech',
        note: { fr: 'Parle de tech.', en: 'Talks about tech.' },
      },
      {
        name: '0xloucash',
        handle: '@0xloucash',
        url: 'https://www.tiktok.com/@0xloucash',
        note: {
          fr: 'Marrant et cool franchement, propose souvent de bonnes habitudes dans le code avec l’IA.',
          en: 'Funny and genuinely good, often suggests good habits for coding with AI.',
        },
      },
      {
        name: 'unefille.ia',
        handle: '@unefille.ia',
        url: 'https://www.tiktok.com/@unefille.ia',
        note: {
          fr: 'Une des premières à avoir fait des vidéos sur l’IA.',
          en: 'One of the first to make videos about AI.',
        },
      },
    ],
  },
]

export function categoryLabel(category, language) {
  return typeof category.label === 'string' ? category.label : category.label[language]
}
