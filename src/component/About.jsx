import { useLanguage } from '@/context/useLanguage'

function About() {
  const { language } = useLanguage()

  const content = {
    en: "I’m a Data Scientist apprentice at Caisse d’Épargne CEAPC, passionate about software development and AI. At Ifit brings these interests together through sports data.",
    fr: "Data Scientist en apprentissage à la Caisse d’Épargne CEAPC, je suis passionné de développement et d’IA. At Ifit réunit ces centres d’intérêt autour des données sportives."
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

