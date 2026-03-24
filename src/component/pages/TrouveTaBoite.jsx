import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { projects } from '@/data/projects'
import Footer from '@/component/layout/footer'
import Header from '@/component/layout/header'

function TitleOpener({ title, titleOpacity, subtitle }) {
  const [displayText, setDisplayText] = useState(title)
  const chars = 'ABCDEFGYIJKLNOPQRSTUVWXYZ'
  const intervalRef = useRef(null)

  const scramble = () => {
    let iteration = 0
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDisplayText(title.split('').map((char, index) => {
        if (char === ' ') return ' '
        if (index < iteration) return title[index]
        return chars[Math.floor(Math.random() * chars.length)]
      }).join(''))
      if (iteration >= title.length) clearInterval(intervalRef.current)
      iteration += 1 / 3
    }, 30)
  }

  useEffect(() => {
    scramble()
    return () => clearInterval(intervalRef.current)
  }, [title])

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10" style={{ opacity: titleOpacity }}>
      <h1
        className="text-4xl md:text-8xl font-bold tracking-tighter text-white text-center leading-none cursor-default px-4"
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        onMouseEnter={scramble}
      >
        {displayText}
      </h1>
      <p className="text-xl md:text-2xl text-white/70 font-light mt-4">{subtitle}</p>
    </div>
  )
}

function TrouveTaBoite() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const [titleOpacity, setTitleOpacity] = useState(1)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const project = projects.find(p => p.slug === 'trouvetaboite')

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!project) navigate('/')
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
    return () => { window.removeEventListener('scroll', handleScroll); if (rafId) cancelAnimationFrame(rafId) }
  }, [])

  if (!project) return null

  const apis = language === 'fr'
    ? [
        {
          step: '01',
          name: 'geo.gouv.fr',
          role: 'Geocodage',
          detail: "Convertit l'adresse saisie en coordonnées GPS (latitude, longitude). Endpoint : /search/?q=&type=municipality. Gratuit, sans clé API.",
          url: 'https://geo.api.gouv.fr',
        },
        {
          step: '02',
          name: 'API Recherche Entreprises',
          role: 'Recherche par périmètre',
          detail: "Interrogée avec les coordonnées GPS + un rayon en km + un code NAF (secteur). Retourne les SIRET correspondants avec dénomination, adresse, code APE. Endpoint : /search?lat=&long=&radius=&activite_principale=.",
          url: 'https://recherche-entreprises.api.gouv.fr',
        },
        {
          step: '03',
          name: 'API Sirene (INSEE)',
          role: 'Enrichissement',
          detail: "Enrichit chaque SIRET avec les données complètes de l'établissement : dirigeants, effectifs, date de création, statut juridique. Endpoint : /siret/{siret}.",
          url: 'https://api.insee.fr/entreprises/sirene/V3.11',
        },
      ]
    : [
        {
          step: '01',
          name: 'geo.gouv.fr',
          role: 'Geocoding',
          detail: "Converts the entered address into GPS coordinates (latitude, longitude). Endpoint: /search/?q=&type=municipality. Free, no API key required.",
          url: 'https://geo.api.gouv.fr',
        },
        {
          step: '02',
          name: 'API Recherche Entreprises',
          role: 'Perimeter search',
          detail: "Queried with GPS coordinates + radius in km + NAF code (sector). Returns matching SIRETs with company name, address, APE code. Endpoint: /search?lat=&long=&radius=&activite_principale=.",
          url: 'https://recherche-entreprises.api.gouv.fr',
        },
        {
          step: '03',
          name: 'API Sirene (INSEE)',
          role: 'Enrichment',
          detail: "Enriches each SIRET with full establishment data: executives, headcount, creation date, legal status. Endpoint: /siret/{siret}.",
          url: 'https://api.insee.fr/entreprises/sirene/V3.11',
        },
      ]

  const useCases = language === 'fr'
    ? [
        { label: 'Etudiant / stagiaire', desc: "Trouve les entreprises du secteur visé dans ta ville pour candidater directement." },
        { label: 'Alternant', desc: "Identifie les PME et ETI à démarcher avant même la publication d'une offre." },
        { label: 'Freelance', desc: "Repère les clients potentiels dans un rayon défini, par secteur d'activité." },
        { label: 'Dirigeant', desc: "Localise des sous-traitants, partenaires ou fournisseurs de proximité." },
      ]
    : [
        { label: 'Student / intern', desc: "Find companies in your target sector in your city to apply directly." },
        { label: 'Apprentice', desc: "Identify SMEs and mid-caps to approach before any job listing is published." },
        { label: 'Freelancer', desc: "Spot potential clients within a defined radius, by business sector." },
        { label: 'Business owner', desc: "Locate nearby subcontractors, partners, or suppliers." },
      ]

  return (
    <div className="relative font-sans text-white bg-black">
      <Header />

      {/* Hero */}
      <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-black">
        <TitleOpener
          title="TROUVETABOITE"
          titleOpacity={titleOpacity}
          subtitle={language === 'fr' ? 'Recherche d\'entreprises — Open Data' : 'Company Finder — Open Data'}
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

            {/* Back */}
            <div className="mb-12">
              <Link to="/" className="inline-flex items-center text-sm font-mono text-gray-500 hover:text-white transition-colors">
                {language === 'fr' ? '← Retour' : '← Back'}
              </Link>
            </div>

            {/* Title + live link */}
            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-8xl font-light tracking-tight mb-4">{project.title}</h1>
                <p className="text-xl md:text-2xl text-gray-400 font-light">{project.type}</p>
              </div>
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-mono transition-all self-start md:self-auto"
              >
                <ExternalLink size={16} />
                trouvetaboite.com
              </a>
            </div>

            {/* iFrame */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                {language === 'fr' ? 'Application en direct' : 'Live application'}
              </h3>
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-gray-950" style={{ aspectRatio: '16/9' }}>
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-white/10">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-4 text-xs font-mono text-gray-500 truncate">https://trouvetaboite.com</span>
                </div>
                {!iframeLoaded && (
                  <div className="absolute inset-0 top-[42px] flex items-center justify-center bg-gray-950">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                  </div>
                )}
                <iframe
                  src="https://trouvetaboite.com"
                  title="TrouveTaBoite live preview"
                  className="w-full border-0"
                  style={{ height: 'calc(100% - 42px)' }}
                  onLoad={() => setIframeLoaded(true)}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
              <div className="md:col-span-4 space-y-8">
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                    {language === 'fr' ? 'Année' : 'Year'}
                  </h3>
                  <p className="text-lg">{project.year}</p>
                </div>
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white hover:bg-white/5 transition-all text-sm font-mono">
                      {language === 'fr' ? '↗ Voir le site' : '↗ Live site'}
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white hover:bg-white/5 transition-all text-sm font-mono">
                      ↗ GitHub
                    </a>
                  )}
                </div>
              </div>

              <div className="md:col-span-8">
                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">
                  {language === 'fr' ? 'À propos' : 'About'}
                </h3>
                <p className="text-gray-300 leading-relaxed text-xl font-light whitespace-pre-line">
                  {project.description?.[language] || project.description?.['en']}
                </p>
              </div>
            </div>

            {/* Traction */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8">
                {language === 'fr' ? 'Impact' : 'Traction'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {/* Badge 1000 users */}
                <div className="flex flex-col justify-between p-8 rounded-2xl border border-white/10 bg-white/5">
                  <p className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">
                    {language === 'fr' ? 'Utilisateurs / mois' : 'Users / month'}
                  </p>
                  <p className="text-6xl md:text-8xl font-light tracking-tighter text-white">1 000</p>
                  <p className="text-gray-500 text-sm font-mono mt-4">
                    {language === 'fr'
                      ? 'Sans publicité, uniquement par partage organique'
                      : 'No ads, organic sharing only'}
                  </p>
                </div>

                {/* Use cases */}
                <div className="flex flex-col gap-3">
                  {useCases.map((uc, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
                      <span className="text-xs font-mono text-gray-600 mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <p className="text-sm font-semibold text-white">{uc.label}</p>
                        <p className="text-xs font-mono text-gray-500 leading-relaxed mt-1">{uc.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contexte légal */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
                  {language === 'fr' ? 'Données légales & open data' : 'Legal & open data'}
                </p>
                <p className="text-gray-300 text-base font-light leading-relaxed">
                  {language === 'fr'
                    ? "Avant d'écrire la moindre ligne de code, la question juridique a été posée : a-t-on le droit d'utiliser des données d'entreprises ? La réponse est dans la question — le gouvernement rend lui-même ces données publiques via des APIs officielles, gratuites et maintenues. Données légales, fiables, open data. Problème résolu."
                    : "Before writing a single line of code, the legal question was addressed: are we allowed to use company data? The answer was in the question — the government itself makes this data public through official, free, and maintained APIs. Legal, reliable, open data. Problem solved."}
                </p>
              </div>
            </div>

            {/* APIs gouvernementales */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-2">
                {language === 'fr' ? 'Architecture technique — APIs gouvernementales' : 'Technical architecture — Government APIs'}
              </h3>
              <p className="text-gray-600 font-mono text-xs mb-10">
                {language === 'fr' ? '3 APIs publiques · aucune clé payante · données officielles' : '3 public APIs · no paid keys · official data'}
              </p>

              {/* Flux */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                {apis.map((api, i) => (
                  <div key={i} className="relative flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-white/5">
                    <span className="text-xs font-mono text-gray-600">{api.step}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{api.name}</p>
                      <p className="text-xs font-mono text-gray-500 mt-0.5">{api.role}</p>
                    </div>
                    <p className="text-xs text-gray-500 font-mono leading-relaxed">{api.detail}</p>
                    {i < apis.length - 1 && (
                      <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-white/30">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Exemple de requete */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 font-mono text-sm">
                <p className="text-gray-500 mb-4 text-xs uppercase tracking-widest">
                  {language === 'fr' ? 'Flux de donnees — exemple' : 'Data flow — example'}
                </p>
                <div className="space-y-3">
                  {[
                    { step: '1', label: language === 'fr' ? 'Saisie utilisateur' : 'User input', value: '"Paris 11e" · rayon 5km · secteur Informatique' },
                    { step: '2', label: 'geo.gouv.fr', value: '→ lat: 48.8603, lon: 2.3788' },
                    { step: '3', label: 'recherche-entreprises.api.gouv.fr', value: '→ ?lat=48.86&long=2.37&radius=5&activite_principale=62' },
                    { step: '4', label: 'api.insee.fr / sirene', value: '→ /siret/12345678901234 — denomination, effectif, dirigeant' },
                  ].map(({ step, label, value }) => (
                    <div key={step} className="flex items-start gap-3 flex-wrap">
                      <span className="text-gray-600 shrink-0">{step}.</span>
                      <span className="text-violet-400 shrink-0">{label}</span>
                      <span className="text-green-400/70">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Deploiement */}
            <div className="mb-24">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8">
                {language === 'fr' ? 'Deploiement' : 'Deployment'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    step: '01',
                    label: 'GitHub',
                    sub: language === 'fr'
                      ? 'Code versionné sur FindYourCompany. CI/CD déclenché automatiquement sur push main.'
                      : 'Code versioned on FindYourCompany. CI/CD auto-triggered on main push.',
                  },
                  {
                    step: '02',
                    label: 'Vercel',
                    sub: language === 'fr'
                      ? 'Frontend React + backend Express déployés sur Vercel. Domaine custom trouvetaboite.com configuré via DNS. HTTPS inclus.'
                      : 'React frontend + Express backend deployed on Vercel. Custom domain trouvetaboite.com via DNS. HTTPS included.',
                  },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-white/5">
                    <span className="text-xs font-mono text-gray-600">{s.step}</span>
                    <p className="text-sm font-semibold text-white">{s.label}</p>
                    <p className="text-xs text-gray-500 font-mono leading-relaxed">{s.sub}</p>
                  </div>
                ))}
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
