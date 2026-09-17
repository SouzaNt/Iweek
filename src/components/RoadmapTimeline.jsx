import React, { useState } from 'react';
import { 
  ExternalLink, 
  RotateCcw, 
  CheckCircle2, 
  Compass, 
  Sparkles,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';
import roadmapsData from '../data/roadmaps.json';
import { useLanguage } from '../context/LanguageContext';

// Color themes per phase with high contrast and hover glow
const phaseStyles = {
  emerald: {
    nodeBg: "bg-emerald-500",
    nodeRing: "ring-emerald-500/30",
    nodeBorder: "border-emerald-300",
    badgeBg: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40",
    cardBorder: "border-emerald-500/30 hover:border-emerald-400",
    cardHoverGlow: "hover:shadow-emerald-950/50 hover:shadow-xl",
    btnBg: "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border-emerald-500/50 hover:border-emerald-400 shadow-sm",
    lineColor: "from-emerald-500"
  },
  amber: {
    nodeBg: "bg-amber-400",
    nodeRing: "ring-amber-400/30",
    nodeBorder: "border-amber-200",
    badgeBg: "bg-amber-950/80 text-amber-300 border-amber-500/40",
    cardBorder: "border-amber-500/30 hover:border-amber-400",
    cardHoverGlow: "hover:shadow-amber-950/50 hover:shadow-xl",
    btnBg: "bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border-amber-500/50 hover:border-amber-400 shadow-sm",
    lineColor: "via-amber-400"
  },
  sky: {
    nodeBg: "bg-sky-400",
    nodeRing: "ring-sky-400/30",
    nodeBorder: "border-sky-200",
    badgeBg: "bg-sky-950/80 text-sky-300 border-sky-500/40",
    cardBorder: "border-sky-500/30 hover:border-sky-400",
    cardHoverGlow: "hover:shadow-sky-950/50 hover:shadow-xl",
    btnBg: "bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border-sky-500/50 hover:border-sky-400 shadow-sm",
    lineColor: "via-sky-400"
  },
  purple: {
    nodeBg: "bg-purple-400",
    nodeRing: "ring-purple-400/30",
    nodeBorder: "border-purple-200",
    badgeBg: "bg-purple-950/80 text-purple-300 border-purple-500/40",
    cardBorder: "border-purple-500/30 hover:border-purple-400",
    cardHoverGlow: "hover:shadow-purple-950/50 hover:shadow-xl",
    btnBg: "bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border-purple-500/50 hover:border-purple-400 shadow-sm",
    lineColor: "to-purple-500"
  }
};

export default function RoadmapTimeline({ careerKey = 'frontend', onRestart }) {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const roadmap = roadmapsData[careerKey] || roadmapsData.frontend;
  const steps = roadmap.steps || [];

  const brandName = lang === 'ja' ? 'NorTech (ノーテック)' : 'NorTech';

  // Generate WhatsApp text and open WhatsApp Web / App
  const handleShareWhatsApp = () => {
    const stepsList = steps.map((s) => `📍 *Passo ${s.stepNumber}:* ${s.title}\n💡 ${s.whyStudy}`).join('\n\n');
    
    const message = `🚀 *Meu Mapa ${brandName}: ${roadmap.careerTitle}!*\n\nAcabei de fazer o teste no *${brandName}* e descobri minha trilha de estudos gratuita:\n\n${stepsList}\n\n🎯 Encontre o seu norte na tecnologia com o ${brandName}!`;
    
    // Copy to clipboard for backup
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);

    // Open WhatsApp link
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Timeline Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-neon-purple/20 flex items-center justify-center text-neon-purple-light border border-neon-purple/30 flex-shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-slate-100 font-display">
              {t('timeline_header_title')}
            </h4>
            <p className="text-xs text-slate-400">
              {t('timeline_header_subtitle')}
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-950 border border-slate-800 text-neon-mint self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{steps.length} {t('timeline_phases_unlocked')}</span>
        </span>
      </div>

      {/* 4. Mobile-first Vertical Timeline (Left-aligned, no screen breaks on <768px) */}
      <div className="relative pl-7 sm:pl-10 space-y-6 sm:space-y-8 before:absolute before:left-[11px] sm:before:left-[15px] before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-amber-400 before:to-purple-500">
        
        {steps.map((step, index) => {
          const style = phaseStyles[step.phaseColor] || phaseStyles.emerald;

          return (
            <div key={index} className="relative group">
              
              {/* Timeline Node (Connected circle with number) */}
              <div 
                className={`absolute -left-[27px] sm:-left-[35px] top-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full ${style.nodeBg} border-2 ${style.nodeBorder} ring-4 ${style.nodeRing} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 z-10`}
              >
                <span className="text-[10px] sm:text-xs font-black text-slate-950">
                  {step.stepNumber}
                </span>
              </div>

              {/* Step Card with Hover Elevation & Glow */}
              <div 
                className={`p-4 sm:p-6 rounded-2xl bg-slate-950/85 border ${style.cardBorder} backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${style.cardHoverGlow} shadow-md`}
              >
                
                {/* Phase Badge & Platform */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <span className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-bold border ${style.badgeBg}`}>
                    {step.phaseName}
                  </span>
                  
                  <span className="text-[11px] text-slate-400 font-medium">
                    📖 {step.courseName}
                  </span>
                </div>

                {/* Step Title */}
                <h5 className="text-base sm:text-lg font-bold text-slate-100 mb-1.5 font-display leading-snug group-hover:text-white transition-colors">
                  {step.title}
                </h5>

                {/* 1-Line Description (Why study) */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  <strong className="text-slate-100 font-semibold">{t('timeline_why_study')}</strong> {step.whyStudy}
                </p>

                {/* Free Course Button with Hover Lift */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-slate-900">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neon-mint">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{t('timeline_free_content')}</span>
                  </span>

                  <a
                    href={step.courseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-bold transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer ${style.btnBg}`}
                  >
                    <span>{t('timeline_btn_access')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* 5. Bottom Action Buttons: WhatsApp & Restart Test */}
      <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
        
        {/* WhatsApp Share Button */}
        <button
          onClick={handleShareWhatsApp}
          className="w-full sm:flex-1 py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition-all duration-300 hover:-translate-y-1 active:scale-95 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-slate-950" />
          <span>{copied ? t('timeline_copied_whatsapp') : t('timeline_btn_whatsapp')}</span>
        </button>

        {/* Restart Test Button */}
        <button
          onClick={onRestart}
          className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 transition-all duration-300 hover:-translate-y-1 active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t('timeline_btn_restart')}</span>
        </button>

      </div>

    </div>
  );
}

