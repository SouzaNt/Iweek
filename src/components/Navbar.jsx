import React, { useState } from 'react';
import { Menu, X, Rocket, BrainCircuit } from 'lucide-react';
import NorTechLogo from './NorTechLogo';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ onStartQuiz, onStartInterview }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, t } = useLanguage();

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const brandDisplayName = lang === 'ja' ? 'NORTECH (ノーテック)' : 'NORTECH';

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-purple-900/30 bg-[#06080f]/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand: NORTECH (Clean with NO Beta badge) */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* Custom Glowing NorTech Compass Code Logo */}
            <NorTechLogo className="w-10 h-10" />

            <div>
              <span className="font-display font-black text-xl md:text-2xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-purple-300 to-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.7)] group-hover:brightness-125 transition-all">
                {brandDisplayName}
              </span>
              <p className="text-[10px] text-purple-300/70 font-medium tracking-wider hidden md:block">
                {t('brand_subtitle')}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            <button 
              onClick={() => scrollToSection('como-funciona')}
              className="text-sm font-medium text-slate-300 hover:text-purple-300 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              {t('nav_how_it_works')}
            </button>
            <button 
              onClick={() => scrollToSection('trilhas')}
              className="text-sm font-medium text-slate-300 hover:text-purple-300 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              {t('nav_roadmaps')}
            </button>
            <button 
              onClick={() => scrollToSection('catalogo-carreiras')}
              className="text-sm font-medium text-slate-300 hover:text-neon-mint transition-all hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5"
            >
              <span>{t('nav_33_careers')}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-purple-600/50 text-purple-200 border border-purple-400/40 font-bold">
                {t('nav_new_badge')}
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-sm font-medium text-slate-300 hover:text-purple-300 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              {t('nav_faq')}
            </button>
          </div>

          {/* Top-Right Action Area: Language Switcher (Clean & Uncluttered) */}
          <div className="hidden sm:flex items-center gap-3">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-purple-500/30 text-slate-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-purple-900/40 bg-[#06080f]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <button 
            onClick={() => scrollToSection('como-funciona')}
            className="block w-full text-left py-2 text-slate-300 hover:text-purple-300 font-medium text-sm"
          >
            {t('nav_how_it_works')}
          </button>
          <button 
            onClick={() => scrollToSection('trilhas')}
            className="block w-full text-left py-2 text-slate-300 hover:text-purple-300 font-medium text-sm"
          >
            {t('nav_roadmaps')}
          </button>
          <button 
            onClick={() => scrollToSection('catalogo-carreiras')}
            className="block w-full text-left py-2 text-neon-mint font-semibold text-sm"
          >
            {t('nav_33_careers')}
          </button>
          <button 
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left py-2 text-slate-300 hover:text-purple-300 font-medium text-sm"
          >
            {t('nav_faq')}
          </button>
          
          <div className="pt-2 border-t border-purple-900/40 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartInterview();
              }}
              className="w-full py-3 rounded-xl bg-purple-900/70 border border-purple-500/40 text-purple-200 font-bold text-center flex items-center justify-center gap-2 text-sm shadow-md active:scale-95"
            >
              <BrainCircuit className="w-4 h-4 text-neon-mint" />
              <span>{t('nav_btn_interview')}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartQuiz();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-neon-mint text-slate-950 font-bold text-center flex items-center justify-center gap-2 text-sm shadow-lg shadow-purple-900/40 active:scale-95"
            >
              <Rocket className="w-4 h-4" />
              <span>{t('nav_btn_quiz')}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
