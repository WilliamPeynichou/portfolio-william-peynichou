import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'
import { projects } from '@/data/projects'

function ProjectItem({ project, index, setHoveredProject, hoveredProject }) {
  const isHovered = hoveredProject === project.id

  return (
    <Link 
      to={`/project/${project.slug}`}
      className="group relative block border-t border-white/20 py-8 md:py-12 transition-colors hover:bg-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row justify-between md:items-baseline gap-4">
        {/* Title & Index */}
        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 w-full md:w-auto">
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-gray-500">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className={`text-3xl md:text-6xl font-light tracking-tight transition-all duration-500 ${isHovered ? 'translate-x-4 text-white' : 'text-gray-400'}`}>
              {project.title}
            </h3>
          </div>
          
          {/* Mobile Only: Image Preview & Type (HIDDEN per user request) */}
          <div className="hidden w-full mt-4 space-y-2">
            <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-900">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
              <span className="uppercase tracking-widest">{project.type}</span>
              <span className="font-mono">{project.year}</span>
            </div>
          </div>
        </div>

        {/* Desktop Metadata */}
        <div className="hidden md:flex items-center gap-8 md:gap-16">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">
            {project.type}
          </span>
          <span className="text-sm font-mono text-gray-500">
            {project.year}
          </span>
        </div>
      </div>
    </Link>
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

  // Trouver l'image active
  const activeImage = projects.find(p => p.id === hoveredProject)?.image

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black text-white py-32 z-20">
      
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
