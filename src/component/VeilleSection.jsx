import { Link } from 'react-router-dom'
import { useLanguage } from '@/context/useLanguage'

const articles = [
  {
    date: '2026',
    title: { fr: 'Un agent IA sous contrôle', en: 'An AI agent under control' },
    description: {
      fr: 'Outils éditables, modes de travail, swarms et garde-fous des bases de données dans Claake Code.',
      en: 'Editable tools, work modes, swarms and database safeguards in Claake Code.',
    },
    tags: ['AI', 'Agents', 'Rust'],
    to: '/project/claake-code',
  },
  {
    date: '2026',
    title: { fr: 'Apprendre à conduire sans collisions', en: 'Learning to drive without collisions' },
    description: {
      fr: 'Une simulation Matplotlib où des véhicules apprennent leurs trajectoires par Q-learning.',
      en: 'A Matplotlib simulation where vehicles learn their routes through Q-learning.',
    },
    tags: ['Python', 'Q-learning', 'Matplotlib'],
    to: '/project/road-network',
  },
  {
    date: '2026',
    title: { fr: 'Le RAG appliqué à la fiscalité', en: 'RAG for French tax guidance' },
    description: {
      fr: 'Recherche vectorielle et réponses contextualisées pour rendre les démarches fiscales plus accessibles.',
      en: 'Vector search and contextual answers to make tax procedures more accessible.',
    },
    tags: ['RAG', 'PostgreSQL', 'AI'],
    to: '/project/fiscalia',
  },
]

function VeilleSection() {
  const { language } = useLanguage()

  return (
    <section id="veille" className="py-32 px-4 md:px-12 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-6 max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight">
            {language === 'fr' ? 'Explorations techniques' : 'Technical explorations'}
          </h2>
          <p className="text-xl text-gray-400 font-light leading-relaxed">
            {language === 'fr' ? 'Des sujets concrets explorés au fil de mes projets.' : 'Concrete topics explored through my projects.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(item => (
            <Link key={item.to} to={item.to}
              className="group flex flex-col gap-4 p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#910aff]/50 transition-all duration-300">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-gray-500">{item.date}</span>
                <span className="w-2 h-2 rounded-full bg-[#910aff] opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-medium group-hover:text-[#910aff] transition-colors">{item.title[language]}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.description[language]}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                {item.tags.map(tag => <span key={tag} className="text-xs px-2 py-1 rounded-full bg-black/20 text-gray-400 font-mono">{tag}</span>)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VeilleSection
