import React, { useState } from 'react';
import { Menu, X, Rocket, BrainCircuit, User, LogOut, LogIn } from 'lucide-react';
import NorTechLogo from './NorTechLogo';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { soundFX } from '../utils/soundEffects';

export default function Navbar({ onStartInterview }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, t } = useLanguage();
  const { user, isLoggedIn, logout, openAuthModal } = useAuth();

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

          {/* Top-Right Action Area: User Profile / Login + Language Switcher */}
          <div className="hidden sm:flex items-center gap-3">
            <LanguageSwitcher />

            {isLoggedIn ? (
              <div className="flex items-center gap-2 pl-2 border-l border-purple-900/40">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-6 h-6 rounded-full object-cover border border-neon-mint/60"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <span className="text-xs font-bold text-slate-200 max-w-[100px] truncate">
                    {user?.name || 'Estudante'}
                  </span>
                </div>

                <button
                  onClick={() => {
                    soundFX.playClick();
                    logout();
                  }}
                  title="Sair da conta"
                  className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  soundFX.playClick();
                  openAuthModal();
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 text-purple-200 text-xs font-bold transition-all cursor-pointer hover:scale-105"
              >
                <LogIn className="w-3.5 h-3.5 text-neon-mint" />
                <span>Entrar</span>
              </button>
            )}
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
            {isLoggedIn ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-purple-950/40 border border-purple-500/30">
                <div className="flex items-center gap-2">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-7 h-7 rounded-full object-cover border border-neon-mint/60"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <span className="text-xs font-bold text-slate-200">
                    {user?.name || 'Estudante'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1 text-xs text-rose-400 font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  soundFX.playClick();
                  openAuthModal();
                }}
                className="w-full py-2.5 rounded-xl bg-purple-900/30 border border-purple-500/30 text-purple-200 text-xs font-bold flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4 text-neon-mint" />
                <span>Entrar ou Cadastrar</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartInterview();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-neon-mint text-slate-950 font-bold text-center flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-950/40 active:scale-95"
            >
              <BrainCircuit className="w-4 h-4 text-slate-950" />
              <span>{t('nav_btn_interview')}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
