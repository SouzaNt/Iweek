import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { soundFX } from '../utils/soundEffects';

export default function LanguageSwitcher() {
  const { lang, changeLanguage, supportedLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLangObj = supportedLanguages.find((l) => l.code === lang) || supportedLanguages[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (code) => {
    soundFX.playClick();
    changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Main Language Button */}
      <button
        onClick={() => {
          soundFX.playClick();
          setIsOpen(!isOpen);
        }}
        id="btn-language-selector"
        className="group relative cursor-pointer inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-emerald-500/40 hover:border-neon-mint shadow-lg shadow-emerald-950/40 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-500/20 text-neon-mint border border-neon-mint/30">
          <Globe className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '14s' }} />
        </span>

        <span className="text-sm font-bold flex items-center gap-1.5">
          <span>{currentLangObj.flag}</span>
          <span className="hidden sm:inline font-display">{currentLangObj.label}</span>
          <span className="sm:hidden font-mono uppercase text-xs">{currentLangObj.code}</span>
        </span>

        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-neon-mint' : ''}`} />
      </button>

      {/* Glowing Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#080b16]/98 border border-purple-500/40 shadow-2xl shadow-purple-950/90 py-1.5 z-50 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
          <div className="px-3 py-1.5 border-b border-purple-900/30 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Selecione o Idioma / Language
          </div>

          <div className="p-1 space-y-0.5">
            {supportedLanguages.map((l) => {
              const isSelected = l.code === lang;

              return (
                <button
                  key={l.code}
                  onClick={() => handleSelectLanguage(l.code)}
                  className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600/30 text-neon-mint border border-purple-500/40 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/90'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{l.flag}</span>
                    <span>{l.label}</span>
                  </div>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-neon-mint stroke-[3]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
