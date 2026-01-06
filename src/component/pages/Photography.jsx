import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import Header from '../layout/header'
import Footer from '../layout/footer'
import ImageModal from '@/component/ImageModal'

// Import de toutes les images de la galerie
import { 
  AngletKid,
  Basketball,
  BiarritzPlage,
  Camel,
  Cherie,
  Door,
  KoreanGuy,
  KoreanLoves,
  Lacanau,
  Lewis,
  ManWithDog,
  MarraScoot,
  mbappeKid,
  MenInTheCity,
  MoroccoMirors,
  OysterParc,
  PlaneFlowers,
  PrahaSnowTrain,
  SnowKid,
  SurfBlur
} from '@/assets/galery'

function Photography() {
  const { language } = useLanguage()
  const [selectedImage, setSelectedImage] = useState(null)

  const photos = [
    { id: 1, src: AngletKid, title: "Anglet Kid", location: "Anglet" },
    { id: 2, src: Basketball, title: "Basketball", location: "" },
    { id: 3, src: BiarritzPlage, title: "Biarritz Plage", location: "Biarritz" },
    { id: 4, src: Camel, title: "Camel", location: "" },
    { id: 5, src: Cherie, title: "Cherie", location: "" },
    { id: 6, src: Door, title: "Door", location: "" },
    { id: 7, src: KoreanGuy, title: "Korean Guy", location: "Seoul" },
    { id: 8, src: KoreanLoves, title: "Korean Loves", location: "Seoul" },
    { id: 9, src: Lacanau, title: "Lacanau", location: "Lacanau" },
    { id: 10, src: Lewis, title: "Lewis", location: "" },
    { id: 11, src: ManWithDog, title: "Man With Dog", location: "" },
    { id: 12, src: MarraScoot, title: "Marrakech Scooter", location: "Marrakech" },
    { id: 13, src: mbappeKid, title: "Mbappé Kid", location: "" },
    { id: 14, src: MenInTheCity, title: "Men In The City", location: "" },
    { id: 15, src: MoroccoMirors, title: "Morocco Mirrors", location: "Morocco" },
    { id: 16, src: OysterParc, title: "Oyster Parc", location: "" },
    { id: 17, src: PlaneFlowers, title: "Plane Flowers", location: "" },
    { id: 18, src: PrahaSnowTrain, title: "Praha Snow Train", location: "Prague" },
    { id: 19, src: SnowKid, title: "Snow Kid", location: "" },
    { id: 20, src: SurfBlur, title: "Surf Blur", location: "" },
  ]

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      
      <main className="pt-32 px-4 md:px-12 max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4 mb-12">
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter">
            {language === 'fr' ? 'Photographie' : 'Photography'}
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl">
            {language === 'fr' 
              ? "Capturer l'instant, la lumière et l'émotion à travers mon objectif."
              : "Capturing moments, light, and emotion through my lens."}
          </p>
        </div>

        {/* Masonry Grid Simulation */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="relative group break-inside-avoid overflow-hidden rounded-lg cursor-zoom-in"
              onClick={() => setSelectedImage({ src: photo.src, alt: photo.title })}
            >
              <img 
                src={photo.src} 
                alt={photo.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-xl font-medium">{photo.title}</h3>
                <p className="text-sm text-gray-300 font-mono">{photo.location}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <ImageModal 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
        imageSrc={selectedImage?.src} 
        altText={selectedImage?.alt} 
      />

      <Footer />
    </div>
  )
}

export default Photography
