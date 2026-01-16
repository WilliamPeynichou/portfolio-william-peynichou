import { useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import Header from '../layout/header'
import Footer from '../layout/footer'

function Archives() {
  const { language } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const projects = [
    { year: "2025", name: "Ecocycle", type: "E-commerce", tech: "React, n8n", link: "#" },
    { year: "2025", name: "At Ifit", type: "Data App", tech: "RAG, Chatbot", link: "#" },
    { year: "2024", name: "Portfolio v1", type: "Website", tech: "Three.js", link: "#" },
    { year: "2023", name: "Task Master", type: "Productivity", tech: "Vue.js", link: "#" },
    { year: "2023", name: "Crypto Dash", type: "Dashboard", tech: "React, D3", link: "#" },
    { year: "2022", name: "Social Bot", type: "Automation", tech: "Python", link: "#" },
  ]

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      
      <main className="pt-32 px-4 md:px-12 max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4 mb-12">
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter">
            {language === 'fr' ? 'Archives' : 'Archives'}
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl">
            {language === 'fr' 
              ? "Historique complet de mes projets de développement et expérimentations."
              : "Complete history of my development projects and experiments."}
          </p>
        </div>

        {/* Table / List */}
        <div className="w-full border-t border-white/20">
          <div className="grid grid-cols-12 py-4 border-b border-white/20 text-sm font-mono text-gray-500 uppercase tracking-widest">
            <div className="col-span-2">Year</div>
            <div className="col-span-4 md:col-span-3">Project</div>
            <div className="col-span-3 hidden md:block">Type</div>
            <div className="col-span-3 hidden md:block">Tech</div>
            <div className="col-span-3 md:col-span-1 text-right">Link</div>
          </div>
          
          {projects.map((project, index) => (
            <div key={index} className="grid grid-cols-12 py-6 border-b border-white/10 hover:bg-white/5 transition-colors items-center group">
              <div className="col-span-2 font-mono text-gray-400">{project.year}</div>
              <div className="col-span-4 md:col-span-3 font-medium text-xl group-hover:text-[#910aff] transition-colors">{project.name}</div>
              <div className="col-span-3 hidden md:block text-gray-400">{project.type}</div>
              <div className="col-span-3 hidden md:block text-sm font-mono text-gray-500">
                <span className="bg-white/10 px-2 py-1 rounded-full">{project.tech}</span>
              </div>
              <div className="col-span-6 md:col-span-1 text-right">
                <a href={project.link} className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all">
                  ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Archives
