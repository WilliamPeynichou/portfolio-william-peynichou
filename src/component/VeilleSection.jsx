import { useLanguage } from '@/context/LanguageContext'

function NewsCard({ date, title, description, tags, link }) {
  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-4 p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#910aff]/50 transition-all duration-300"
    >
      <div className="flex justify-between items-center">
        <span className="text-xs font-mono text-gray-500">{date}</span>
        <span className="w-2 h-2 rounded-full bg-[#910aff] opacity-50 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-medium group-hover:text-[#910aff] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto pt-4">
        {tags.map((tag, i) => (
          <span key={i} className="text-xs px-2 py-1 rounded-full bg-black/20 text-gray-400 font-mono">
            {tag}
          </span>
        ))}
      </div>
    </a>
  )
}

function VeilleSection() {
  const { language } = useLanguage()

  const news = [
    {
      date: "MAR 2025",
      title: language === 'fr' ? "L'essor des Agents IA Autonomes" : "The Rise of Autonomous AI Agents",
      description: language === 'fr' 
        ? "Comment les agents IA transforment l'automatisation des workflows complexes avec n8n et LangChain."
        : "How AI agents are transforming complex workflow automation with n8n and LangChain.",
      tags: ["AI", "Automation", "n8n"],
      link: "#"
    },
    {
      date: "FEB 2025",
      title: language === 'fr' ? "RAG : Au-delà de la recherche vectorielle" : "RAG: Beyond Vector Search",
      description: language === 'fr'
        ? "Optimisation des contextes pour les LLMs via des techniques de RAG hybrides et reranking."
        : "Optimizing contexts for LLMs via hybrid RAG techniques and reranking.",
      tags: ["RAG", "LLM", "Vector DB"],
      link: "#"
    },
    {
      date: "JAN 2025",
      title: language === 'fr' ? "React 19 & Server Components" : "React 19 & Server Components",
      description: language === 'fr'
        ? "Analyse des nouvelles fonctionnalités de React 19 et leur impact sur l'architecture frontend."
        : "Analysis of new React 19 features and their impact on frontend architecture.",
      tags: ["React", "Architecture", "Frontend"],
      link: "#"
    }
  ]

  return (
    <section id="veille" className="py-32 px-4 md:px-12 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-6 max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight">
            {language === 'fr' ? 'Veille Tech' : 'Tech Insights'}
          </h2>
          <p className="text-xl text-gray-400 font-light leading-relaxed">
            {language === 'fr'
              ? "Exploration continue des nouvelles technologies, architectures et tendances qui façonnent le web de demain."
              : "Continuous exploration of new technologies, architectures, and trends shaping the future of the web."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <NewsCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default VeilleSection

