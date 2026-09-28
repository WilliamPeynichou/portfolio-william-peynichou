import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/context/useLanguage'
import { projects } from '@/data/projects'
import Header from '../layout/header'
import Footer from '../layout/footer'

function Archives() {
  const { language } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const archive = [...projects].sort((a, b) => Number.parseInt(b.year) - Number.parseInt(a.year))

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      <main className="pt-32 px-4 md:px-12 max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4 mb-12">
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter">Archives</h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl">
            {language === 'fr' ? 'Tous mes projets présentés sur ce site.' : 'All my projects featured on this site.'}
          </p>
        </div>
        <div className="w-full border-t border-white/20">
          <div className="grid grid-cols-12 py-4 border-b border-white/20 text-sm font-mono text-gray-500 uppercase tracking-widest">
            <div className="col-span-2">{language === 'fr' ? 'Année' : 'Year'}</div>
            <div className="col-span-7 md:col-span-3">{language === 'fr' ? 'Projet' : 'Project'}</div>
            <div className="col-span-3 hidden md:block">Type</div>
            <div className="col-span-3 hidden md:block">Tech</div>
            <div className="col-span-3 md:col-span-1 text-right">Lien</div>
          </div>
          {archive.map(project => (
            <div key={project.slug} className="grid grid-cols-12 py-6 border-b border-white/10 hover:bg-white/5 transition-colors items-center group">
              <div className="col-span-2 font-mono text-gray-400">{project.year}</div>
              <div className="col-span-7 md:col-span-3 font-medium text-xl group-hover:text-[#910aff] transition-colors">{project.title}</div>
              <div className="col-span-3 hidden md:block text-gray-400">{project.type}</div>
              <div className="col-span-3 hidden md:block text-sm font-mono text-gray-500">
                <span className="bg-white/10 px-2 py-1 rounded-full">{project.technologies.slice(0, 3).join(', ')}</span>
              </div>
              <div className="col-span-3 md:col-span-1 text-right">
                <Link to={`/project/${project.slug}`} aria-label={`${language === 'fr' ? 'Voir' : 'View'} ${project.title}`}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/20 group-hover:bg-white group-hover:text-black transition-all">
                  ↗
                </Link>
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
