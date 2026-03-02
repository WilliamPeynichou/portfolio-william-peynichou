import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'
import { projects } from '@/data/projects'
import Footer from '@/component/layout/footer'
import Header from '@/component/layout/header'

function TitleOpener({ title, titleOpacity, subtitle, language }) {
  const [displayText, setDisplayText] = useState(title)
  const chars = 'ABCDEFGYIJKLNOPQRSTUVWXYZ'
  const intervalRef = useRef(null)

  const scramble = () => {
    let iteration = 0
    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setDisplayText(title.split("")
        .map((char, index) => {
          if (index < iteration) {
            return title[index]
          }
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join("")
      )

      if (iteration >= title.length) {
        clearInterval(intervalRef.current)
      }

      iteration += 1 / 3
    }, 30)
  }

  useEffect(() => {
    scramble()
    return () => clearInterval(intervalRef.current)
  }, [title])

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center z-10"
      style={{ opacity: titleOpacity }}
    >
      <h1
        className="text-4xl md:text-[10rem] font-bold tracking-tighter text-white text-center leading-none cursor-default"
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        onMouseEnter={scramble}
      >
        {displayText}
      </h1>
      <p className="text-xl md:text-2xl text-white/70 font-light mt-4">
        {subtitle}
      </p>
    </div>
  )
}

function ImageHero({ scrollProgress, titleOpacity, title, subtitle, language }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-black">
      <TitleOpener
        title={title}
        titleOpacity={titleOpacity}
        subtitle={subtitle}
        language={language}
      />

      {scrollProgress < 0.5 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-white/80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      )}
    </div>
  )
}

function TrouveTaBoite() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [titleOpacity, setTitleOpacity] = useState(1)

  const project = projects.find(p => p.slug === 'trouve-ta-boite')

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!project) {
      navigate('/')
    }
  }, [project, navigate])

  useEffect(() => {
    let rafId = null
    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const windowHeight = window.innerHeight
        const progress = Math.min(scrollY / windowHeight, 1)
        setScrollProgress(progress)
        setTitleOpacity(Math.max(0, 1 - progress * 2))
        rafId = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  if (!project) return null

  const presentationFr = `Depuis juillet 2025, je me forme au développement web.

Et très vite, j'ai remarqué quelque chose : les meilleurs recrutements — dans les deux sens — ne passent pas par des offres d'emploi. Ils passent par le contact direct. La candidature spontanée. L'approche humaine. Mais pour ça, encore faut-il savoir qui contacter.

Alors j'ai construit TrouveTaBoite.

Sauf qu'avant d'écrire la moindre ligne de code, je me suis posé une question sérieuse : est-ce que j'ai le droit d'utiliser des données d'entreprises ? Pas avocat, pas juriste. Donc j'ai cherché. Et j'ai raisonné simplement : qui écrit les lois ? Le gouvernement. Est-ce que le gouvernement rend publiques les données des entreprises ? OUI ! Des APIs officielles, gratuites, mises à disposition par des services publics français. Données légales, fiables, open data. Problème résolu.

Direction le code. Le principe du site est volontairement simple :
→ Un lieu
→ Un rayon
→ Un secteur d'activité

Et tu obtiens toutes les entreprises autour de toi, avec leurs coordonnées.

Utile pour tout le monde : un stagiaire qui cherche une entreprise à démarcher, un alternant en recherche de contrat, un patron qui a besoin d'un freelance ou auto-entrepreneur à proximité.

C'est mon premier vrai projet full-stack. C'est loin d'être parfait. Mais ça répond à un vrai besoin ! Et ça m'a appris autant sur le droit que sur le code.`

  const presentationEn = `Since July 2025, I've been training in web development.

And very quickly, I noticed something: the best recruitments — on both sides — don't come through job postings. They come through direct contact. Spontaneous applications. The human approach. But for that, you need to know who to contact.

So I built TrouveTaBoite.

But before writing a single line of code, I asked myself a serious question: am I allowed to use company data? Not a lawyer, not a legal expert. So I researched. And I reasoned simply: who writes the laws? The government. Does the government make company data public? YES! Official, free APIs, provided by French public services. Legal, reliable, open data. Problem solved.

On to the code. The principle of the site is intentionally simple:
→ A location
→ A radius
→ A business sector

And you get all the companies around you, with their contact details.

Useful for everyone: an intern looking for a company to reach out to, a work-study student searching for a contract, a business owner who needs a nearby freelancer or self-employed worker.

This is my first real full-stack project. It's far from perfect. But it meets a real need! And it taught me as much about law as about code.`

  return (
    <div className="relative font-sans text-white bg-black">
      <Header />

      <ImageHero
        scrollProgress={scrollProgress}
        titleOpacity={titleOpacity}
        title="TrouveTaBoite"
        subtitle={language === 'fr' ? 'Trouve ton entreprise' : 'Find your company'}
        language={language}
      />

      <div className="relative z-10 mt-[100vh]">
        <div className="min-h-screen rounded-t-[3rem] bg-black pt-20 pb-20">
          <div className="max-w-7xl mx-auto px-4 md:px-12">
            <div className="mb-12">
              <Link
                to="/"
                className="inline-flex items-center text-sm font-mono text-gray-500 hover:text-white transition-colors"
              >
                ← {language === 'fr' ? 'Retour' : 'Back'}
              </Link>
            </div>

            <div className="mb-16">
              <h1 className="text-4xl md:text-8xl font-light tracking-tight mb-6">
                {project.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl">
                {project.type}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">

              {/* Metadata Column */}
              <div className="md:col-span-4 space-y-8">
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                    {language === 'fr' ? 'Année' : 'Year'}
                  </h3>
                  <p className="text-lg">{project.year}</p>
                </div>

                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                    {language === 'fr' ? 'Voir le site' : 'Visit site'}
                  </h3>
                  <a
                    href="https://trouvetaboite.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white hover:underline decoration-1 underline-offset-4"
                  >
                    trouvetaboite.com →
                  </a>
                </div>
              </div>

              {/* Description Column */}
              <div className="md:col-span-8">
                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                  {language === 'fr' ? 'À propos' : 'About'}
                </h3>
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-300 leading-relaxed text-xl font-light whitespace-pre-line">
                    {language === 'fr' ? presentationFr : presentationEn}
                  </p>
                </div>
              </div>
            </div>

            {/* Iframe Section */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8">
                {language === 'fr' ? 'Démonstration en direct' : 'Live Demo'}
              </h3>
              <div className="w-full rounded-lg overflow-hidden border border-white/10 bg-gray-900">
                <iframe
                  src="https://trouvetaboite.com"
                  title="TrouveTaBoite"
                  className="w-full bg-white"
                  style={{ height: '80vh', border: 'none' }}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>

          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default TrouveTaBoite
