import { useLanguage } from '@/context/LanguageContext'
import Header from '../layout/header'
import Footer from '../layout/footer'

function Photography() {
  const { language } = useLanguage()

  const photos = [
    { id: 1, src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2670&auto=format&fit=crop", title: "Street Life", location: "Tokyo" },
    { id: 2, src: "https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=2535&auto=format&fit=crop", title: "Neon Nights", location: "Osaka" },
    { id: 3, src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop", title: "Mountain View", location: "Swiss Alps" },
    { id: 4, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop", title: "Portrait", location: "Studio" },
    { id: 5, src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2670&auto=format&fit=crop", title: "Landscape", location: "Yosemite" },
    { id: 6, src: "https://images.unsplash.com/photo-1501854140884-074cf2b2c3af?q=80&w=2550&auto=format&fit=crop", title: "Nature", location: "Amazon" },
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
            <div key={photo.id} className="relative group break-inside-avoid overflow-hidden rounded-lg">
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

      <Footer />
    </div>
  )
}

export default Photography
