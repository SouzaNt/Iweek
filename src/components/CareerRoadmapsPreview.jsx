import React, { useState, useEffect, useRef } from 'react';
import { 
  Code, 
  Terminal, 
  Bot, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { careerProfiles } from '../data/quizData';
import { soundFX } from '../utils/soundEffects';
import TiltCard from './TiltCard';
import { useLanguage } from '../context/LanguageContext';

export default function CareerRoadmapsPreview({ onStartQuiz }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('frontend');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const careers = [
    { id: 'frontend', name: 'Front-end', icon: Code, color: 'text-purple-400', activeGlow: 'shadow-purple-950/60 border-purple-500/70' },
    { id: 'backend', name: 'Back-end / Software', icon: Terminal, color: 'text-neon-mint', activeGlow: 'shadow-emerald-950/60 border-emerald-500/70' },
    { id: 'data', name: 'Análise de Dados', icon: Bot, color: 'text-neon-cyan', activeGlow: 'shadow-cyan-950/60 border-cyan-500/70' }
  ];

  const currentProfile = careerProfiles[activeTab] || careerProfiles.frontend;

  const handleTabChange = (tabId) => {
    soundFX.playClick();
    setActiveTab(tabId);
  };

  return (
    <section 
      id="trilhas" 
      ref={sectionRef}
      className="py-24 bg-slate-950 relative overflow-hidden"
    >
      {/* Background radial highlight & ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Antigravity Emergence */}
        <div className={`text-center max-w-3xl mx-auto mb-12 space-y-3 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/30 text-xs font-semibold text-purple-300 shadow-inner">
            <Layers className="w-3.5 h-3.5 animate-pulse" />
            <span>{t('roadmaps_badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 font-display tracking-tight">
            {t('roadmaps_title')}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('roadmaps_desc')}
          </p>
        </div>

        {/* Tab Buttons with Antigravity Hover Lift */}
        <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 transition-all duration-700 delay-150 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {careers.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  isActive 
                    ? `bg-slate-900 text-white border-2 ${tab.activeGlow} shadow-xl scale-105` 
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${tab.color}`} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Career Detail Card with Antigravity 3D Tilt */}
        <div className={`max-w-4xl mx-auto transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
        }`}>
          <TiltCard
            maxTilt={6}
            scale={1.01}
            className="rounded-3xl p-6 sm:p-10 bg-slate-900/90 border border-purple-500/30 backdrop-blur-2xl shadow-2xl shadow-purple-950/40 relative overflow-hidden"
          >
            {/* Header of the Selected Career */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-purple-900/30">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    {currentProfile.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    {currentProfile.starterLevel}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-display">
                  {currentProfile.title}
                </h3>
                
                <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl font-normal leading-relaxed">
                  {currentProfile.tagline}
                </p>
              </div>

              <div className="bg-slate-950/90 p-4 sm:p-5 rounded-2xl border border-purple-500/30 w-full md:w-auto text-left md:text-right shadow-lg">
                <span className="text-xs text-slate-400 block mb-1">{t('roadmaps_avg_salary')}</span>
                <span className="text-xl sm:text-2xl font-black text-neon-mint flex items-center gap-1 font-display">
                  {currentProfile.avgSalary}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              
              {/* Steps */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-neon-mint" />
                  <span>{t('roadmaps_first_steps')}</span>
                </h4>
                
                <div className="space-y-3">
                  {currentProfile.firstSteps.map((step, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 hover:border-purple-500/40 transition-all hover:translate-x-1"
                    >
                      <CheckCircle2 className="w-4 h-4 text-neon-mint flex-shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills & Project Showcase */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-3">
                    {t('roadmaps_skills_title')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProfile.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-950/90 text-slate-200 border border-slate-800 text-xs font-semibold hover:border-purple-400 hover:text-purple-300 transition-colors shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/50 via-slate-950 to-slate-950 border border-purple-500/30 hover:border-purple-500/50 transition-all shadow-md">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 block mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-neon-mint" />
                    {t('roadmaps_project_badge')}
                  </span>
                  <p className="text-sm font-bold text-slate-100">
                    {currentProfile.highlightProject}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {t('roadmaps_project_tip')}
                  </p>
                </div>

                <button
                  onClick={() => {
                    soundFX.playWhoosh();
                    onStartQuiz();
                  }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 hover:opacity-95 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-purple-950/70 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <span>{t('roadmaps_btn_discover')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </TiltCard>
        </div>

      </div>
    </section>
  );
}
