import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './component/home'
import { LanguageProvider } from './context/LanguageContext'

// Lazy load toutes les pages secondaires (pas la homepage)
const Contact = lazy(() => import('./component/pages/Contact'))
const Photography = lazy(() => import('./component/pages/Photography'))
const Archives = lazy(() => import('./component/pages/Archives'))
const ProjetAtIfit = lazy(() => import('./component/pages/ProjetAt-Ifit'))
const ProjetEcocycle = lazy(() => import('./component/pages/ProjetEcocycle'))
const YoutubeLike = lazy(() => import('./component/pages/YoutubeLike'))
const PortfolioProject = lazy(() => import('./component/pages/PortfolioProject'))
const MarsIA = lazy(() => import('./component/pages/MarsIA'))
const VeloExpert = lazy(() => import('./component/pages/VeloExpert'))
const NutritionAssistant = lazy(() => import('./component/pages/NutritionAssistant'))
const DiscordVeille = lazy(() => import('./component/pages/DiscordVeille'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/project/at-ifit" element={<ProjetAtIfit />} />
          <Route path="/project/ecocycle" element={<ProjetEcocycle />} />
          <Route path="/project/youtube-design" element={<YoutubeLike />} />
          <Route path="/project/portfolio" element={<PortfolioProject />} />
          <Route path="/project/mars-ia" element={<MarsIA />} />
          <Route path="/workflow/velo-expert" element={<VeloExpert />} />
          <Route path="/workflow/assistant-sport-nutrition" element={<NutritionAssistant />} />
          <Route path="/workflow/bot-veille-discord" element={<DiscordVeille />} />
        </Routes>
      </Suspense>
    </LanguageProvider>
  )
}

export default App
