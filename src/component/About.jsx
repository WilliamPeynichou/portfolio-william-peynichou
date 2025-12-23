import { useLanguage } from '@/context/LanguageContext'

function About() {
  const { language } = useLanguage()

  const content = {
    en: "A developer based in Marseille with an infinite love for clean code, specialized in Full Stack Development and Modern Web Applications.",
    fr: "Un développeur basé à Marseille avec un amour infini pour le code propre, spécialisé en Développement Full Stack et Applications Web Modernes."
  }

  return (
    <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight">
        {content[language]}
      </h2>
    </section>
  )
}

export default About

