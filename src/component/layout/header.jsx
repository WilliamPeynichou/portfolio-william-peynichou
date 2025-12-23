import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'

function Header() {
  const { language, toggleLanguage, t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-white px-8 py-6 flex justify-between items-center pointer-events-none">
      <Link to="/" className="text-xl font-bold tracking-tight pointer-events-auto cursor-pointer">
        William
      </Link>
      
      <div className="flex items-center gap-4 text-sm font-medium">
        <button 
          onClick={toggleLanguage}
          className="pointer-events-auto cursor-pointer px-3 py-1 rounded-full border border-white/50 hover:border-white hover:bg-white/10 transition-all duration-300 font-mono text-xs"
        >
          {language.toUpperCase()}
        </button>
      </div>

      <div className="flex items-center gap-4 pointer-events-auto">
        <a 
          href="#about"
          onClick={(e) => {
            e.preventDefault()
            const aboutSection = document.getElementById('about')
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' })
            } else {
              window.location.href = '/#about'
            }
          }}
          className="px-4 py-2 text-sm uppercase tracking-wide hover:text-gray-300 transition-colors cursor-pointer"
        >
          {language === 'fr' ? 'À propos' : 'About'}
        </a>
        <Link 
          to="/contact"
          className="px-6 py-2 rounded-full border border-white hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer text-sm uppercase tracking-wide"
        >
          {t('header.contact')}
        </Link>
      </div>
    </header>
  )
}

export default Header