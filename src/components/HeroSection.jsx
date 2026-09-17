import React, { useState, useEffect, useRef } from 'react';
import { 
  Rocket, 
  Sparkles, 
  Compass, 
  Code, 
  Terminal, 
  Bot, 
  Shield, 
  Palette, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Zap, 
  Globe,
  Play,
  Maximize2,
  BrainCircuit
} from 'lucide-react';
import { soundFX } from '../utils/soundEffects';
import NorTechLogo from './NorTechLogo';
import TiltCard from './TiltCard';
import { useLanguage } from '../context/LanguageContext';

export default function HeroSection({ onStartQuiz, onStartInterview }) {
  const { lang, t } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Antigravity Typewriter & Reveal State from Translations
  const line1Full = t('hero_line_1');
  const line2Full = t('hero_line_2');
  
  const [line1Display, setLine1Display] = useState("");
  const [line2Display, setLine2Display] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showAntigravityElements, setShowAntigravityElements] = useState(false);
  const [gravityBurst, setGravityBurst] = useState(false);

  // Scroll Progress
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef(null);
  const radarRef = useRef(null);

  // Track scroll position for Antigravity 3D Zoom / Scale Transition
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const progress = Math.min(Math.max(scrollY / 380, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter Scramble & Emergence Sequence (Re-runs when language changes)
  useEffect(() => {
    let index1 = 0;
    let index2 = 0;
    let interval1 = null;
    let interval2 = null;

    setLine1Display("");
    setLine2Display("");
    setIsTypingComplete(false);
    setShowAntigravityElements(false);
    setGravityBurst(false);

    // Step 1: Type Line 1
    interval1 = setInterval(() => {
      index1++;
      if (index1 <= line1Full.length) {
        setLine1Display(line1Full.slice(0, index1));
        if (index1 % 2 === 0) soundFX.playClick();
      } else {
        clearInterval(interval1);
        
        // Pause between line 1 & 2
        setTimeout(() => {
          interval2 = setInterval(() => {
            index2++;
            if (index2 <= line2Full.length) {
              setLine2Display(line2Full.slice(0, index2));
              if (index2 % 2 === 0) soundFX.playClick();
            } else {
              clearInterval(interval2);
              
              // Typing complete -> Trigger Antigravity Zero-G Burst!
              setIsTypingComplete(true);
              setGravityBurst(true);
              soundFX.playVictory();

              setTimeout(() => {
                setShowAntigravityElements(true);
              }, 300);
            }
          }, 68);
        }, 260);
      }
    }, 70);

    return () => {
      if (interval1) clearInterval(interval1);
      if (interval2) clearInterval(interval2);
    };
  }, [lang, line1Full, line2Full]);

  const handleStart = () => {
    soundFX.playWhoosh();
    onStartQuiz();
  };

  const handleStartAiInterview = () => {
    soundFX.playWhoosh();
    if (onStartInterview) {
      onStartInterview();
    } else {
      onStartQuiz();
    }
  };

  const handleReplayIntro = () => {
    soundFX.playWhoosh();
    setLine1Display("");
    setLine2Display("");
    setIsTypingComplete(false);
    setShowAntigravityElements(false);
    setGravityBurst(false);

    let index1 = 0;
    let index2 = 0;

    const interval1 = setInterval(() => {
      index1++;
      if (index1 <= line1Full.length) {
        setLine1Display(line1Full.slice(0, index1));
        if (index1 % 2 === 0) soundFX.playClick();
      } else {
        clearInterval(interval1);
        setTimeout(() => {
          const interval2 = setInterval(() => {
            index2++;
            if (index2 <= line2Full.length) {
              setLine2Display(line2Full.slice(0, index2));
              if (index2 % 2 === 0) soundFX.playClick();
            } else {
              clearInterval(interval2);
              setIsTypingComplete(true);
              setGravityBurst(true);
              soundFX.playVictory();
              setTimeout(() => setShowAntigravityElements(true), 300);
            }
          }, 68);
        }, 260);
      }
    }, 70);
  };

  // Compute 3D Perspective Transformations
  const heroStyle = {
    opacity: Math.max(0.12, 1 - scrollProgress * 1.25),
    transform: `translateY(-${scrollProgress * 60}px) scale(${1 - scrollProgress * 0.06})`,
    transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
  };

  const radarScale = 0.88 + scrollProgress * 0.12;
  const radarRotateX = (1 - scrollProgress) * 7.5;
  const radarTranslateY = (1 - scrollProgress) * 55;
  const radarOpacity = Math.min(1, 0.75 + scrollProgress * 0.25);

  const radarStyle = {
    transform: `perspective(1200px) rotateX(${radarRotateX}deg) scale(${radarScale}) translateY(${radarTranslateY}px)`,
    opacity: radarOpacity,
    transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
  };

  return (
    <section ref={heroRef} className="relative pt-6 pb-24 md:pt-10 md:pb-36 overflow-hidden select-none min-h-screen flex flex-col justify-center">
      
      {/* Dynamic Ambient Mesh Lights (Antigravity Atmosphere) */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] md:w-[850px] md:h-[850px] bg-gradient-to-tr from-purple-600/20 via-indigo-600/10 to-neon-mint/15 rounded-full blur-[140px] pointer-events-none -z-10 transition-all duration-1000 ${
        showAntigravityElements ? 'scale-100 opacity-100 animate-pulse-ring' : 'scale-75 opacity-30'
      }`} />
      
      <div className={`absolute top-1/3 left-10 w-[350px] h-[350px] bg-neon-mint/10 rounded-full blur-[100px] pointer-events-none -z-10 transition-all duration-1000 ${
        showAntigravityElements ? 'opacity-100 animate-float-slow' : 'opacity-0'
      }`} />
      
      <div className={`absolute top-1/2 right-10 w-[380px] h-[380px] bg-neon-cyan/10 rounded-full blur-[110px] pointer-events-none -z-10 transition-all duration-1000 ${
        showAntigravityElements ? 'opacity-100 animate-float-reverse' : 'opacity-0'
      }`} />
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-80 pointer-events-none -z-10" />

      {/* Antigravity Zero-G Expansion Shockwave */}
      {gravityBurst && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-purple-400 bg-purple-500/15 pointer-events-none z-0 animate-ping duration-1000" />
      )}

      {/* Floating Holographic Tech Badges */}
      <div className={`hidden lg:block absolute left-[6%] top-[24%] pointer-events-none transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1) ${
        showAntigravityElements 
          ? 'opacity-100 translate-y-0 scale-100 animate-float-slow' 
          : 'opacity-0 -translate-y-12 scale-75'
      }`}>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-purple-500/40 backdrop-blur-xl shadow-2xl shadow-purple-950/60 hover:border-purple-300">
          <Code className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold text-slate-200">React.js & UI</span>
        </div>
      </div>

      <div className={`hidden lg:block absolute right-[6%] top-[22%] pointer-events-none transition-all duration-1000 delay-150 cubic-bezier(0.34, 1.56, 0.64, 1) ${
        showAntigravityElements 
          ? 'opacity-100 translate-y-0 scale-100 animate-float-reverse' 
          : 'opacity-0 -translate-y-12 scale-75'
      }`}>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-emerald-500/40 backdrop-blur-xl shadow-2xl shadow-emerald-950/60 hover:border-emerald-300">
          <Terminal className="w-4 h-4 text-neon-mint" />
          <span className="text-xs font-bold text-slate-200">Python & APIs</span>
        </div>
      </div>

      <div className={`hidden xl:block absolute left-[8%] bottom-[26%] pointer-events-none transition-all duration-1000 delay-300 cubic-bezier(0.34, 1.56, 0.64, 1) ${
        showAntigravityElements 
          ? 'opacity-100 translate-y-0 scale-100 animate-float-reverse' 
          : 'opacity-0 translate-y-12 scale-75'
      }`}>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 backdrop-blur-xl shadow-2xl shadow-cyan-950/60 hover:border-cyan-300">
          <Bot className="w-4 h-4 text-neon-cyan" />
          <span className="text-xs font-bold text-slate-200">AI & Dados</span>
        </div>
      </div>

      <div className={`hidden xl:block absolute right-[8%] bottom-[24%] pointer-events-none transition-all duration-1000 delay-450 cubic-bezier(0.34, 1.56, 0.64, 1) ${
        showAntigravityElements 
          ? 'opacity-100 translate-y-0 scale-100 animate-float-slow' 
          : 'opacity-0 translate-y-12 scale-75'
      }`}>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-pink-500/40 backdrop-blur-xl shadow-2xl shadow-pink-950/60 hover:border-pink-300">
          <Palette className="w-4 h-4 text-pink-400" />
          <span className="text-xs font-bold text-slate-200">Figma & UX</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TELA 1: HERO SECTION (Clean and Uncluttered) */}
      {/* ========================================================================= */}
      <div style={heroStyle} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Official 3D NorTech Logo Emblem (Hero Showcase) */}
        <div className={`flex flex-col items-center justify-center mb-6 transition-all duration-1000 ${
          showAntigravityElements 
            ? 'opacity-100 translate-y-0 scale-100 animate-float-slow' 
            : 'opacity-40 -translate-y-4 scale-90'
        }`}>
          <NorTechLogo variant="banner" />
        </div>

        {/* Hero Headline (Letter by Letter Antigravity Emergence) */}
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.14] min-h-[120px] sm:min-h-[160px] flex flex-col items-center justify-center">
            
            {/* Line 1 */}
            <span className="inline-block relative">
              {line1Display}
              {!line2Display && !isTypingComplete && (
                <span className="inline-block w-2.5 h-8 sm:h-12 bg-neon-mint ml-1 animate-pulse align-middle" />
              )}
            </span>

            {/* Line 2 (Gradient + Antigravity Shimmer) */}
            <span className="text-gradient-purple-mint inline-block mt-2.5 drop-shadow-sm relative">
              {line2Display}
              {line2Display && !isTypingComplete && (
                <span className="inline-block w-2.5 h-8 sm:h-12 bg-purple-400 ml-1 animate-pulse align-middle" />
              )}
            </span>
          </h1>

          {/* Subtitle (Floats into view when typing completes) */}
          <p className={`text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed transition-all duration-700 delay-100 ${
            showAntigravityElements 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-6'
          }`}>
            {t('hero_subtitle')}
          </p>

          {/* Central CTAs */}
          <div className={`pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 transition-all duration-700 delay-200 ${
            showAntigravityElements 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
          }`}>
            
            {/* Shimmering Animated Glowing Wrapper (Quiz Rápido) */}
            <div className="p-[2px] rounded-2xl animated-glow-border shadow-2xl shadow-purple-950/60 w-full sm:w-auto">
              <button
                onClick={handleStart}
                id="cta-start-journey"
                className="relative group cursor-pointer inline-flex items-center justify-center px-7 sm:px-9 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-neon-mint text-slate-950 font-display font-extrabold text-base sm:text-lg tracking-tight animate-pulse-glow hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto"
              >
                <div className="flex items-center gap-2.5">
                  <Rocket className="w-5 h-5 text-slate-950 group-hover:-translate-y-1.5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>{t('hero_btn_quiz')}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </button>
            </div>

            {/* AI Interview CTA */}
            <button
              onClick={handleStartAiInterview}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-2xl bg-purple-900/60 hover:bg-purple-900/90 text-purple-200 hover:text-white border border-purple-500/50 font-bold text-base transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-purple-950/50 cursor-pointer"
            >
              <BrainCircuit className="w-5 h-5 text-neon-mint animate-pulse" />
              <span>{t('hero_btn_interview')}</span>
            </button>

            {/* Replay Option */}
            <button
              onClick={handleReplayIntro}
              title="Reexecutar Efeito Gravidade Zero"
              className="p-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-purple-300 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 shadow-lg cursor-pointer hidden md:flex items-center justify-center"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Trust & Gamification Badges */}
          <div className={`pt-6 sm:pt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300 transition-all duration-700 delay-300 ${
            showAntigravityElements 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-6'
          }`}>
            <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-full border border-slate-800 backdrop-blur-md shadow-md hover:border-purple-500/40 transition-all hover:-translate-y-0.5">
              <CheckCircle2 className="w-4 h-4 text-neon-mint" />
              <span>{t('hero_badge_free')}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-full border border-slate-800 backdrop-blur-md shadow-md hover:border-purple-500/40 transition-all hover:-translate-y-0.5">
              <BrainCircuit className="w-4 h-4 text-purple-300" />
              <span>{t('hero_badge_ai')}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-full border border-slate-800 backdrop-blur-md shadow-md hover:border-purple-500/40 transition-all hover:-translate-y-0.5">
              <Globe className="w-4 h-4 text-neon-cyan" />
              <span>{t('hero_badge_job')}</span>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* TELA 2: RADAR & COCKPIT SHOWCASE */}
      {/* ========================================================================= */}
      <div 
        id="radar-section"
        ref={radarRef} 
        style={radarStyle} 
        className="mt-14 md:mt-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full"
      >
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-purple-500/50 via-slate-800/80 to-emerald-500/40 shadow-[0_0_50px_rgba(168,85,247,0.25)]">
          
          {/* Floating 'Play Intro / Iniciar Bússola' Pill Button */}
          <div className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 hidden sm:block">
            <button
              onClick={handleStart}
              className="group cursor-pointer flex items-center gap-2.5 px-5 py-3 rounded-full bg-white text-slate-950 font-display font-extrabold text-xs sm:text-sm shadow-2xl shadow-purple-950/80 hover:bg-neon-mint hover:scale-110 active:scale-95 transition-all duration-300 border border-purple-300/40"
            >
              <span className="w-6 h-6 rounded-full bg-slate-950 flex items-center justify-center text-white group-hover:bg-slate-900">
                <Play className="w-3 h-3 fill-white ml-0.5" />
              </span>
              <span>{t('radar_play_intro')}</span>
            </button>
          </div>

          {/* Cockpit / IDE Window Frame */}
          <div className="rounded-[23px] bg-[#080b16]/95 backdrop-blur-3xl p-6 sm:p-8 md:p-10 border border-purple-500/30 relative overflow-hidden">
            
            {/* Top IDE macOS-Style Window Header */}
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-purple-900/30 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-sm" />
                <span className="ml-2 font-mono text-[11px] text-purple-300/70 hidden sm:inline">
                  nortech-radar.jsx — main • Antigravity Engine
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                  {t('radar_badge')}
                </span>
                <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
              </div>
            </div>

            {/* Radar Sweeping Beam Overlay */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-purple-500/15 via-transparent to-transparent rounded-full pointer-events-none animate-radar-sweep opacity-80" />

            {/* Radar Content Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800/80 relative z-10">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-neon-mint font-semibold text-xs uppercase tracking-wider mb-1">
                  <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
                  <span>{t('radar_header_badge')}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-display">
                  {t('radar_title')}
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  {t('radar_desc')}
                </p>
              </div>

              <div className="flex items-center gap-2 self-stretch md:self-auto">
                <button
                  onClick={handleStart}
                  className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-purple-600/25 hover:bg-purple-600/35 border border-purple-400/50 text-purple-200 hover:text-white font-bold text-xs sm:text-sm transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 justify-center shadow-lg shadow-purple-950/60 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-neon-mint" />
                  <span>{t('radar_btn_test')}</span>
                </button>

                <button
                  onClick={handleStartAiInterview}
                  className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-purple-900/80 hover:bg-purple-800/90 border border-purple-400 text-white font-bold text-xs sm:text-sm transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 justify-center shadow-lg shadow-purple-950/60 cursor-pointer"
                >
                  <BrainCircuit className="w-4 h-4 text-neon-mint" />
                  <span>{t('radar_btn_interview')}</span>
                </button>
              </div>
            </div>

            {/* 5 Career Class Badges Showcase with 3D TiltCards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6 relative z-10">
              
              {/* Class 1: Frontend */}
              <TiltCard 
                maxTilt={12}
                scale={1.04}
                onClick={handleStart}
                onMouseEnter={() => { setHoveredCard(1); soundFX.playClick(); }}
                onMouseLeave={() => setHoveredCard(null)}
                className="group cursor-pointer p-4 rounded-2xl bg-slate-950/85 border border-purple-500/30 hover:border-purple-400 hover:bg-purple-950/40 transition-all duration-300 shadow-xl shadow-purple-950/40 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-115 transition-transform duration-300">
                  <Code className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-100 text-sm group-hover:text-purple-300 transition-colors">
                  {t('class_frontend_title')}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {t('class_frontend_desc')}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-purple-300 font-medium">
                  <span>{t('class_frontend_tech')}</span>
                  <span className="text-neon-mint font-bold">★ 98% Match</span>
                </div>
              </TiltCard>

              {/* Class 2: Backend */}
              <TiltCard 
                maxTilt={12}
                scale={1.04}
                onClick={handleStart}
                onMouseEnter={() => { setHoveredCard(2); soundFX.playClick(); }}
                onMouseLeave={() => setHoveredCard(null)}
                className="group cursor-pointer p-4 rounded-2xl bg-slate-950/85 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-950/40 transition-all duration-300 shadow-xl shadow-emerald-950/40 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-neon-mint mb-3 group-hover:scale-115 transition-transform duration-300">
                  <Terminal className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-100 text-sm group-hover:text-emerald-300 transition-colors">
                  {t('class_backend_title')}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {t('class_backend_desc')}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-emerald-300 font-medium">
                  <span>{t('class_backend_tech')}</span>
                  <span className="text-neon-mint font-bold">★ 96% Match</span>
                </div>
              </TiltCard>

              {/* Class 3: Dados & IA */}
              <TiltCard 
                maxTilt={12}
                scale={1.04}
                onClick={handleStart}
                onMouseEnter={() => { setHoveredCard(3); soundFX.playClick(); }}
                onMouseLeave={() => setHoveredCard(null)}
                className="group cursor-pointer p-4 rounded-2xl bg-slate-950/85 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/40 transition-all duration-300 shadow-xl shadow-cyan-950/40 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-neon-cyan mb-3 group-hover:scale-115 transition-transform duration-300">
                  <Bot className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-100 text-sm group-hover:text-cyan-300 transition-colors">
                  {t('class_data_title')}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {t('class_data_desc')}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-cyan-300 font-medium">
                  <span>{t('class_data_tech')}</span>
                  <span className="text-neon-mint font-bold">★ 97% Match</span>
                </div>
              </TiltCard>

              {/* Class 4: Cibersegurança */}
              <TiltCard 
                maxTilt={12}
                scale={1.04}
                onClick={handleStart}
                onMouseEnter={() => { setHoveredCard(4); soundFX.playClick(); }}
                onMouseLeave={() => setHoveredCard(null)}
                className="group cursor-pointer p-4 rounded-2xl bg-slate-950/85 border border-red-500/30 hover:border-red-400 hover:bg-red-950/40 transition-all duration-300 shadow-xl shadow-red-950/40 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400 mb-3 group-hover:scale-115 transition-transform duration-300">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-100 text-sm group-hover:text-red-300 transition-colors">
                  {t('class_sec_title')}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {t('class_sec_desc')}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-red-300 font-medium">
                  <span>{t('class_sec_tech')}</span>
                  <span className="text-neon-mint font-bold">★ 95% Match</span>
                </div>
              </TiltCard>

              {/* Class 5: UI/UX Design */}
              <TiltCard 
                maxTilt={12}
                scale={1.04}
                onClick={handleStart}
                onMouseEnter={() => { setHoveredCard(5); soundFX.playClick(); }}
                onMouseLeave={() => setHoveredCard(null)}
                className="group cursor-pointer p-4 rounded-2xl bg-slate-950/85 border border-pink-500/30 hover:border-pink-400 hover:bg-pink-950/40 transition-all duration-300 shadow-xl shadow-pink-950/40 text-left sm:col-span-2 lg:col-span-1"
              >
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 mb-3 group-hover:scale-115 transition-transform duration-300">
                  <Palette className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-100 text-sm group-hover:text-pink-300 transition-colors">
                  {t('class_ux_title')}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {t('class_ux_desc')}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-pink-300 font-medium">
                  <span>{t('class_ux_tech')}</span>
                  <span className="text-neon-mint font-bold">★ 99% Match</span>
                </div>
              </TiltCard>

            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
