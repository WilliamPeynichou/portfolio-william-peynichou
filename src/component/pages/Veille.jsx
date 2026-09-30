import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/context/useLanguage'
import { veilleCategories, categoryLabel } from '@/data/veille'
import Header from '../layout/header'
import Footer from '../layout/footer'

function Veille() {
  const { language } = useLanguage()
  const fr = language === 'fr'
  const total = veilleCategories.reduce((sum, c) => sum + c.items.length, 0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />

      <main className="pt-32 px-4 md:px-12 max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-6">
          <Link to="/" className="inline-flex items-center text-sm font-mono text-gray-500 hover:text-white transition-colors w-fit">
            {fr ? '← Retour' : '← Back'}
          </Link>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter">
            {fr ? 'Veille & recommandations' : 'Insights & recommendations'}
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
            {fr
              ? 'Les créateurs, comptes, sites et outils que je suis pour rester à jour sur le développement et l’IA, avec mon avis en une ligne.'
              : 'The creators, accounts, sites and tools I follow to stay up to date on development and AI, with my take in one line.'}
          </p>
          <p className="text-sm font-mono text-gray-500">
            {total} {fr ? 'références' : 'references'} · {veilleCategories.length} {fr ? 'plateformes' : 'platforms'}
          </p>

          <nav className="flex flex-wrap gap-2 pt-2" aria-label={fr ? 'Plateformes' : 'Platforms'}>
            {veilleCategories.map(category => (
              <button
                key={category.id}
                type="button"
                onClick={() => scrollTo(category.id)}
                className="px-4 py-2 rounded-full border border-white/20 text-sm hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                {categoryLabel(category, language)}
                <span className="ml-2 font-mono text-xs opacity-60">{category.items.length}</span>
              </button>
            ))}
          </nav>
        </div>

        {veilleCategories.map(category => (
          <section key={category.id} id={category.id} className="scroll-mt-28">
            <div className="flex items-baseline justify-between border-b border-white/20 pb-4 mb-8">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight">{categoryLabel(category, language)}</h2>
              <span className="text-sm font-mono text-gray-500">{String(category.items.length).padStart(2, '0')}</span>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map(item => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col gap-4 p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#910aff]/50 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="text-xl font-medium group-hover:text-[#910aff] transition-colors">{item.name}</h3>
                        <p className="text-xs font-mono text-gray-500 mt-1 truncate">{item.handle}</p>
                      </div>
                      <ArrowUpRight size={18} className="shrink-0 text-gray-500 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.note[language]}</p>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>

      <div className="mt-32">
        <Footer />
      </div>
    </div>
  )
}

export default Veille
