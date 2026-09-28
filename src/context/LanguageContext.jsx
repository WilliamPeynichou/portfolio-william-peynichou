import { useState } from 'react'
import { LanguageContext } from './language-context'

const translations = {
  en: {
    header: {
      contact: 'Contact',
      copyright: '®2025'
    },
    opener: {
      name: 'William Peynichou'
    },
    about: {
      title: 'About',
      content: 'Data Scientist apprentice at Caisse d’Épargne CEAPC, passionate about software development and AI.'
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
      role: 'Data Scientist apprentice at Caisse d’Épargne CEAPC',
      experience: 'Experience',
      months: 'months',
      developer: 'Full stack developer'
    }
  },
  fr: {
    header: {
      contact: 'Contact',
      copyright: '®2025'
    },
    opener: {
      name: 'William Peynichou'
    },
    about: {
      title: 'À propos',
      content: 'Data Scientist en apprentissage à la Caisse d’Épargne CEAPC, passionné de développement et d’intelligence artificielle.'
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
      role: 'Data Scientist en apprentissage à la Caisse d’Épargne CEAPC',
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

