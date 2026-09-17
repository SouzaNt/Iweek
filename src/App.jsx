import React, { useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureCards from './components/FeatureCards';
import CareerRoadmapsPreview from './components/CareerRoadmapsPreview';
import CareersCatalogSection from './components/CareersCatalogSection';
import AIInterviewModal from './components/AIInterviewModal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';

export default function App() {
  const [isInterviewOpen, setIsInterviewOpen] = useState(false);
  const { isLoggedIn, openAuthModal } = useAuth();

  const handleOpenInterview = () => {
    if (!isLoggedIn) {
      // Directs user to login/signup modal first; once completed, automatically launches interview
      openAuthModal(() => {
        setIsInterviewOpen(true);
      });
    } else {
      setIsInterviewOpen(true);
    }
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
        onStartInterview={handleOpenInterview} 
      />

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        {/* 1. Hero Section (with main title, subtitle, floating tech badges, radar, and AI Interview CTA) */}
        <HeroSection 
          onStartInterview={handleOpenInterview} 
        />

        {/* 2. Feature Cards (How it works - 3 steps) */}
        <FeatureCards 
          onStartInterview={handleOpenInterview} 
        />

        {/* 3. Career Roadmaps Preview (Interactive 3 starter careers with timeline tracks) */}
        <CareerRoadmapsPreview onStartInterview={handleOpenInterview} />

        {/* 4. Full 33 Tech Careers Catalog with Live Search & 5 Categories */}
        <CareersCatalogSection onStartInterview={handleOpenInterview} />
      </main>

      {/* Footer */}
      <Footer onStartInterview={handleOpenInterview} />

      {/* Authentication Modal (Sign Up / Sign In with Google, Phone or Email) */}
      <AuthModal />

      {/* AI Interview Chat Modal (5 Open Questions with Freeform Textarea, Quick Tags & Akinator Tech) */}
      <AIInterviewModal 
        isOpen={isInterviewOpen} 
        onClose={handleCloseInterview} 
      />
    </div>
  );
}
