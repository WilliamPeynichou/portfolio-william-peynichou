import { useLanguage } from '@/context/LanguageContext'
import profileImage from '@/assets/profile.png'

function ProfileSection() {
  const { language } = useLanguage()

  const content = {
    fr: {
      title: "Profil",
      role: "Développeur Full Stack",
      downloadCV: "Télécharger mon CV",
      viewCV: "Voir le CV",
      about: "À propos",
      description: "Passionné par le développement web et les nouvelles technologies, je crée des expériences numériques uniques et performantes."
    },
    en: {
      title: "Profile",
      role: "Full Stack Developer",
      downloadCV: "Download CV",
      viewCV: "View CV",
      about: "About",
      description: "Passionate about web development and new technologies, I create unique and high-performance digital experiences."
    }
  }

  const t = content[language]

  return (
    <section id="about" className="py-32 px-4 md:px-12 max-w-7xl mx-auto flex flex-col gap-24 bg-black text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Photo Section */}
        <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 bg-gray-900 rounded-lg overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
          
          <img 
            src={profileImage} 
            alt="William Peynichou" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Overlay Info */}
          <div className="absolute bottom-0 left-0 w-full p-8 z-20">
            <h2 className="text-3xl font-light">William Peynichou</h2>
            <p className="text-gray-400 font-mono text-sm mt-2">{t.role}</p>
          </div>
        </div>

        {/* CV & Details Section */}
        <div className="flex flex-col gap-12 pt-8">
          <div className="flex flex-col gap-6">
            <h1 className="text-6xl md:text-7xl font-light tracking-tighter">{t.title}</h1>
            <p className="text-xl text-gray-400 font-light leading-relaxed max-w-xl">
              {t.description}
            </p>
          </div>

          {/* CV Actions */}
          <div className="flex flex-col gap-8 p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Curriculum Vitae</span>
              <span className="text-xs font-mono text-gray-500">PDF • 2025</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 px-6 py-4 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t.downloadCV}
              </button>
              
              <button className="flex-1 px-6 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {t.viewCV}
              </button>
            </div>

            {/* CV Preview Area (Placeholder) */}
            <div className="w-full aspect-[1/1.4] bg-white rounded-lg opacity-10 flex items-center justify-center border border-dashed border-gray-500">
              <span className="text-black font-mono text-sm">CV Preview Placeholder</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ProfileSection

