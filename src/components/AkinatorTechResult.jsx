import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  RotateCcw, 
  Shuffle, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  Code, 
  Terminal, 
  Bot, 
  Shield, 
  Target, 
  Palette, 
  Layers, 
  Smartphone, 
  Globe, 
  Check
} from 'lucide-react';
import { soundFX } from '../utils/soundEffects';
import TiltCard from './TiltCard';
import RoadmapTimeline from './RoadmapTimeline';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  Code,
  Terminal,
  Bot,
  Shield,
  Target,
  Palette,
  Layers,
  Smartphone,
  Globe,
  Sparkles,
  Compass
};

const defaultTopCareers = [
  {
    id: "dev-frontend",
    titulo: "Desenvolvedor Front-end & UI/UX",
    categoria: "Criativo e Visual",
    descricao: "Transforma ideias e designs em interfaces interativas e visuais elegantes para a web usando React, JavaScript, HTML e CSS moderno.",
    salario: "R$ 4.500 a R$ 14.000+",
    matchPercentage: "98.4%",
    badge: "🔮 Top 1 • Sua Maior Vocação Tech",
    skills: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "Figma & UI/UX"],
    icon: "Palette",
    timelineKey: "frontend"
  },
  {
    id: "dev-backend",
    titulo: "Desenvolvedor Back-end & Engenharia de Software",
    categoria: "Desenvolvimento",
    descricao: "Constrói os bastidores de sistemas, projetando bancos de dados rápidos, APIs seguras e algoritmos escaláveis com Python, Node.js e SQL.",
    salario: "R$ 5.000 a R$ 16.000+",
    matchPercentage: "94.2%",
    badge: "⚡ Top 2 • Segunda Alternativa Ideal",
    skills: ["Python ou Node.js", "Bancos SQL & NoSQL", "APIs RESTful", "Estrutura de Dados"],
    icon: "Terminal",
    timelineKey: "backend"
  },
  {
    id: "analista-dados",
    titulo: "Analista de Dados & Inteligência Artificial",
    categoria: "Dados e IA",
    descricao: "Descobre padrões ocultos em grandes massas de dados, criando relatórios inteligentes e dashboards visuais com SQL, Power BI e Python.",
    salario: "R$ 4.800 a R$ 15.000+",
    matchPercentage: "91.8%",
    badge: "🎯 Top 3 • Outra Rota Promissora",
    skills: ["SQL Avançado", "Power BI / Dashboards", "Python (Pandas)", "Estatística"],
    icon: "Bot",
    timelineKey: "data"
  }
];

export default function AkinatorTechResult({ 
  topCareers = defaultTopCareers, 
  onRestart,
  onExploreCatalog 
}) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showExhausted, setShowExhausted] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);

  const careersList = (topCareers && topCareers.length > 0) ? topCareers : defaultTopCareers;
  const currentCareer = careersList[currentIndex] || careersList[0];

  const badgeLabels = [
    t('akinator_top1'),
    t('akinator_top2'),
    t('akinator_top3')
  ];

  // Primary Action: "Gostei! Ver Trilha de Estudos"
  const handleAcceptCareer = () => {
    soundFX.playVictory();
    setShowRoadmap(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#A855F7', '#38BDF8', '#FBBF24']
      });
    } catch (e) {
      console.log('Confetti triggered');
    }
  };

  // Secondary Action: "Hmm, não curti muito. Tente outra!"
  const handleRejectAndNext = () => {
    soundFX.playWhoosh();
    setIsExiting(true);

    setTimeout(() => {
      if (currentIndex < careersList.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setIsExiting(false);
      } else {
        setShowExhausted(true);
        setIsExiting(false);
      }
    }, 280);
  };

  const handleRestartFromScratch = () => {
    soundFX.playClick();
    setCurrentIndex(0);
    setIsExiting(false);
    setShowExhausted(false);
    setShowRoadmap(false);
    if (onRestart) onRestart();
  };

  const handleGoToCatalog = () => {
    soundFX.playClick();
    if (onExploreCatalog) {
      onExploreCatalog();
    } else {
      const catalogEl = document.getElementById('catalogo-carreiras');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const IconComp = iconMap[currentCareer.icon] || Sparkles;

  // Render Roadmap View if user accepted the career
  if (showRoadmap) {
    return (
      <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Top Header of Accepted Choice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-purple-500/40 shadow-xl">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-neon-mint/20 border border-neon-mint/40 flex items-center justify-center text-neon-mint flex-shrink-0">
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
            <div>
              <span className="text-xs font-bold text-neon-mint uppercase tracking-wider">
                {t('akinator_chosen_track')}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-100 font-display">
                {currentCareer.titulo}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setShowRoadmap(false)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('akinator_btn_back_suggestions')}</span>
          </button>
        </div>

        {/* Vertical Timeline Component */}
        <RoadmapTimeline 
          careerKey={currentCareer.timelineKey || (currentCareer.id?.includes('front') ? 'frontend' : currentCareer.id?.includes('back') ? 'backend' : 'data')}
          onRestart={handleRestartFromScratch}
        />
      </div>
    );
  }

  // Render Exhausted / Fun Fallback Screen if all 3 suggestions were rejected
  if (showExhausted) {
    return (
      <div className="p-8 sm:p-10 rounded-3xl bg-[#080b16] border border-purple-500/50 shadow-2xl shadow-purple-950/80 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300 max-w-2xl mx-auto">
        
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-purple-600/30 to-neon-mint/20 border border-purple-500/40 flex items-center justify-center text-4xl shadow-xl shadow-purple-950/60 animate-bounce" style={{ animationDuration: '3s' }}>
          🧙‍♂️
        </div>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-xs font-bold text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-neon-mint" />
            <span>{t('akinator_badge')}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-display">
            {t('akinator_exhausted_title')}
          </h3>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-lg mx-auto">
            {t('akinator_exhausted_desc')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={handleGoToCatalog}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-neon-mint text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-slate-950" />
            <span>{t('akinator_btn_catalog')}</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>

          <button
            onClick={handleRestartFromScratch}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t('akinator_btn_restart')}</span>
          </button>
        </div>

      </div>
    );
  }

  // Active Akinator Card View
  return (
    <div className="space-y-6 max-w-2xl mx-auto select-none">
      
      {/* Top Akinator Step Indicator */}
      <div className="flex items-center justify-between text-xs px-2">
        <span className="flex items-center gap-1.5 text-purple-300 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-neon-mint" />
          <span>{t('akinator_badge')}</span>
        </span>
        <span className="text-slate-400 font-medium">
          {t('akinator_suggestion_of')} <strong className="text-neon-mint">{currentIndex + 1}</strong> {t('akinator_of')} {careersList.length}
        </span>
      </div>

      {/* Main Akinator Neon Glow Highlight Card */}
      <div 
        className={`transition-all duration-300 ease-out transform ${
          isExiting ? 'opacity-0 -translate-x-12 scale-95' : 'opacity-100 translate-x-0 scale-100'
        }`}
      >
        <TiltCard
          maxTilt={8}
          scale={1.01}
          className="relative rounded-3xl p-6 sm:p-8 bg-[#080b16]/95 border-2 border-purple-500/50 backdrop-blur-3xl shadow-[0_0_50px_rgba(168,85,247,0.35)] overflow-hidden"
        >
          {/* Top Radial Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/15 rounded-full blur-[90px] pointer-events-none" />
          
          {/* Card Header */}
          <div className="flex items-start justify-between gap-4 mb-5 relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600/30 to-slate-900 border border-purple-500/50 flex items-center justify-center text-purple-300 shadow-xl flex-shrink-0">
                <IconComp className="w-7 h-7 text-purple-300" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-xs font-bold text-purple-300 mb-1">
                  <span>{badgeLabels[currentIndex] || currentCareer.badge}</span>
                </div>

                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {currentCareer.categoria}
                </div>
              </div>
            </div>

            {/* Affinity Match Tag */}
            <div className="text-right flex-shrink-0">
              <span className="inline-block px-3 py-1 rounded-xl bg-neon-mint/20 border border-neon-mint/40 text-neon-mint font-extrabold text-xs shadow-md">
                ★ {currentCareer.matchPercentage || "96% Match"}
              </span>
              <span className="block text-[11px] text-slate-400 mt-1 font-semibold">
                {currentCareer.salario || "R$ 4.500 a R$ 14.000"}
              </span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 font-display tracking-tight leading-snug mb-3 relative z-10">
            {currentCareer.titulo}
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-6 relative z-10">
            {currentCareer.descricao}
          </p>

          {/* Key Skills Tags */}
          {currentCareer.skills && currentCareer.skills.length > 0 && (
            <div className="pt-4 border-t border-purple-900/30 relative z-10">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Habilidades & Tecnologias:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentCareer.skills.map((skill, sIdx) => (
                  <div 
                    key={sIdx}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/90 border border-purple-500/30 text-xs text-slate-200 font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-neon-mint flex-shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </TiltCard>
      </div>

      {/* 4. Action Buttons (Side by Side) */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        
        {/* Primary Button (Verde Menta) */}
        <button
          onClick={handleAcceptCareer}
          id="btn-akinator-accept"
          className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-neon-mint text-slate-950 font-display font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <span>{t('akinator_btn_accept')}</span>
          <ArrowRight className="w-5 h-5 text-slate-950" />
        </button>

        {/* Secondary Button (Outline Roxo / Shuffle) */}
        <button
          onClick={handleRejectAndNext}
          id="btn-akinator-reject"
          className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-purple-950/40 hover:bg-purple-900/60 text-purple-200 hover:text-white border-2 border-purple-500/50 hover:border-purple-400 font-display font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-purple-950/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <Shuffle className="w-4 h-4 text-purple-300" />
          <span>{t('akinator_btn_reject')}</span>
        </button>

      </div>

    </div>
  );
}
