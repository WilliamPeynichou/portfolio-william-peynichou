import { Link } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'

// Import des images pour la prévisualisation
import { BiarritzPlage, Camel, Lewis, SurfBlur } from '@/assets/galery'

export function PhotographySection() {
  const { language } = useLanguage()
  
  const previewImages = [BiarritzPlage, Camel, Lewis, SurfBlur]

  return (
    <section className="py-32 px-4 md:px-12 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="flex flex-col gap-6 max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight">
            {language === 'fr' ? 'Photographie' : 'Photography'}
          </h2>
          <p className="text-xl text-gray-400 font-light leading-relaxed">
            {language === 'fr' 
              ? "Au-delà du code, j'explore le monde à travers la photographie. Découvrez ma perspective unique sur l'architecture, les paysages et la vie urbaine."
              : "Beyond code, I explore the world through photography. Discover my unique perspective on architecture, landscapes, and urban life."}
          </p>
        </div>
        
        <Link 
          to="/photography"
          className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white transition duration-300 ease-out border border-white rounded-full hover:bg-white hover:text-black"
        >
          <span className="mr-2">{language === 'fr' ? 'Voir la Galerie' : 'View Gallery'}</span>
          <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* Preview Strip */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-60 hover:opacity-100 transition-opacity duration-500">
        {previewImages.map((img, i) => (
          <div key={i} className="aspect-square bg-gray-900 rounded-lg overflow-hidden">
             <img 
               src={img}
               alt={`Preview ${i + 1}`}
               className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
             />
          </div>
        ))}
      </div>
    </section>
  )
}

export function ArchivesSection() {
  const { language } = useLanguage()

  return (
    <section className="py-32 px-4 md:px-12 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-8">
        <h2 className="text-4xl md:text-6xl font-light tracking-tight">
          {language === 'fr' ? 'Archives de Développement' : 'Development Archives'}
        </h2>
        <p className="text-xl text-gray-400 font-light max-w-2xl">
          {language === 'fr'
            ? "Une collection complète de tous mes projets, expériences et contributions open source au fil des années."
            : "A comprehensive collection of all my projects, experiments, and open source contributions over the years."}
        </p>
        
        <Link 
          to="/archives"
          className="mt-8 text-lg border-b border-white pb-1 hover:text-[#910aff] hover:border-[#910aff] transition-colors font-mono"
        >
          {language === 'fr' ? 'Accéder aux Archives' : 'Access Archives'}
        </Link>
      </div>
    </section>
  )
}

