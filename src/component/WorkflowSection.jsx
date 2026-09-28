import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/context/useLanguage'
import { workflows } from '@/data/workflows'

function WorkflowItem({ workflow, index, setHoveredWorkflow, hoveredWorkflow }) {
  const isHovered = hoveredWorkflow === workflow.id

  return (
    <Link 
      to={`/workflow/${workflow.slug}`}
      className="group relative block border-t border-white/20 py-8 md:py-12 transition-colors hover:bg-white/5"
      onMouseEnter={() => setHoveredWorkflow(workflow.id)}
      onMouseLeave={() => setHoveredWorkflow(null)}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row justify-between md:items-baseline gap-4">
        {/* Title & Index */}
        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 w-full md:w-auto">
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-gray-500">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className={`text-3xl md:text-6xl font-light tracking-tight transition-all duration-500 ${isHovered ? 'translate-x-4 text-white' : 'text-gray-400'}`}>
              {workflow.title}
            </h3>
          </div>
          
          {/* Mobile Only: Preview & Type */}
          <div className="md:hidden w-full mt-4 space-y-2">
            <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
              <span className="uppercase tracking-widest">{workflow.type}</span>
              <span className="font-mono">{workflow.year}</span>
            </div>
          </div>
        </div>

        {/* Desktop Metadata */}
        <div className="hidden md:flex items-center gap-8 md:gap-16">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">
            {workflow.type}
          </span>
          <span className="text-sm font-mono text-gray-500">
            {workflow.year}
          </span>
        </div>
      </div>
    </Link>
  )
}

export function WorkflowSection() {
  const { language } = useLanguage()
  const [hoveredWorkflow, setHoveredWorkflow] = useState(null)

  return (
    <section className="relative bg-black text-white py-32 z-20">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mb-24">
        <h2 className="text-sm font-mono text-gray-500 mb-4 uppercase tracking-wider">
          {language === 'fr' ? 'Automatisations & IA' : 'Automation & AI'}
        </h2>
        <p className="text-2xl md:text-3xl max-w-2xl font-light leading-relaxed text-gray-300">
          {language === 'fr' 
            ? "Exploration de workflows complexes et d'agents intelligents pour optimiser les processus."
            : "Exploring complex workflows and intelligent agents to optimize processes."}
        </p>
      </div>

      {/* Workflows List */}
      <div className="w-full border-b border-white/20">
        {workflows.map((workflow, index) => (
          <WorkflowItem 
            key={workflow.id} 
            workflow={workflow} 
            index={index}
            hoveredWorkflow={hoveredWorkflow}
            setHoveredWorkflow={setHoveredWorkflow}
          />
        ))}
      </div>
    </section>
  )
}

export default WorkflowSection

