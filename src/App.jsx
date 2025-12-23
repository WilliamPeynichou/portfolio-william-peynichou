import { Routes, Route } from 'react-router-dom'
import Home from './component/home'
import Contact from './component/pages/Contact'
import Photography from './component/pages/Photography'
import Archives from './component/pages/Archives'
import { LanguageProvider } from './context/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/archives" element={<Archives />} />
      </Routes>
    </LanguageProvider>
  )
}

export default App
