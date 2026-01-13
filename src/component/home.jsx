import React from 'react';
import Header from './layout/header';
import Footer from './layout/footer';
import Opener from './opener/opener';
import CodePresentation from './codePresentation';
import ProjectsPresentation from './ProjectsPresentation';
import WorkflowSection from './WorkflowSection';
import Stacks from './Stacks';
import ProfileSection from './ProfileSection';
import VeilleSection from './VeilleSection';
import { PhotographySection, ArchivesSection } from './ExtraSections';

const Home = () => {
  return (
    <div className="relative font-sans text-black bg-white">
      {/* 1. Header fixe (par-dessus tout) */}
      <Header />

      {/* 2. L'Opener (Vidéo/Planet d'intro) qui reste en fond */}
      <Opener />

      {/* 3. Le contenu qui scrolle par-dessus l'Opener */}
      {/* mt-[200vh] pousse le contenu après 2 fenêtres (2 phases : zoom + disparition nom) */}
      <div className="relative z-10 mt-[200vh]">
        
        {/* Container principal avec fond blanc et effet de carte arrondie */}
        <div className="min-h-screen rounded-t-[3rem] shadow-[0_-20px_60px_rgba(0,0,0,0)] bg-black">
          <main className="flex flex-1 flex-col">
            {/* Chaque section apparaît au scroll */}
            <CodePresentation />
            <ProjectsPresentation />
            <WorkflowSection />
            <Stacks />
            <ProfileSection />
            <VeilleSection />
            <PhotographySection />
            <ArchivesSection />
            {/* Ajoutez d'autres composants ici, ils apparaîtront au scroll */}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Home