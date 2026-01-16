import { Routes, Route } from 'react-router-dom'
import Home from './component/home'
import Contact from './component/pages/Contact'
import Photography from './component/pages/Photography'
import Archives from './component/pages/Archives'
import ProjetAtIfit from './component/pages/ProjetAt-Ifit'
import ProjetEcocycle from './component/pages/ProjetEcocycle'
import YoutubeLike from './component/pages/YoutubeLike'
import PortfolioProject from './component/pages/PortfolioProject'
import MarsIA from './component/pages/MarsIA'
import VeloExpert from './component/pages/VeloExpert'
import NutritionAssistant from './component/pages/NutritionAssistant'
import DiscordVeille from './component/pages/DiscordVeille'
import { LanguageProvider } from './context/LanguageContext'

function App() {
  return (
    <LanguageProvider>
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
    </LanguageProvider>
  )
}

export default App
