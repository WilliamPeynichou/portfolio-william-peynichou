import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

function Footer() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Currently I'm open to new opportunities and projects. Feel free to reach out.",
      location: "Bordeaux, France"
    },
    fr: {
      title: "Actuellement ouvert à de nouvelles opportunités et projets. N'hésitez pas à me contacter.",
      location: "Bordeaux, France"
    }
  }

  return (
    <footer className="py-24 px-4 md:px-12 bg-black text-white rounded-t-[2.5rem] mt-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl md:text-5xl font-light">{content[language].title}</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="flex flex-col gap-2">
            <a href="mailto:williampeynichou@gmail.com" className="text-2xl md:text-4xl hover:text-gray-400 transition-colors">williampeynichou@gmail.com</a>
            <a href="tel:+33659257240" className="text-2xl md:text-4xl hover:text-gray-400 transition-colors">+33 6 59 25 72 40</a>
          </div>

          <div className="flex gap-8 text-lg">
            <a href="https://github.com/WilliamPeynichou" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/william-peynichou-b8b925180/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">LinkedIn</a>
            <a href="https://www.instagram.com/wilishkar/?hl=fr" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">Instagram</a>
          </div>
        </div>
        
        <div className="flex justify-between items-end border-t border-gray-800 pt-8 mt-8 text-sm text-gray-500">
          <div>©2026 William Peynichou</div>
          <div>{content[language].location}</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer