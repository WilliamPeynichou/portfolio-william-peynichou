import { useLanguage } from '@/context/LanguageContext'

function Biography() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "I'm William Peynichou, French developer based in Marseille, specialized in Full Stack Development and Modern Web Applications.",
      p1: "After spending 16 months at La Plateforme as a Full Stack Developer, I decided to continue my journey creating innovative and performant solutions.",
      p2: "Now I'm working on exciting new projects.",
      clientsTitle: "Technologies",
      servicesTitle: "Services"
    },
    fr: {
      title: "Je suis William Peynichou, développeur français basé à Marseille, spécialisé en Développement Full Stack et Applications Web Modernes.",
      p1: "Après avoir passé 16 mois à La Plateforme en tant que Développeur Full Stack, j'ai décidé de continuer mon parcours en créant des solutions innovantes et performantes.",
      p2: "Maintenant je travaille sur de nouveaux projets passionnants.",
      clientsTitle: "Technologies",
      servicesTitle: "Services"
    }
  }

  const technologies = ["React", "Next.js", "Tailwind CSS", "TypeScript", "Symfony", "MySQL", "Three.js"]
  
  const services = {
    en: ["Web Development", "UI/UX Design", "API Development", "Database Design", "Frontend", "Backend", "Full Stack", "Responsive Design", "Performance Optimization"],
    fr: ["Développement Web", "Design UI/UX", "Développement API", "Conception BDD", "Frontend", "Backend", "Full Stack", "Design Responsive", "Optimisation Performance"]
  }

  return (
    <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto border-t border-gray-200 mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Bio Text */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          <h3 className="text-3xl font-medium">{content[language].title}</h3>
          <p className="text-xl text-gray-600 leading-relaxed">
            {content[language].p1}
          </p>
          <p className="text-xl text-gray-600 leading-relaxed">
            {content[language].p2}
          </p>
        </div>

        {/* Lists */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-12">
          {/* Technologies */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm uppercase tracking-widest text-gray-500 font-medium">{content[language].clientsTitle}</h4>
            <ul className="flex flex-col gap-3">
              {technologies.map(tech => (
                <li key={tech} className="text-xl">{tech}</li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm uppercase tracking-widest text-gray-500 font-medium">{content[language].servicesTitle}</h4>
            <ul className="flex flex-col gap-3">
              {services[language].map(service => (
                <li key={service} className="text-xl">{service}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Biography

