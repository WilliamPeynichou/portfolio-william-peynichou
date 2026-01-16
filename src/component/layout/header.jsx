import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'

function Header() {
  const { language, toggleLanguage, t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  
  const handleNavClick = (id) => {
    setIsMenuOpen(false)
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = `/#${id}`
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-white px-4 md:px-8 py-6 flex justify-between items-center pointer-events-none">
        <Link to="/" className="text-xl font-bold tracking-tight pointer-events-auto cursor-pointer relative z-50">
          William
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          <button 
            onClick={toggleLanguage}
            className="pointer-events-auto cursor-pointer px-3 py-1 rounded-full border border-white/50 hover:border-white hover:bg-white/10 transition-all duration-300 font-mono text-xs"
          >
            {language.toUpperCase()}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4 pointer-events-auto">
          <button onClick={() => handleNavClick('veille')} className="px-4 py-2 text-sm uppercase tracking-wide hover:text-gray-300 transition-colors cursor-pointer">
            {language === 'fr' ? 'Veille' : 'Insights'}
          </button>
          <button onClick={() => handleNavClick('about')} className="px-4 py-2 text-sm uppercase tracking-wide hover:text-gray-300 transition-colors cursor-pointer">
            {language === 'fr' ? 'À propos' : 'About'}
          </button>
          <Link 
            to="/contact"
            className="px-6 py-2 rounded-full border border-white hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer text-sm uppercase tracking-wide"
          >
            {t('header.contact')}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4 pointer-events-auto relative z-50">
          <button 
            onClick={toggleLanguage}
            className="px-3 py-1 rounded-full border border-white/50 font-mono text-xs"
          >
            {language.toUpperCase()}
          </button>
          <button onClick={toggleMenu} className="p-2">
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-40 transition-transform duration-500 ease-in-out md:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl font-light text-white">
          <button onClick={() => handleNavClick('veille')} className="hover:text-gray-400">
            {language === 'fr' ? 'Veille' : 'Insights'}
          </button>
          <button onClick={() => handleNavClick('about')} className="hover:text-gray-400">
            {language === 'fr' ? 'À propos' : 'About'}
          </button>
          
          <Link to="/photography" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-400 text-lg text-gray-300">
            {language === 'fr' ? 'Photographie' : 'Photography'}
          </Link>
          <Link to="/archives" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-400 text-lg text-gray-300">
            {language === 'fr' ? 'Archives' : 'Archives'}
          </Link>

          <Link 
            to="/contact" 
            onClick={() => setIsMenuOpen(false)} 
            className="mt-4 px-8 py-3 rounded-full border border-white hover:bg-white hover:text-black transition-colors duration-300 text-xl"
          >
            {t('header.contact')}
          </Link>
        </div>
      </div>
    </>
  )
}

export default Header