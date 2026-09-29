import { useLanguage } from '@/context/useLanguage'

const content = {
  fr: {
    title: 'Expériences',
    educationTitle: 'Formation',
    experiences: [
      {
        role: 'Data Scientist',
        company: 'Caisse d’Épargne',
        detail: 'Apprentissage',
      },
      {
        role: 'Développeur Full Stack',
        company: 'L’Atelier',
        detail: 'Lead Dev sur l’appel à projets MarsAI, remporté',
      },
    ],
    education: [
      { school: 'Sup de Vinci', degree: 'Master Big Data & IA' },
    ],
  },
  en: {
    title: 'Experience',
    educationTitle: 'Education',
    experiences: [
      {
        role: 'Data Scientist',
        company: 'Caisse d’Épargne',
        detail: 'Apprenticeship',
      },
      {
        role: 'Full Stack Developer',
        company: 'L’Atelier',
        detail: 'Lead Dev on the MarsAI call for projects, which was won',
      },
    ],
    education: [
      { school: 'Sup de Vinci', degree: 'Master’s in Big Data & AI' },
    ],
  },
}

function Row({ title, subtitle, detail }) {
  return (
    <div className="border-t border-white/20 py-8 md:py-10 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
      <div>
        <h3 className="text-2xl md:text-4xl font-light tracking-tight">{title}</h3>
        <p className="text-lg text-gray-400 font-light mt-1">{subtitle}</p>
      </div>
      {detail && <p className="text-sm font-mono text-gray-500 md:text-right max-w-md">{detail}</p>}
    </div>
  )
}

function ExperienceSection() {
  const { language } = useLanguage()
  const t = content[language]

  return (
    <section id="experience" className="py-32 px-4 md:px-12 bg-black text-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        <div>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-12">{t.title}</h2>
          <div className="border-b border-white/20">
            {t.experiences.map(item => (
              <Row key={item.company} title={item.role} subtitle={item.company} detail={item.detail} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-12">{t.educationTitle}</h2>
          <div className="border-b border-white/20">
            {t.education.map(item => (
              <Row key={item.school} title={item.degree} subtitle={item.school} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
