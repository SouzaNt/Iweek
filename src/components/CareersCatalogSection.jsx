import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  Sparkles, 
  Compass, 
  Code, 
  Terminal, 
  Bot, 
  Shield, 
  Target, 
  Palette, 
  Globe, 
  FileText, 
  Box, 
  Layers, 
  Smartphone, 
  Cpu, 
  Gamepad2, 
  BarChart3, 
  LineChart, 
  Database, 
  TrendingUp, 
  Headphones, 
  Network, 
  Cloud, 
  GitBranch, 
  Crosshair, 
  ShieldAlert, 
  Briefcase, 
  CheckSquare, 
  Users, 
  Bug, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  X,
  Layout,
  Rocket
} from 'lucide-react';
import { allCareersCatalog, techCategories } from '../data/careersCatalog';
import { soundFX } from '../utils/soundEffects';
import TiltCard from './TiltCard';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  Compass,
  Palette,
  Code,
  Terminal,
  Bot,
  Shield,
  Target,
  Globe,
  FileText,
  Box,
  Layers,
  Smartphone,
  Cpu,
  Gamepad2,
  BarChart3,
  LineChart,
  Database,
  TrendingUp,
  Headphones,
  Network,
  Cloud,
  GitBranch,
  Crosshair,
  ShieldAlert,
  Briefcase,
  CheckSquare,
  Users,
  Bug,
  Award,
  Layout,
  Rocket
};

export default function CareersCatalogSection({ onStartQuiz }) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredCareers = useMemo(() => {
    return allCareersCatalog.filter((career) => {
      const matchesCategory = 
        selectedCategory === 'all' || career.categoria === selectedCategory;
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        career.titulo.toLowerCase().includes(query) ||
        career.categoria.toLowerCase().includes(query) ||
        career.descricao.toLowerCase().includes(query) ||
        career.skills.some(s => s.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (catId) => {
    soundFX.playClick();
    setSelectedCategory(catId);
  };

  const handleOpenDetail = (career) => {
    soundFX.playClick();
    setSelectedCareer(career);
  };

  const handleCloseDetail = () => {
    soundFX.playClick();
    setSelectedCareer(null);
  };

  const handleStartFromCareer = () => {
    soundFX.playWhoosh();
    setSelectedCareer(null);
    onStartQuiz();
  };

  return (
    <section 
      id="catalogo-carreiras" 
      ref={sectionRef}
      className="py-24 bg-[#06080f] border-t border-purple-900/30 relative overflow-hidden"
    >
      {/* Background Ambient Zero-G Glow Lights */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-12 space-y-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/40 text-xs font-semibold text-neon-mint shadow-inner">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '12s' }} />
            <span>{t('catalog_badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 font-display tracking-tight">
            {t('catalog_title')}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('catalog_desc')}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className={`max-w-4xl mx-auto mb-10 space-y-5 transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          {/* Live Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('catalog_search_placeholder')}
              className="w-full pl-12 pr-10 py-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 focus:border-neon-mint focus:ring-2 focus:ring-neon-mint/20 text-slate-100 placeholder-slate-500 text-sm md:text-base outline-none transition-all shadow-xl backdrop-blur-xl"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {techCategories.map((cat) => {
              const Icon = iconMap[cat.icon] || Compass;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${
                    isSelected 
                      ? 'bg-purple-600 text-white border border-purple-400 shadow-lg shadow-purple-950/60 scale-105' 
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : cat.color}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Result Counter */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span>
              {t('catalog_showing')} <strong className="text-purple-300 font-bold">{filteredCareers.length}</strong> {t('catalog_of_33')}
            </span>
            {searchQuery && (
              <span>{t('catalog_active_filter')} <em className="text-neon-mint font-semibold">"{searchQuery}"</em></span>
            )}
          </div>

        </div>

        {/* 33 Careers Grid with 3D Tilt Cards */}
        {filteredCareers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.map((career) => {
              const Icon = iconMap[career.icon] || Code;

              return (
                <TiltCard
                  key={career.id}
                  maxTilt={8}
                  scale={1.02}
                  onClick={() => handleOpenDetail(career)}
                  className={`cursor-pointer rounded-3xl p-6 bg-slate-900/85 border ${career.borderColor} backdrop-blur-xl group shadow-xl shadow-purple-950/20 hover:shadow-purple-950/50 flex flex-col justify-between transition-all duration-300 text-left`}
                >
                  <div>
                    {/* Header: Icon & Category Tag */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${career.colorGradient} border border-white/10 flex items-center justify-center ${career.accentColor} group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <div className="text-right">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          {career.categoria}
                        </span>
                        <div className="text-[11px] font-bold text-neon-mint">
                          {career.salario}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-100 font-display group-hover:text-purple-300 transition-colors mb-2">
                      {career.titulo}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-4 line-clamp-3">
                      {career.descricao}
                    </p>
                  </div>

                  {/* Skills tags & Footer */}
                  <div className="pt-4 border-t border-slate-800/80">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {career.skills.slice(0, 3).map((skill, sIdx) => (
                        <span 
                          key={sIdx}
                          className="px-2 py-0.5 rounded-lg bg-slate-950/90 text-slate-300 border border-slate-800/80 text-[10px] font-medium group-hover:border-purple-500/30 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                      {career.skills.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-lg bg-slate-950/50 text-slate-500 text-[10px]">
                          +{career.skills.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs font-semibold text-purple-300 group-hover:text-neon-mint transition-colors">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{t('catalog_view_roadmap')}</span>
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>

                </TiltCard>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-3xl bg-slate-900/50 border border-slate-800">
            <Compass className="w-12 h-12 text-slate-600 mx-auto mb-3 animate-pulse" />
            <h3 className="text-lg font-bold text-slate-200 mb-1">{t('catalog_no_results')}</h3>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-bold transition-all"
            >
              {t('catalog_clear_filters')}
            </button>
          </div>
        )}

      </div>

      {/* Modal */}
      {selectedCareer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 bg-[#080b16] border border-purple-500/50 shadow-[0_0_60px_rgba(168,85,247,0.3)] animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseDetail}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-purple-500/50 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedCareer.colorGradient} border border-purple-500/40 flex items-center justify-center ${selectedCareer.accentColor} shadow-xl flex-shrink-0`}>
                {React.createElement(iconMap[selectedCareer.icon] || Code, { className: 'w-7 h-7' })}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    {selectedCareer.categoria}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    {selectedCareer.nivel}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-display">
                  {selectedCareer.titulo}
                </h3>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-purple-500/20 mb-6">
              <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-neon-mint" />
                {t('catalog_modal_what_does')}
              </h4>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                {selectedCareer.descricao}
              </p>
            </div>

            {/* Stats & Salary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">{t('catalog_modal_salary')}</span>
                <span className="text-lg sm:text-xl font-bold text-neon-mint font-display">
                  {selectedCareer.salario}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">{t('catalog_modal_highlight')}</span>
                <span className="text-base font-bold text-purple-300">
                  {selectedCareer.badge}
                </span>
              </div>
            </div>

            {/* Skills & Knowledge */}
            <div className="mb-8">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                {t('catalog_modal_skills')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedCareer.skills.map((skill, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-purple-500/30 text-xs text-slate-200 font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-neon-mint" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleStartFromCareer}
                className="w-full sm:flex-1 py-4 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-neon-mint text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <Rocket className="w-4 h-4 text-slate-950" />
                <span>{t('catalog_modal_btn_test')}</span>
              </button>

              <button
                onClick={handleCloseDetail}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-semibold text-sm transition-all cursor-pointer"
              >
                {t('catalog_modal_btn_close')}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
