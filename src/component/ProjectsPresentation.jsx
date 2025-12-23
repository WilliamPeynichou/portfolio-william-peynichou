import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'

function ProjectItem({ project, index, setHoveredProject, hoveredProject }) {
  const isHovered = hoveredProject === project.id

  return (
    <div 
      className="group relative border-t border-white/20 py-12 transition-colors hover:bg-white/5 cursor-pointer"
      onMouseEnter={() => setHoveredProject(project.id)}
      onMouseLeave={() => setHoveredProject(null)}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row justify-between items-baseline gap-4">
        {/* Title & Index */}
        <div className="flex items-baseline gap-8">
          <span className="text-sm font-mono text-gray-500">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className={`text-4xl md:text-6xl font-light tracking-tight transition-all duration-500 ${isHovered ? 'translate-x-4 text-white' : 'text-gray-400'}`}>
            {project.title}
          </h3>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-8 md:gap-16">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-widest hidden md:block">
            {project.type}
          </span>
          <span className="text-sm font-mono text-gray-500">
            {project.year}
          </span>
        </div>
      </div>
    </div>
  )
}

export function ProjectsPresentation() {
  const { language } = useLanguage()
  const [hoveredProject, setHoveredProject] = useState(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef(null)

  // Suivre la souris pour l'image flottante
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const projects = [
    {
      id: 1,
      title: "At Itif",
      type: "Sport Data with RAG on chat bot",
      year: "2025",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Ecocycle",
      type: "E-commerce with chat bot and RAG with n8n",
      year: "2025",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Youtube Design",
      type: "Video website with Artistic Direction",
      year: "2025",
      image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2500&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Portfolio",
      type: "Portfolio website with React and Tailwind CSS/Animate UI",
      year: "2025",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2574&auto=format&fit=crop"
    }
  ]

  // Trouver l'image active
  const activeImage = projects.find(p => p.id === hoveredProject)?.image

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black text-white py-32 z-20">
      {/* Floating Image Reveal */}
      <div 
        className="pointer-events-none fixed z-30 hidden md:block w-[400px] h-[500px] rounded-lg overflow-hidden transition-opacity duration-500 ease-out"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: 'translate(-50%, -50%)',
          opacity: hoveredProject ? 1 : 0
        }}
      >
        {projects.map((project) => (
          <img
            key={project.id}
            src={project.image}
            alt={project.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mb-24">
        <h2 className="text-sm font-mono text-gray-500 mb-4 uppercase tracking-wider">
          {language === 'fr' ? 'Projets Sélectionnés' : 'Selected Works'}
        </h2>
        <p className="text-2xl md:text-3xl max-w-2xl font-light leading-relaxed text-gray-300">
          {language === 'fr' 
            ? "Une sélection de projets récents alliant design, performance et expérience utilisateur."
            : "A selection of recent projects combining design, performance, and user experience."}
        </p>
      </div>

      {/* Projects List */}
      <div className="w-full border-b border-white/20">
        {projects.map((project, index) => (
          <ProjectItem 
            key={project.id} 
            project={project} 
            index={index}
            hoveredProject={hoveredProject}
            setHoveredProject={setHoveredProject}
          />
        ))}
      </div>
    </section>
  )
}

export default ProjectsPresentation
