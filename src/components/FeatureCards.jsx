import React, { useEffect, useRef, useState } from 'react';
import { Target, Sparkles, Map, Flame, Award, ArrowUpRight } from 'lucide-react';
import TiltCard from './TiltCard';
import { soundFX } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';

export default function FeatureCards({ onStartInterview }) {
  const { t } = useLanguage();
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

  const steps = [
    {
      step: "01",
      badge: t('step1_badge'),
      title: t('step1_title'),
      desc: t('step1_desc'),
      icon: Target,
      color: "from-purple-500/25 to-indigo-500/20",
      borderColor: "border-purple-500/30 hover:border-purple-400",
      iconColor: "text-purple-300",
      tag: t('step1_tag'),
      delay: "delay-100"
    },
    {
      step: "02",
      badge: t('step2_badge'),
      title: t('step2_title'),
      desc: t('step2_desc'),
      icon: Sparkles,
      color: "from-emerald-500/25 to-teal-500/20",
      borderColor: "border-emerald-500/30 hover:border-emerald-400",
      iconColor: "text-neon-mint",
      tag: t('step2_tag'),
      delay: "delay-200"
    },
    {
      step: "03",
      badge: t('step3_badge'),
      title: t('step3_title'),
      desc: t('step3_desc'),
      icon: Map,
      color: "from-cyan-500/25 to-blue-500/20",
      borderColor: "border-cyan-500/30 hover:border-cyan-400",
      iconColor: "text-neon-cyan",
      tag: t('step3_tag'),
      delay: "delay-300"
    }
  ];

  return (
    <section 
      id="como-funciona" 
      ref={sectionRef}
      className="py-24 bg-slate-950/70 border-y border-purple-900/30 relative overflow-hidden"
    >
      {/* Dynamic Ambient Zero-G Glow Orbs */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-neon-mint/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Antigravity Emergence */}
        <div className={`text-center max-w-3xl mx-auto mb-16 space-y-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/30 text-xs font-semibold text-neon-mint shadow-inner">
            <Flame className="w-3.5 h-3.5 animate-bounce" />
            <span>{t('features_badge')}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 font-display tracking-tight">
            {t('features_title')}
          </h2>
          
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            {t('features_desc')}
          </p>
        </div>

        {/* 3 Step Cards with Interactive Antigravity 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`transition-all duration-700 ${item.delay} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              >
                <TiltCard 
                  maxTilt={10}
                  scale={1.03}
                  onMouseEnter={() => soundFX.playClick()}
                  className={`h-full relative rounded-3xl p-6 sm:p-8 bg-slate-900/85 border ${item.borderColor} backdrop-blur-xl group shadow-2xl shadow-purple-950/30 transition-colors duration-300`}
                >
                  {/* Step Number in background */}
                  <span className="absolute top-4 right-6 font-display text-4xl sm:text-5xl font-black text-slate-800/50 group-hover:text-purple-400/20 transition-colors pointer-events-none">
                    {item.step}
                  </span>

                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center ${item.iconColor} border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700/80">
                      {item.tag}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block mb-1">
                    {item.badge}
                  </span>

                  <h3 className="text-xl font-bold text-slate-100 mb-3 font-display group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </TiltCard>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Callout */}
        <div className={`mt-14 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
        }`}>
          <div className="rounded-3xl p-[1px] bg-gradient-to-r from-purple-500/50 via-slate-700 to-emerald-500/50 shadow-2xl shadow-purple-950/40">
            <div className="rounded-[23px] p-6 sm:p-8 bg-[#080b16]/95 backdrop-blur-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-neon-mint/20 border border-neon-mint/40 flex items-center justify-center text-neon-mint flex-shrink-0 shadow-lg">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-100 font-display">
                    {t('features_callout_title')}
                  </h4>
                  <p className="text-sm text-slate-300">
                    {t('features_callout_desc')}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  soundFX.playWhoosh();
                  if (onStartInterview) onStartInterview();
                }}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-neon-mint hover:opacity-95 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-all duration-300 hover:scale-105 active:scale-95 flex-shrink-0 cursor-pointer"
              >
                <span>{t('features_callout_btn')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
