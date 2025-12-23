import { useLanguage } from '@/context/LanguageContext'

function StackCard({ title, items }) {
  return (
    <div className="flex flex-col gap-6 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-500">
      <h3 className="text-xl font-mono text-gray-400 uppercase tracking-widest border-b border-white/10 pb-4">
        {title}
      </h3>
      <div className="flex flex-wrap gap-3">
        {items.map((item, index) => (
          <span 
            key={index} 
            className="px-4 py-2 rounded-full border border-white/20 bg-black/20 text-gray-300 text-sm hover:border-[#910aff] hover:text-white transition-colors cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function Stacks() {
  const { language } = useLanguage()

  const stacks = {
    frontend: ["React", "Three.js", "Tailwind CSS", "Animate UI", "Figma", "Illustrator", "Lightroom", "Framer Motion"],
    backend: ["Node.js", "Express", "Symfony", "PHP", "JavaScript", "MySQL", "RAG", "Chatbot", "API Rest"],
    tools: ["Git", "GitHub", "Docker", "n8n", "Figma", "Cursor", "Postman", "Insomnia",],
    learning: ["Rust", "TypeScript", "AI Agents"]
  }

  return (
    <section className="py-32 px-4 md:px-12 bg-black text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#910aff] rounded-full mix-blend-screen filter blur-[150px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        <div className="flex flex-col gap-6 max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight">
            {language === 'fr' ? 'Technologies & Outils' : 'Technologies & Tools'}
          </h2>
          <p className="text-xl text-gray-400 font-light leading-relaxed">
            {language === 'fr' 
              ? "Une sélection des outils et technologies que j'utilise pour créer des expériences numériques performantes et évolutives."
              : "A selection of tools and technologies I use to create performant and scalable digital experiences."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StackCard 
            title={language === 'fr' ? 'Frontend & Creative' : 'Frontend & Creative'} 
            items={stacks.frontend} 
          />
          <StackCard 
            title={language === 'fr' ? 'Backend & Data' : 'Backend & Data'} 
            items={stacks.backend} 
          />
          <StackCard 
            title={language === 'fr' ? 'Outils & DevOps' : 'Tools & DevOps'} 
            items={stacks.tools} 
          />
          <StackCard 
            title={language === 'fr' ? 'En Apprentissage' : 'Currently Learning'} 
            items={stacks.learning} 
          />
        </div>
      </div>
    </section>
  )
}

export default Stacks

