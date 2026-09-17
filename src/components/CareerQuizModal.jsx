import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Sparkles, 
  ArrowLeft, 
  Palette,
  Puzzle,
  BarChart3,
  Eye,
  Server,
  Search,
  Zap,
  GraduationCap,
  Smartphone,
  ChevronRight,
  Compass,
  Loader2,
  Check,
  AlertCircle
} from 'lucide-react';
import { quizQuestions, careerProfiles } from '../data/quizData';
import { soundFX } from '../utils/soundEffects';
import AkinatorTechResult from './AkinatorTechResult';

// Map icon strings to Lucide components
const iconMap = {
  Palette,
  Puzzle,
  BarChart3,
  Eye,
  Server,
  Search,
  Zap,
  GraduationCap,
  Smartphone,
  Sparkles
};

export default function CareerQuizModal({ isOpen, onClose }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedInCurrentStep, setSelectedInCurrentStep] = useState(null);
  
  // UX Transition & Loading states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingStage, setAnalyzingStage] = useState(0);
  const [topCareersResult, setTopCareersResult] = useState(null);

  // Toast error notification state
  const [toastMessage, setToastMessage] = useState(null);

  // Reset when opening modal
  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(0);
      setSelectedAnswers({});
      setSelectedInCurrentStep(null);
      setIsAnalyzing(false);
      setAnalyzingStage(0);
      setTopCareersResult(null);
      setIsTransitioning(false);
      setToastMessage(null);
    }
  }, [isOpen]);

  // Handle analyzing loading progression messages
  useEffect(() => {
    let interval;
    if (isAnalyzing) {
      interval = setInterval(() => {
        setAnalyzingStage((prev) => (prev + 1) % 3);
      }, 650);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  // Helper for triggering toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  if (!isOpen) return null;

  const totalSteps = quizQuestions.length;
  const currentQuestion = quizQuestions[currentStepIndex];
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  // Business Logic: calculate majority and ranked Top 3 careers
  const calculateTop3Profiles = (answers) => {
    let countA = 0;
    let countB = 0;
    let countC = 0;

    Object.values(answers).forEach((ans) => {
      if (ans.letter === 'A') countA++;
      else if (ans.letter === 'B') countB++;
      else if (ans.letter === 'C') countC++;
    });

    const ranked = [
      {
        id: "dev-frontend",
        titulo: "Desenvolvedor Front-end & UI/UX",
        categoria: "Criativo e Visual",
        descricao: "Transforma ideias e designs em interfaces interativas e visuais elegantes para a web usando React, JavaScript, HTML e CSS moderno.",
        salario: "R$ 4.500 a R$ 14.000+",
        matchPercentage: `${Math.min(99, 85 + countA * 5)}%`,
        score: countA * 3 + 1,
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
        matchPercentage: `${Math.min(99, 83 + countB * 5)}%`,
        score: countB * 3 + 0.5,
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
        matchPercentage: `${Math.min(99, 81 + countC * 5)}%`,
        score: countC * 3,
        skills: ["SQL Avançado", "Power BI / Dashboards", "Python (Pandas)", "Estatística"],
        icon: "Bot",
        timelineKey: "data"
      }
    ];

    ranked.sort((a, b) => b.score - a.score);
    return ranked;
  };

  // Handle clicking an option card
  const handleOptionClick = (option) => {
    if (isTransitioning || isAnalyzing) return;

    soundFX.playSelect();
    setSelectedInCurrentStep(option.id);
    const updatedAnswers = {
      ...selectedAnswers,
      [currentStepIndex]: option
    };
    setSelectedAnswers(updatedAnswers);
    setIsTransitioning(true);

    if (currentStepIndex < totalSteps - 1) {
      // Advance to next question after smooth feedback delay
      setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
        setSelectedInCurrentStep(null);
        setIsTransitioning(false);
      }, 350);
    } else {
      // Last question completed -> trigger 2-second loading transition
      setTimeout(() => {
        setIsTransitioning(false);
        setIsAnalyzing(true);

        // 2-second timeout to simulate deep profile analysis
        setTimeout(() => {
          const top3 = calculateTop3Profiles(updatedAnswers);
          setIsAnalyzing(false);
          setTopCareersResult(top3);
          soundFX.playVictory();

          // Trigger celebratory confetti explosion
          try {
            confetti({
              particleCount: 110,
              spread: 75,
              origin: { y: 0.6 },
              colors: ['#10B981', '#A855F7', '#38BDF8', '#F472B6', '#FBBF24']
            });
          } catch (e) {
            console.log('Confetti triggered');
          }
        }, 2000);
      }, 350);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0 && !isTransitioning && !isAnalyzing) {
      const prevStep = currentStepIndex - 1;
      setCurrentStepIndex(prevStep);
      setSelectedInCurrentStep(selectedAnswers[prevStep]?.id || null);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentStepIndex(0);
    setSelectedAnswers({});
    setSelectedInCurrentStep(null);
    setIsAnalyzing(false);
    setAnalyzingStage(0);
    setTopCareersResult(null);
    setIsTransitioning(false);
  };

  const analyzingMessages = [
    "Cruzando suas preferências com o Akinator Tech...",
    "Calculando afinidades de raciocínio e estilo de trabalho...",
    "Mapeando suas 3 melhores opções de carreira no mercado..."
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] px-4 py-2.5 rounded-2xl bg-amber-950/90 border border-amber-500/60 text-amber-200 text-xs sm:text-sm font-semibold shadow-2xl backdrop-blur-xl flex items-center gap-2 animate-in slide-in-from-top-4 fade-in duration-200">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900/95 border border-purple-500/40 shadow-2xl shadow-purple-950/80 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Gradient Highlight Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-mint" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 pt-5 pb-3 border-b border-slate-800 bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neon-purple/20 flex items-center justify-center text-neon-purple-light border border-neon-purple/30 flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base sm:text-lg font-display">
                {topCareersResult ? "Akinator Tech • Sua Carreira Revelada" : isAnalyzing ? "NorTech • Analisando Perfil" : "NorTech • Bússola de Carreira"}
              </h3>
              <p className="text-xs text-slate-400">
                {topCareersResult 
                  ? "Veja a sugestão e explore as alternativas" 
                  : isAnalyzing 
                    ? "Aguarde enquanto cruzamos os dados" 
                    : "Descubra qual área combina mais com você"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Fechar quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Progress Bar (Active only during the 3 questions) */}
        {!topCareersResult && !isAnalyzing && (
          <div className="px-5 sm:px-6 pt-4 pb-2 bg-slate-900/60 border-b border-slate-800/60">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
              <span className="flex items-center gap-1.5 text-neon-mint font-semibold">
                <span className="w-2 h-2 rounded-full bg-neon-mint animate-pulse" />
                Passo {currentStepIndex + 1} de {totalSteps}
              </span>
              <span className="text-slate-400">{progressPercent}% Concluído</span>
            </div>

            {/* Smooth animated progress bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-mint rounded-full transition-all duration-500 ease-out shadow-lg shadow-emerald-500/20"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Main Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1">
          
          {/* STATE 1: LOADING / TRANSITION SCREEN (2 Seconds) */}
          {isAnalyzing ? (
            <div className="py-12 px-4 text-center space-y-8 animate-in fade-in zoom-in-95 duration-300">
              
              {/* Pulsing Radar & Spinner */}
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-neon-purple/20 animate-ping opacity-60" />
                <div className="absolute -inset-3 rounded-full bg-neon-mint/10 blur-xl animate-pulse" />
                
                <div className="w-full h-full rounded-full border-2 border-dashed border-neon-purple/50 animate-spin" style={{ animationDuration: '4s' }} />
                
                <div className="absolute w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-neon-mint/50 flex items-center justify-center shadow-lg shadow-emerald-950/60">
                  <Compass className="w-8 h-8 text-neon-mint animate-pulse" />
                </div>
              </div>

              {/* Transition Text & Status Message */}
              <div className="space-y-3 max-w-md mx-auto">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-display tracking-tight leading-snug">
                  O Akinator Tech está adivinhando sua vocação...
                </h3>
                
                <p className="text-sm text-neon-mint font-medium min-h-[20px] transition-all duration-300 flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-neon-mint" />
                  <span>{analyzingMessages[analyzingStage]}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-400">
                <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800">
                  ✓ 3 Respostas Coletadas
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-neon-purple-light">
                  ✦ Calculando Top 3 Alternativas
                </span>
              </div>

            </div>
          ) : !topCareersResult ? (
            
            /* STATE 2: ACTIVE QUESTION VIEW */
            <div 
              key={currentQuestion.id}
              className={`space-y-6 transition-all duration-300 ease-in-out ${
                isTransitioning ? 'opacity-30 scale-[0.99] translate-y-1' : 'opacity-100 scale-100 translate-y-0'
              }`}
            >
              
              {/* Question Header */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neon-purple/20 text-neon-purple-light border border-neon-purple/30 mb-2.5">
                  <span>{currentQuestion.badge}</span>
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-100 font-display leading-tight">
                  {currentQuestion.title}
                </h2>
                
                <p className="text-sm text-slate-400 mt-1">
                  {currentQuestion.subtitle}
                </p>
              </div>

              {/* Clickable Option Cards with Hover Lift */}
              <div className="grid grid-cols-1 gap-3.5">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedInCurrentStep === opt.id || selectedAnswers[currentStepIndex]?.id === opt.id;
                  const IconComp = iconMap[opt.icon] || Sparkles;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleOptionClick(opt)}
                      className={`group cursor-pointer p-4 sm:p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 flex items-start gap-4 select-none relative overflow-hidden ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-900/40 to-emerald-950/40 border-neon-mint shadow-lg shadow-emerald-950/50 scale-[1.01]'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 hover:shadow-lg hover:shadow-purple-950/20'
                      }`}
                    >
                      {/* Left Letter Badge (A, B, C) */}
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all duration-300 ${
                        isSelected 
                          ? 'bg-neon-mint text-slate-950 shadow-md shadow-emerald-500/30' 
                          : 'bg-slate-900 text-slate-400 group-hover:text-white border border-slate-800 group-hover:border-slate-700'
                      }`}>
                        {opt.letter}
                      </div>

                      {/* Icon & Details */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <IconComp className={`w-4 h-4 transition-colors ${
                            isSelected ? 'text-neon-mint' : 'text-neon-purple-light group-hover:text-neon-mint'
                          }`} />
                          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                            {opt.category}
                          </span>
                        </div>

                        <h4 className={`text-base sm:text-lg font-semibold leading-snug transition-colors ${
                          isSelected ? 'text-white' : 'text-slate-100 group-hover:text-white'
                        }`}>
                          {opt.label}
                        </h4>

                        <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>

                      {/* Selection Checkmark */}
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
                        isSelected 
                          ? 'border-neon-mint bg-neon-mint text-slate-950 shadow-sm' 
                          : 'border-slate-700 group-hover:border-slate-500'
                      }`}>
                        {isSelected ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Step Navigation Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStepIndex === 0 || isTransitioning}
                  className={`px-4 py-2.5 rounded-xl border text-sm font-medium flex items-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer ${
                    currentStepIndex === 0
                      ? 'opacity-0 pointer-events-none'
                      : 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>

                <p className="text-xs text-slate-400 italic text-center sm:text-right">
                  *Clique no card para avançar automaticamente
                </p>
              </div>

            </div>
          ) : (
            
            /* STATE 3: AKINATOR TECH RESULT COMPONENT */
            <div className="py-2 animate-in fade-in zoom-in-95 duration-300">
              <AkinatorTechResult
                topCareers={topCareersResult}
                onRestart={handleRestartQuiz}
                onExploreCatalog={() => {
                  onClose();
                  const catEl = document.getElementById('catalogo-carreiras');
                  if (catEl) catEl.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
