import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './component/home'
import { LanguageProvider } from './context/LanguageContext'
import { LoadingProvider } from './context/LoadingContext'
import LoadingScreen from './component/LoadingScreen'

// Lazy load toutes les pages secondaires (pas la homepage)
const Contact = lazy(() => import('./component/pages/Contact'))
const Photography = lazy(() => import('./component/pages/Photography'))
const Archives = lazy(() => import('./component/pages/Archives'))
const TrouveTaBoite = lazy(() => import('./component/pages/TrouveTaBoite'))
const ProjetAtIfit = lazy(() => import('./component/pages/ProjetAt-Ifit'))
const Commis = lazy(() => import('./component/pages/Commis'))
const Fiscalia = lazy(() => import('./component/pages/Fiscalia'))
const PortfolioProject = lazy(() => import('./component/pages/PortfolioProject'))
const MarsIA = lazy(() => import('./component/pages/MarsIA'))
const AiCodePipeline = lazy(() => import('./component/pages/AiCodePipeline'))
const CommisAIWorkflow = lazy(() => import('./component/pages/CommisAIWorkflow'))
const BotVeillePyWorkflow = lazy(() => import('./component/pages/BotVeillePyWorkflow'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  )
}

function App() {
  return (
    <LoadingProvider>
      <LoadingScreen />
      <LanguageProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/project/trouvetaboite" element={<TrouveTaBoite />} />
          <Route path="/project/at-ifit" element={<ProjetAtIfit />} />
          <Route path="/project/commis" element={<Commis />} />
          <Route path="/project/fiscalia" element={<Fiscalia />} />
          <Route path="/project/portfolio" element={<PortfolioProject />} />
          <Route path="/project/mars-ia" element={<MarsIA />} />
          <Route path="/workflow/ai-code-pipeline" element={<AiCodePipeline />} />
          <Route path="/workflow/commis-ai" element={<CommisAIWorkflow />} />
            <Route path="/workflow/bot-veille-py" element={<BotVeillePyWorkflow />} />
          </Routes>
        </Suspense>
      </LanguageProvider>
    </LoadingProvider>
  )
}

export default App
