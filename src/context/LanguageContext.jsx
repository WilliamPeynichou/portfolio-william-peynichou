import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const translations = {
  en: {
    header: {
      contact: 'Contact',
      copyright: '®2024'
    },
    opener: {
      name: 'William Peynichou'
    },
    about: {
      title: 'About',
      content: 'Full Stack Developer passionate about creating modern and performant web applications.'
    },
    projects: {
      title: 'My Projects',
      viewProject: 'View Project'
    },
    biography: {
      title: 'Biography',
      experience: 'Experience',
      clients: 'Clients',
      services: 'Services'
    },
    footer: {
      contact: 'Contact',
      email: 'Email',
      phone: 'Phone',
      social: 'Social',
      copyright: 'All rights reserved.'
    },
    codePresentation: {
      role: 'Full Stack Developer',
      experience: 'Experience',
      months: 'months',
      developer: 'Full stack developer'
    }
  },
  fr: {
    header: {
      contact: 'Contact',
      copyright: '®2024'
    },
    opener: {
      name: 'William Peynichou'
    },
    about: {
      title: 'À propos',
      content: 'Développeur Full Stack passionné par la création d\'applications web modernes et performantes.'
    },
    projects: {
      title: 'Mes Projets',
      viewProject: 'Voir le projet'
    },
    biography: {
      title: 'Biographie',
      experience: 'Expérience',
      clients: 'Clients',
      services: 'Services'
    },
    footer: {
      contact: 'Contact',
      email: 'Email',
      phone: 'Téléphone',
      social: 'Réseaux',
      copyright: 'Tous droits réservés.'
    },
    codePresentation: {
      role: 'Développeur Full Stack',
      experience: 'Expérience',
      months: 'mois',
      developer: 'Développeur full stack'
    }
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('fr')

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en')
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

