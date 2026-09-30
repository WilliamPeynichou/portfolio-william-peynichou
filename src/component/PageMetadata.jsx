import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '@/context/useLanguage'
import { projects } from '@/data/projects'
import { workflows } from '@/data/workflows'

const ORIGIN = 'https://williampeynichou.fr'

const sectionPages = {
  '/contact': { fr: ['Contact', 'Une idée de projet ? Contactez William Peynichou.'], en: ['Contact', 'Have a project in mind? Contact William Peynichou.'] },
  '/photography': { fr: ['Photographie', 'Galerie photo de William Peynichou.'], en: ['Photography', 'Photography gallery by William Peynichou.'] },
  '/veille': { fr: ['Veille & recommandations', 'Les créateurs, comptes, sites et outils que je suis sur le développement et l’IA.'], en: ['Insights & recommendations', 'The creators, accounts, sites and tools I follow on development and AI.'] },
  '/archives': { fr: ['Archives', 'Tous les projets de développement de William Peynichou.'], en: ['Archives', 'All development projects by William Peynichou.'] },
}

function setMeta(selector, attributes, content) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value))
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

// Metadata for client-side navigation. For crawler previews on deep links,
// prerendering or server-side metadata is still required.
export default function PageMetadata() {
  const { pathname } = useLocation()
  const { language } = useLanguage()

  useEffect(() => {
    const project = projects.find(item => pathname === `/project/${item.slug}`)
    const workflow = workflows.find(item => pathname === `/workflow/${item.slug}`)
    const section = sectionPages[pathname]
    const title = project?.title || workflow?.title || section?.[language]?.[0] || 'Portfolio'
    const description = project?.description?.[language]?.split('\n')[0]
      || section?.[language]?.[1]
      || (workflow ? `${workflow.title} — ${workflow.type}.` : language === 'fr'
        ? 'William Peynichou, Data Scientist en apprentissage passionné de développement et d’IA. At Ifit : data science appliquée au sport.'
        : 'William Peynichou, a Data Scientist apprentice passionate about development and AI. At Ifit: sports data science.')
    const url = `${ORIGIN}${pathname === '/' ? '/' : pathname}`
    const fullTitle = `${title} — William Peynichou`

    document.title = fullTitle
    document.documentElement.lang = language
    setMeta('meta[name="description"]', { name: 'description' }, description)
    setMeta('meta[property="og:title"]', { property: 'og:title' }, fullTitle)
    setMeta('meta[property="og:description"]', { property: 'og:description' }, description)
    setMeta('meta[property="og:url"]', { property: 'og:url' }, url)
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, fullTitle)
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description)
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [pathname, language])

  return null
}
