import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const supportedLanguages = [
  { code: 'pt', label: 'Português', flag: '🇧🇷', nameDisplay: 'NorTech' },
  { code: 'en', label: 'English', flag: '🇺🇸', nameDisplay: 'NorTech' },
  { code: 'ja', label: '日本語 (Japonês)', flag: '🇯🇵', nameDisplay: 'NorTech (ノーテック)' },
  { code: 'es', label: 'Español', flag: '🇪🇸', nameDisplay: 'NorTech' }
];

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('nortech_lang') || 'pt';
  });

  useEffect(() => {
    localStorage.setItem('nortech_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const changeLanguage = (newLang) => {
    setLang(newLang);
  };

  const t = (key) => {
    const currentDict = translations[lang] || translations.pt;
    if (currentDict[key]) return currentDict[key];
    
    // Fallback to Portuguese
    if (translations.pt && translations.pt[key]) {
      return translations.pt[key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t, supportedLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
