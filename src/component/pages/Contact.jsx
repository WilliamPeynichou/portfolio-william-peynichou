import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import Header from '../layout/header'
import Footer from '../layout/footer'

function Contact() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Construction du lien mailto
    const subject = encodeURIComponent("Message Portfolio")
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    
    window.location.href = `mailto:williampeynichou@gmail.com?subject=${subject}&body=${body}`
  }

  const content = {
    fr: {
      title: "Travaillons ensemble",
      subtitle: "Un projet ? Une idée ? N'hésitez pas à me contacter.",
      email: "Email",
      phone: "Téléphone",
      social: "Réseaux Sociaux",
      form: {
        name: "Nom",
        email: "Email",
        message: "Message",
        send: "Envoyer"
      }
    },
    en: {
      title: "Let's work together",
      subtitle: "A project? An idea? Feel free to contact me.",
      email: "Email",
      phone: "Phone",
      social: "Socials",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send"
      }
    }
  }

  const t = content[language]

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      
      <main className="pt-32 px-4 md:px-12 max-w-7xl mx-auto flex flex-col gap-24">
        {/* Intro */}
        <div className="flex flex-col gap-8">
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.9]">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Contact Info */}
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest">{t.email}</h3>
              <a href="mailto:williampeynichou@gmail.com" className="text-2xl md:text-4xl hover:text-gray-400 transition-colors border-b border-transparent hover:border-gray-400 w-fit">
                williampeynichou@gmail.com
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest">{t.phone}</h3>
              <a href="tel:+33659257240" className="text-2xl md:text-4xl hover:text-gray-400 transition-colors border-b border-transparent hover:border-gray-400 w-fit">
                +33 6 59 25 72 40
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest">{t.social}</h3>
              <div className="flex flex-col gap-2 text-xl">
                <a href="https://www.linkedin.com/in/william-peynichou-b8b925180/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors w-fit">LinkedIn</a>
                <a href="https://github.com/WilliamPeynichou" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors w-fit">GitHub</a>
                <a href="https://www.instagram.com/wilishkar/?hl=fr" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors w-fit">Instagram</a>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-mono text-gray-500 uppercase tracking-widest">{t.form.name}</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-white transition-colors"
                placeholder="..."
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-mono text-gray-500 uppercase tracking-widest">{t.form.email}</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-white transition-colors"
                placeholder="..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-mono text-gray-500 uppercase tracking-widest">{t.form.message}</label>
              <textarea 
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="bg-transparent border-b border-white/20 py-4 text-xl focus:outline-none focus:border-white transition-colors resize-none"
                placeholder="..."
              />
            </div>

            <button type="submit" className="mt-8 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors w-fit">
              {t.form.send}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Contact
