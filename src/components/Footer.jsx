import React, { useState, useEffect, useRef } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import NorTechLogo from './NorTechLogo';
import { soundFX } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function Footer({ onStartInterview }) {
  const { lang, t } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);

  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const currentDict = translations[lang] || translations.pt;
  const faqs = currentDict.faqs || translations.pt.faqs;
  const brandDisplayName = lang === 'ja' ? 'NorTech (ノーテック)' : 'NORTECH';

  const handleToggleFaq = (idx) => {
    soundFX.playClick();
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <footer ref={footerRef} className="bg-[#06080f] border-t border-purple-900/30 pt-16 pb-12 transition-colors relative overflow-hidden">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* FAQ Section with Antigravity Emergence */}
        <div id="faq" className={`max-w-3xl mx-auto mb-16 space-y-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-900/90 border border-purple-500/30 text-xs font-semibold text-neon-mint mb-2 shadow-inner">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t('faq_badge')}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-display">
              {t('faq_title')}
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="rounded-2xl bg-slate-900/70 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-0.5 shadow-lg backdrop-blur-md"
              >
                <button
                  onClick={() => handleToggleFaq(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-100 hover:text-purple-200 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-neon-mint transition-transform" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 transition-transform" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-purple-900/20 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 border-t border-purple-900/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-400">
          
          <div className="flex items-center gap-2.5">
            <NorTechLogo className="w-6 h-6" />
            <span className="font-extrabold text-slate-100 tracking-wider font-display">{brandDisplayName}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">{t('footer_tagline')}</span>
          </div>

          {/* User Mandated Footer Text */}
          <div className="flex items-center justify-center gap-1.5 text-slate-300 font-medium">
            <span>{t('footer_inspira_credit')}</span>
          </div>

        </div>

      </div>
    </footer>
  );
}

