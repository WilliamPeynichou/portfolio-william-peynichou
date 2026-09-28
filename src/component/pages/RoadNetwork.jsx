import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '@/context/useLanguage'
import { projects } from '@/data/projects'
import Footer from '@/component/layout/footer'
import Header from '@/component/layout/header'
import ImageModal from '@/component/ImageModal'
import RoadNetworkAnimation from '@/assets/RoadNetwork-animation.mp4'

const SCRAMBLE_CHARS = 'ABCDEFGYIJKLNOPQRSTUVWXYZ'

function TitleOpener({ title, titleOpacity, subtitle }) {
  const [displayText, setDisplayText] = useState(title)
  const intervalRef = useRef(null)

  const scramble = useCallback(() => {
    let iteration = 0
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDisplayText(title.split('').map((char, index) => {
        if (char === ' ') return ' '
        if (index < iteration) return title[index]
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      }).join(''))
      if (iteration >= title.length) clearInterval(intervalRef.current)
      iteration += 1 / 3
    }, 30)
  }, [title])

  useEffect(() => {
    scramble()
    return () => clearInterval(intervalRef.current)
  }, [scramble])

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10" style={{ opacity: titleOpacity }}>
      <h1
        className="text-4xl md:text-8xl font-bold tracking-tighter text-white text-center leading-none cursor-default px-4"
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        onMouseEnter={scramble}
      >
        {displayText}
      </h1>
      <p className="text-xl md:text-2xl text-white/70 font-light mt-4 text-center px-4">{subtitle}</p>
    </div>
  )
}

function RoadNetwork() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [titleOpacity, setTitleOpacity] = useState(1)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)
  const fr = language === 'fr'

  const project = projects.find(p => p.slug === 'road-network')

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!project) navigate('/')
  }, [project, navigate])

  useEffect(() => {
    let rafId = null
    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const progress = Math.min(window.scrollY / window.innerHeight, 1)
        setScrollProgress(progress)
        setTitleOpacity(Math.max(0, 1 - progress * 2))
        rafId = null
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => { window.removeEventListener('scroll', handleScroll); if (rafId) cancelAnimationFrame(rafId) }
  }, [])

  if (!project) return null

  const num = (n) => n.toLocaleString(fr ? 'fr-FR' : 'en-US', { minimumFractionDigits: 1 })
  const results = [
    { mode: fr ? 'Hasard' : 'Random', collisions: 86.2, trip: 12.2, arrivals: 41.0 },
    { mode: fr ? 'Règle' : 'Rule', collisions: 35.4, trip: 10.1, arrivals: 50.8 },
    { mode: fr ? 'Apprise (Q-learning)' : 'Learned (Q-learning)', collisions: 9.8, trip: 9.1, arrivals: 57.0, best: true },
  ]

  const learning = fr
    ? [
        { k: 'État', v: "Pour chaque sortie : absente, libre, occupée plus loin ou dangereuse ; vitesse relative ; véhicule qui suit de près — 256 états." },
        { k: 'Action', v: 'Une direction × une allure (lente, normale, rapide) — 9 actions au plus.' },
        { k: 'Récompense', v: '−10 par collision, +1 à l’arrivée, −0,1 par seconde de route.' },
        { k: 'Table Q', v: 'q ← q + 0,1 × (r + 0,9 × max q′ − q), partagée par tous les véhicules et sauvegardée en JSON.' },
      ]
    : [
        { k: 'State', v: 'For each exit: missing, free, busy further, or dangerous; relative speed; tailgating vehicle — 256 states.' },
        { k: 'Action', v: 'One direction × one pace (slow, normal, fast) — at most 9 actions.' },
        { k: 'Reward', v: '−10 per collision, +1 on arrival, −0.1 per second on the road.' },
        { k: 'Q-table', v: 'q ← q + 0.1 × (r + 0.9 × max q′ − q), shared by every vehicle and saved as JSON.' },
      ]

  return (
    <div className="relative font-sans text-white bg-black">
      <Header />

      <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-black">
        <TitleOpener
          title="ROADNETWORK"
          titleOpacity={titleOpacity}
          subtitle={fr ? 'Machine learning · Q-learning appliqué à la circulation' : 'Machine learning · Q-learning for traffic'}
        />
        {scrollProgress < 0.5 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        )}
      </div>

      <div className="relative z-10 mt-[100vh]">
        <div className="min-h-screen rounded-t-[3rem] bg-black pt-20 pb-20">
          <div className="max-w-7xl mx-auto px-4 md:px-12">

            <div className="mb-12">
              <Link to="/" className="inline-flex items-center text-sm font-mono text-gray-500 hover:text-white transition-colors">
                {fr ? '← Retour' : '← Back'}
              </Link>
            </div>

            <div className="mb-16">
              <h1 className="text-4xl md:text-8xl font-light tracking-tight mb-4">{project.title}</h1>
              <p className="text-xl md:text-2xl text-gray-400 font-light">{project.type}</p>
            </div>

            {/* Animation */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                {fr ? 'Simulation Matplotlib' : 'Matplotlib simulation'}
              </h3>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-white md:w-3/4 mx-auto">
                <video src={RoadNetworkAnimation} className="w-full h-auto block" autoPlay muted loop playsInline preload="metadata" />
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
              <div className="md:col-span-4 space-y-8">
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">{fr ? 'Année' : 'Year'}</h3>
                  <p className="text-lg">{project.year}</p>
                </div>
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">{fr ? 'Contexte' : 'Context'}</h3>
                  <p className="text-lg">{fr ? "Bootcamp Python B3 — Sup de Vinci, projet d'équipe" : 'Python B3 Bootcamp — Sup de Vinci, team project'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-sm">{tech}</span>
                    ))}
                  </div>
                </div>
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white hover:bg-white/5 transition-all text-sm font-mono w-fit">
                  ↗ GitHub
                </a>
              </div>
              <div className="md:col-span-8">
                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">{fr ? 'À propos' : 'About'}</h3>
                <p className="text-gray-300 leading-relaxed text-xl font-light whitespace-pre-line">
                  {project.description[language] || project.description.en}
                </p>
              </div>
            </div>

            {/* Q-learning */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                {fr ? 'Apprentissage par renforcement' : 'Reinforcement learning'}
              </h3>
              <p className="text-gray-600 font-mono text-xs mb-10">
                {fr ? 'Q-learning écrit à la main · ~170 lignes · aucune librairie ML · entraînement 3000 épisodes en ~30 s'
                  : 'Hand-written Q-learning · ~170 lines · no ML library · 3000-episode training in ~30 s'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {learning.map(item => (
                  <div key={item.k} className="flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-white/5">
                    <p className="text-sm font-semibold text-white">{item.k}</p>
                    <p className="text-xs text-gray-500 font-mono leading-relaxed">{item.v}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 overflow-x-auto">
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">
                  {fr ? 'Résultats — 20 réseaux jamais vus, 10 véhicules, 60 s' : 'Results — 20 unseen networks, 10 vehicles, 60 s'}
                </p>
                <table className="w-full text-sm font-mono">
                  <thead>
                    <tr className="text-gray-500 text-left">
                      <th className="py-2 pr-4 font-normal">{fr ? 'Conduite' : 'Driving'}</th>
                      <th className="py-2 pr-4 font-normal">{fr ? 'Collisions / min' : 'Collisions / min'}</th>
                      <th className="py-2 pr-4 font-normal">{fr ? 'Trajet moyen (s)' : 'Avg trip (s)'}</th>
                      <th className="py-2 font-normal">{fr ? 'Arrivées / min' : 'Arrivals / min'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map(r => (
                      <tr key={r.mode} className={`border-t border-white/10 ${r.best ? 'text-green-400' : 'text-gray-300'}`}>
                        <td className="py-3 pr-4">{r.mode}</td>
                        <td className="py-3 pr-4">{num(r.collisions)}</td>
                        <td className="py-3 pr-4">{num(r.trip)}</td>
                        <td className="py-3">{num(r.arrivals)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Gallery */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8">{fr ? 'Visuels' : 'Visuals'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.gallery.map((img, i) => (
                  <button key={i} type="button" onClick={() => setSelectedImage(img)}
                    className="rounded-xl overflow-hidden border border-white/10 bg-white hover:border-white/40 transition-colors cursor-zoom-in">
                    <img src={img} alt={`RoadNetwork ${i + 1}`} loading="lazy" className="w-full h-auto" />
                  </button>
                ))}
              </div>
            </div>

            {/* QA */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8">{fr ? 'Qualité' : 'Quality'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'pytest — 137 tests', sub: fr ? 'Une règle du projet = un test : routes, collisions, conduites, Q-learning, reproductibilité.' : 'One project rule = one test: roads, collisions, driving modes, Q-learning, reproducibility.' },
                  { label: 'ruff', sub: fr ? 'Style, imports, nommage et bugs courants.' : 'Style, imports, naming and common bugs.' },
                  { label: 'check.py', sub: fr ? 'Balayage de 120 réseaux (4 tailles × 30 seeds), les 3 conduites roulent 20 s sur chacun.' : 'Sweep over 120 networks (4 sizes × 30 seeds), the 3 driving modes run 20 s on each.' },
                ].map(q => (
                  <div key={q.label} className="flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-white/5">
                    <p className="text-sm font-semibold text-white font-mono">{q.label}</p>
                    <p className="text-xs text-gray-500 font-mono leading-relaxed">{q.sub}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
          <Footer />
        </div>
      </div>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage}
        altText="RoadNetwork"
      />
    </div>
  )
}

export default RoadNetwork
