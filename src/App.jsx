import React, { useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureCards from './components/FeatureCards';
import CareerRoadmapsPreview from './components/CareerRoadmapsPreview';
import CareersCatalogSection from './components/CareersCatalogSection';
import CareerQuizModal from './components/CareerQuizModal';
import AIInterviewModal from './components/AIInterviewModal';
import Footer from './components/Footer';

export default function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isInterviewOpen, setIsInterviewOpen] = useState(false);

  const handleOpenQuiz = () => {
    setIsQuizOpen(true);
  };

  const handleCloseQuiz = () => {
    setIsQuizOpen(false);
  };

  const handleOpenInterview = () => {
    setIsInterviewOpen(true);
  };

  const handleCloseInterview = () => {
    setIsInterviewOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-neon-purple/30 selection:text-neon-mint relative overflow-x-hidden">
      
      {/* Dynamic Interactive Antigravity Particle Constellation */}
      <ParticleBackground />

      {/* Navigation */}
      <Navbar 
        onStartQuiz={handleOpenQuiz} 
        onStartInterview={handleOpenInterview} 
      />

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        {/* 1. Hero Section (with main title, subtitle, floating tech badges, radar, and dual CTAs) */}
        <HeroSection 
          onStartQuiz={handleOpenQuiz} 
          onStartInterview={handleOpenInterview} 
        />

        {/* 2. Feature Cards (How it works - 3 steps) */}
        <FeatureCards 
          onStartQuiz={handleOpenQuiz} 
          onStartInterview={handleOpenInterview} 
        />

        {/* 3. Career Roadmaps Preview (Interactive 3 starter careers with timeline tracks) */}
        <CareerRoadmapsPreview onStartQuiz={handleOpenQuiz} />

        {/* 4. Full 33 Tech Careers Catalog with Live Search & 5 Categories */}
        <CareersCatalogSection onStartQuiz={handleOpenQuiz} />
      </main>

      {/* Footer */}
      <Footer onStartQuiz={handleOpenQuiz} />

      {/* Gamified 3-Question Quiz Modal */}
      <CareerQuizModal 
        isOpen={isQuizOpen} 
        onClose={handleCloseQuiz} 
      />

      {/* AI Interview Chat Modal (5 Open Questions with Freeform Textarea & Quick Tags) */}
      <AIInterviewModal 
        isOpen={isInterviewOpen} 
        onClose={handleCloseInterview} 
      />
    </div>
  );
}
