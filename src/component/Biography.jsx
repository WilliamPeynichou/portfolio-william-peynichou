import { useLanguage } from '@/context/useLanguage'

function Biography() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "I'm William Peynichou, a Data Scientist apprentice passionate about software development and AI.",
      p1: "I trained in software development at L’Atelier and am pursuing a master’s in Big Data and AI at Sup de Vinci. These foundations guide my work at the intersection of data, development and AI.",
      p2: "From At Ifit, my sports data science project, to RoadNetwork, a machine learning project based on reinforcement learning, I turn these interests into concrete applications.",
      clientsTitle: "Technologies",
      servicesTitle: "Services"
    },
    fr: {
      title: "Je suis William Peynichou, Data Scientist en apprentissage, passionné de développement et d’intelligence artificielle.",
      p1: "Formé au développement à L’Atelier, je poursuis un master Big Data et IA à Sup de Vinci. Ce parcours nourrit mon travail à la croisée de la donnée, du développement et de l’intelligence artificielle.",
      p2: "D’At Ifit, mon projet de data science dans le sport, à RoadNetwork, un projet de machine learning par apprentissage par renforcement, je concrétise ces centres d’intérêt.",
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

