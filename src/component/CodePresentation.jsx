import { useState, useEffect, useRef } from 'react'
import {
  Code,
  CodeBlock,
  CodeHeader,
} from '@/components/animate-ui/components/animate/code'
import ReactIcon from '@/components/icons/react-icon'

export function CodePresentation() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const codeString = `import React from 'react';

const WilliamPeynichou = () => {
  const profile = {
    name: 'William Peynichou',
    age: 27,
    role: 'Full Stack Developer',
    skills: [
      'React', 'Node.js', Express, 'Tailwind CSS', 'Three.js', Animate UI,
      'JavaScript', 'Symfony', 'MySQL'
    ],
    projects: [
      'Portfolio', 'Website', 'Application'
    ],
    tools: [
      'Cursor', 'Figma', 'Illustrator', Lightroom,
      'n8n', 'PHPStorm', 'Git', GitHub, Postman, Insomnia,
    ]
  };

  return (
    <div className="developer-profile">
      <h1>{profile.name}</h1>
      <p className="role">{profile.role}</p>
      
      <section className="experience">
        <h2>Experience</h2>
        <article>
          <h3>La Plateforme</h3>
          <span>16 months</span>
          <p>Full stack developer</p>
        </article>
      </section>
    </div>
  );
};

export default WilliamPeynichou;`

  return (
    <section 
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center py-24 px-4 transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Code className="w-full max-w-[600px] h-[500px]">
        <CodeHeader icon={ReactIcon} copyButton>
          WilliamPeynichou.jsx
        </CodeHeader>
        <CodeBlock
          code={codeString}
          cursor={true}
          lang="jsx"
          writing={isVisible}
          duration={15000}
          delay={1000}
        />
      </Code>
    </section>
  )
}

export default CodePresentation
