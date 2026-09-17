import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  BrainCircuit,
  RotateCcw
} from 'lucide-react';
import { 
  interviewQuestions, 
  analyzeInterviewResponses, 
  getReactiveFeedback,
  generateInterviewPrompt 
} from '../data/interviewData';
import { soundFX } from '../utils/soundEffects';
import AkinatorTechResult from './AkinatorTechResult';
import { useLanguage } from '../context/LanguageContext';

export default function AIInterviewModal({ isOpen, onClose }) {
  const { lang, t } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messages, setMessages] = useState([]); // List of messages: { id, sender: 'ai'|'user', text, isJson }
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false); // 3 animated dots indicator
  const [userResponses, setUserResponses] = useState([]);
  
  // Transition & Result States
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [topMatchesResult, setTopMatchesResult] = useState(null);
  const [showAkinatorResult, setShowAkinatorResult] = useState(false);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const totalQuestions = interviewQuestions.length;
  const currentQ = interviewQuestions[currentQuestionIndex];
  const progressPercent = Math.min(100, Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100));

  // Auto scroll chat to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiTyping, isAiThinking]);

  // Reset or initialize on modal open
  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0);
      setMessages([]);
      setInputText('');
      setUserResponses([]);
      setIsAiTyping(false);
      setIsAiThinking(false);
      setIsFadingOut(false);
      setTopMatchesResult(null);
      setShowAkinatorResult(false);
      
      // Start question 1
      startAiConversation();
    }
  }, [isOpen]);

  // Step 1: Start conversation
  const startAiConversation = () => {
    setIsAiThinking(true);
    setTimeout(() => {
      setIsAiThinking(false);
      const firstQ = interviewQuestions[0];
      const initialText = `${firstQ.aiGreeting}\n\n👉 "${firstQ.question}"`;
      
      deliverAiMessage(initialText, 0);
    }, 600);
  };

  // Helper: Delivers an AI message with a sleek typing effect
  const deliverAiMessage = (fullText, qIndex = null) => {
    setIsAiTyping(true);
    let charIdx = 0;
    const msgId = Date.now();

    // Create placeholder message
    setMessages((prev) => [
      ...prev,
      { id: msgId, sender: 'ai', text: '', isTyping: true }
    ]);

    const interval = setInterval(() => {
      charIdx += 2;
      const currentSlice = fullText.slice(0, charIdx);
      if (charIdx % 4 === 0) soundFX.playClick();

      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, text: currentSlice } : m))
      );

      if (charIdx >= fullText.length) {
        clearInterval(interval);
        setIsAiTyping(false);
        setMessages((prev) =>
          prev.map((m) => (m.id === msgId ? { ...m, text: fullText, isTyping: false } : m))
        );

        // Check if this AI response contains the termination JSON format {"top_matches":
        checkAndHandleJsonTermination(fullText);

        setTimeout(() => inputRef.current?.focus(), 150);
      }
    }, 20);
  };

  // 4. Lógica de transição: Se a resposta da IA contiver '{"top_matches":', aplica fade-out e renderiza Akinator Tech
  const checkAndHandleJsonTermination = (aiText) => {
    if (typeof aiText === 'string' && aiText.includes('{"top_matches":')) {
      // Trigger fade out animation
      setTimeout(() => {
        setIsFadingOut(true);

        setTimeout(() => {
          // Parse JSON or evaluate responses
          try {
            const jsonStartIndex = aiText.indexOf('{"top_matches":');
            const jsonEndIndex = aiText.lastIndexOf('}') + 1;
            const jsonSubstring = aiText.slice(jsonStartIndex, jsonEndIndex);
            const parsed = JSON.parse(jsonSubstring);
            
            console.log("Extracted top_matches JSON from AI response:", parsed);
          } catch (e) {
            console.log("Direct JSON evaluation active");
          }

          const evaluation = analyzeInterviewResponses(userResponses);
          setTopMatchesResult(evaluation.topCareers);
          setShowAkinatorResult(true);
          setIsFadingOut(false);
          soundFX.playVictory();

          try {
            confetti({
              particleCount: 130,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#10B981', '#A855F7', '#38BDF8', '#F472B6', '#FBBF24']
            });
          } catch (err) {}
        }, 500);
      }, 900);
    }
  };

  // Submit User Message
  const handleSendMessage = (answerText) => {
    const finalAnswer = (answerText || inputText).trim();
    if (!finalAnswer || isAiTyping || isAiThinking) return;

    soundFX.playWhoosh();

    // 1. Append user message (Aligned to the Right)
    const newResponses = [
      ...userResponses,
      { questionId: currentQ.id, question: currentQ.question, answer: finalAnswer }
    ];
    setUserResponses(newResponses);

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', text: finalAnswer }
    ]);
    setInputText('');

    // 2. AI Processing state (3 animated bouncing dots indicator)
    setIsAiThinking(true);

    // 3. Evaluate if we proceed to next question or conclude with {"top_matches":
    const nextIndex = currentQuestionIndex + 1;

    setTimeout(() => {
      setIsAiThinking(false);

      if (nextIndex < totalQuestions) {
        setCurrentQuestionIndex(nextIndex);
        const nextQ = interviewQuestions[nextIndex];
        const feedback = getReactiveFeedback(finalAnswer, nextIndex);
        const fullMessage = `${feedback}\n\n${nextQ.aiGreeting}\n\n👉 "${nextQ.question}"`;

        deliverAiMessage(fullMessage, nextIndex);
      } else {
        // FINAL STEP: The AI finishes analyzing and emits the JSON object
        const evaluation = analyzeInterviewResponses(newResponses);
        const rawJsonString = JSON.stringify(evaluation.rawJsonOutput, null, 2);
        
        const finalAiResponse = `Excelente! Já tenho todas as pistas necessárias para mapear sua vocação com máxima precisão. Analisando seu perfil...\n\n${rawJsonString}`;
        
        deliverAiMessage(finalAiResponse, null);
      }
    }, 1200);
  };

  const handleRestart = () => {
    soundFX.playClick();
    setCurrentQuestionIndex(0);
    setMessages([]);
    setInputText('');
    setUserResponses([]);
    setIsAiTyping(false);
    setIsAiThinking(false);
    setIsFadingOut(false);
    setTopMatchesResult(null);
    setShowAkinatorResult(false);
    startAiConversation();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#080b16] border border-purple-500/40 shadow-2xl shadow-purple-950/90 overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Top Gradient Shimmer Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 via-neon-mint to-cyan-400" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-purple-900/30 bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-md">
              <BrainCircuit className="w-5 h-5 text-neon-mint animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-100 text-base sm:text-lg font-display">
                  {showAkinatorResult ? "Akinator Tech • Sua Carreira Revelada" : "NorTech • Chat IA Interativo"}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-neon-mint/20 text-neon-mint border border-neon-mint/30 text-[10px] font-bold animate-pulse">
                  AI LIVE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {showAkinatorResult ? "Explore a sua vocação e alternativas recomendadas" : "Diagnóstico vocacional inteligente e descontraído"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-purple-500/40 transition-all cursor-pointer"
            aria-label="Fechar Chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Progress Bar (Active during chat) */}
        {!showAkinatorResult && (
          <div className="px-5 sm:px-6 pt-3 pb-2.5 bg-slate-950/80 border-b border-purple-900/20">
            <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
              <span className="text-neon-mint flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-neon-mint animate-ping" />
                Pergunta {Math.min(totalQuestions, currentQuestionIndex + 1)} de {totalQuestions}
              </span>
              <span className="text-slate-400">{progressPercent}% Concluído</span>
            </div>

            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-purple-900/30">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-neon-mint rounded-full transition-all duration-500 ease-out shadow-md"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Main Area: Chat or Akinator Tech Screen */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-[340px]">
          
          {showAkinatorResult ? (
            
            /* RESULT: AKINATOR TECH SCREEN */
            <div className="py-2 animate-in fade-in zoom-in-95 duration-500">
              <AkinatorTechResult
                topCareers={topMatchesResult}
                onRestart={handleRestart}
                onExploreCatalog={() => {
                  onClose();
                  const catEl = document.getElementById('catalogo-carreiras');
                  if (catEl) catEl.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </div>

          ) : (
            
            /* 1. ÁREA PRINCIPAL DE MENSAGENS COM BALÕES DE TEXTO ALINHADOS */
            <div className={`space-y-4 transition-all duration-500 ${isFadingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                      isUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {/* AI Avatar (Left side) */}
                    {!isUser && (
                      <div className="w-9 h-9 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 flex-shrink-0 shadow-md">
                        <Bot className="w-4 h-4 text-purple-300" />
                      </div>
                    )}

                    {/* Chat Bubble (Neon theme) */}
                    <div
                      className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-sm leading-relaxed ${
                        isUser
                          ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 text-white rounded-tr-none shadow-lg shadow-purple-950/60 font-medium'
                          : 'bg-slate-900/95 text-slate-200 border border-purple-500/35 rounded-tl-none shadow-md shadow-purple-950/30'
                      }`}
                    >
                      {msg.text.split('\n\n').map((para, pIdx) => {
                        // If paragraph contains JSON block, format as a code box
                        if (para.includes('{"top_matches":')) {
                          return (
                            <div key={pIdx} className="mt-2 p-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-neon-mint font-mono text-xs shadow-inner">
                              <span className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Resultado JSON IA:</span>
                              <pre className="whitespace-pre-wrap">{para}</pre>
                            </div>
                          );
                        }

                        return (
                          <p key={pIdx} className={pIdx > 0 ? 'mt-2 font-semibold text-slate-100' : 'text-slate-200'}>
                            {para}
                          </p>
                        );
                      })}

                      {msg.isTyping && (
                        <span className="inline-block w-2 h-4 bg-neon-mint ml-1 animate-pulse align-middle" />
                      )}
                    </div>

                    {/* User Avatar (Right side) */}
                    {isUser && (
                      <div className="w-9 h-9 rounded-2xl bg-neon-mint/20 border border-neon-mint/40 flex items-center justify-center text-neon-mint flex-shrink-0 shadow-md">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* 3. INDICADOR DE DIGITAÇÃO: 3 PONTINHOS ANIMADOS */}
              {isAiThinking && (
                <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="w-9 h-9 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 flex-shrink-0 shadow-md">
                    <Bot className="w-4 h-4 text-purple-300 animate-pulse" />
                  </div>
                  
                  <div className="rounded-2xl p-4 bg-slate-900/90 border border-purple-500/40 rounded-tl-none shadow-md flex items-center gap-1.5 h-12">
                    <span className="w-2 h-2 rounded-full bg-neon-mint animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          )}

        </div>

        {/* 2. CAMPO DE INPUT DE TEXTO FIXO NO RODAPÉ COM BOTÃO DE ENVIAR (SETA DE AVIÃO) */}
        {!showAkinatorResult && (
          <div className="p-4 sm:p-5 border-t border-purple-900/30 bg-slate-950/95 space-y-3">
            
            {/* Quick response suggestions */}
            {currentQ && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  💡 Sugestões rápidas (ou digite livremente):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentQ.quickTags.map((tag, tIdx) => (
                    <button
                      key={tIdx}
                      onClick={() => handleSendMessage(tag)}
                      disabled={isAiTyping || isAiThinking}
                      className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-purple-950/50 text-slate-300 hover:text-purple-200 border border-purple-500/30 hover:border-purple-400 text-xs text-left transition-all duration-200 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 cursor-pointer shadow-sm"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input bar */}
            <div className="flex items-center gap-2.5 pt-1">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={isAiTyping || isAiThinking}
                  placeholder={currentQ ? currentQ.placeholder : "Digite sua resposta..."}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-900/90 border border-purple-500/30 focus:border-neon-mint focus:ring-2 focus:ring-neon-mint/20 text-slate-100 placeholder-slate-500 text-sm outline-none transition-all shadow-inner disabled:opacity-50"
                />
              </div>

              {/* Botão de Enviar (Ícone de seta de avião de papel) */}
              <button
                onClick={() => handleSendMessage()}
                disabled={isAiTyping || isAiThinking || !inputText.trim()}
                id="btn-send-ai-message"
                className="p-3.5 sm:px-5 sm:py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-neon-mint hover:opacity-95 text-slate-950 font-bold shadow-lg shadow-emerald-950/60 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer flex items-center justify-center gap-2 flex-shrink-0"
                aria-label="Enviar mensagem"
                title="Enviar mensagem"
              >
                <Send className="w-5 h-5 fill-slate-950 text-slate-950 transform rotate-0" />
                <span className="hidden sm:inline text-xs font-black uppercase tracking-wider">Enviar</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 text-right">
              Pressione <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-mono">Enter ↵</kbd> para enviar
            </p>

          </div>
        )}

      </div>
    </div>
  );
}
