import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  BrainCircuit,
  ShieldCheck,
  Loader2,
  BellRing,
  HelpCircle,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { soundFX } from '../utils/soundEffects';
import NorTechLogo from './NorTechLogo';
import GoogleOAuthModal from './GoogleOAuthModal';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    loginWithGoogle, 
    loginWithEmail, 
    registerWithEmail, 
    loginWithPhone,
    getAllUsers 
  } = useAuth();
  
  const { lang, t } = useLanguage();

  const [authMode, setAuthMode] = useState('signup'); // 'login' | 'signup'
  const [authMethod, setAuthMethod] = useState('email'); // 'email' | 'phone'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [activeSmsCode, setActiveSmsCode] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  if (!isAuthModalOpen) return null;

  // Handles Google Account Selection from Google OAuth Modal
  const handleGoogleAccountSelected = (googleProfile) => {
    setIsGoogleModalOpen(false);
    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      const result = loginWithGoogle(googleProfile);
      setIsLoading(false);
      if (result.success) {
        soundFX.playVictory();
      } else {
        setErrorMsg(result.message || 'Erro ao autenticar com o Google.');
      }
    }, 400);
  };

  // Handles Email Register or Login
  const handleEmailAuth = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email.trim() || !password) {
      setErrorMsg('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (authMode === 'signup' && !name.trim()) {
      setErrorMsg('Por favor, informe seu nome para personalizarmos seu diagnóstico com IA.');
      return;
    }

    soundFX.playClick();
    setIsLoading(true);

    setTimeout(() => {
      if (authMode === 'signup') {
        // Register (Cadastro)
        const result = registerWithEmail({ name, email, password });
        setIsLoading(false);
        if (result.success) {
          soundFX.playVictory();
        } else {
          setErrorMsg(result.message);
        }
      } else {
        // Login
        const result = loginWithEmail({ email, password });
        setIsLoading(false);
        if (result.success) {
          soundFX.playVictory();
        } else {
          setErrorMsg(result.message);
        }
      }
    }, 600);
  };

  // Handles Phone SMS Code Request
  const handleSendPhoneCode = () => {
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Digite um número de telefone celular válido com DDD.');
      return;
    }
    soundFX.playClick();
    setErrorMsg('');
    
    // Generate a random 6-digit code
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setActiveSmsCode(generated);
    setPhoneCode(generated); // pre-populate for frictionless UX while displaying verification
    setSuccessMsg(`📱 SMS de Verificação Enviado! Código gerado: ${generated}`);
  };

  // Handles Phone Form Submission
  const handlePhoneAuth = (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Digite um número de telefone celular válido.');
      return;
    }

    if (!phoneCode || phoneCode.length !== 6) {
      setErrorMsg('Digite o código de verificação de 6 dígitos.');
      return;
    }

    if (activeSmsCode && phoneCode !== activeSmsCode) {
      setErrorMsg('Código de SMS incorreto. Verifique o código recebido.');
      return;
    }

    soundFX.playClick();
    setIsLoading(true);

    setTimeout(() => {
      const result = loginWithPhone({
        phone,
        code: phoneCode,
        isSignUp: authMode === 'signup',
        name: name || 'Explorador Tech'
      });
      setIsLoading(false);
      if (result.success) {
        soundFX.playVictory();
      } else {
        setErrorMsg(result.message);
      }
    }, 600);
  };

  // Helper to fill demo account
  const fillDemoAccount = (demoEmail, demoPassword) => {
    soundFX.playClick();
    setAuthMode('login');
    setAuthMethod('email');
    setEmail(demoEmail);
    setPassword(demoPassword);
    setErrorMsg('');
    setShowDemoAccounts(false);
  };

  // Format phone as (XX) XXXXX-XXXX
  const handlePhoneChange = (val) => {
    const raw = val.replace(/\D/g, '').slice(0, 11);
    if (raw.length <= 2) {
      setPhone(raw);
    } else if (raw.length <= 7) {
      setPhone(`(${raw.slice(0, 2)}) ${raw.slice(2)}`);
    } else {
      setPhone(`(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`);
    }
  };

  const brandDisplayName = lang === 'ja' ? 'NorTech (ノーテック)' : 'NORTECH';
  const existingUsers = getAllUsers();

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
        
        {/* Container */}
        <div className="relative w-full max-w-md rounded-3xl bg-[#080b16] border-2 border-purple-500/50 shadow-[0_0_60px_rgba(168,85,247,0.35)] overflow-hidden my-auto flex flex-col animate-in zoom-in-95 duration-200">
          
          {/* Top Shimmer Gradient */}
          <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 via-neon-mint to-cyan-400" />

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <div className="flex items-center gap-2.5">
              <NorTechLogo className="w-8 h-8" />
              <div>
                <span className="font-display font-black text-lg tracking-wider text-slate-100">
                  {brandDisplayName}
                </span>
                <p className="text-[10px] text-neon-mint font-bold uppercase tracking-wider flex items-center gap-1">
                  <BrainCircuit className="w-3 h-3" />
                  <span>Passaporte Vocacional Tech</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundFX.playClick();
                closeAuthModal();
              }}
              className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-purple-500/40 transition-all cursor-pointer"
              aria-label="Fechar modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 pt-2 space-y-5">
            
            {/* Headline */}
            <div className="text-center space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-slate-100 font-display">
                {authMode === 'signup' ? 'Crie sua conta gratuita' : 'Acesse seu perfil'}
              </h3>
              <p className="text-xs text-slate-400">
                {authMode === 'signup' 
                  ? 'Cadastre-se para iniciar seu diagnóstico vocacional com IA.' 
                  : 'Entre para continuar seu diagnóstico ou rever suas trilhas.'}
              </p>
            </div>

            {/* Mode Switcher Pills: Cadastrar vs Entrar */}
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-900 border border-purple-900/40">
              <button
                onClick={() => {
                  soundFX.playClick();
                  setAuthMode('signup');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className={`py-2 rounded-xl font-display font-bold text-xs transition-all cursor-pointer ${
                  authMode === 'signup'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/60'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Criar Conta
              </button>
              <button
                onClick={() => {
                  soundFX.playClick();
                  setAuthMode('login');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className={`py-2 rounded-xl font-display font-bold text-xs transition-all cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/60'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Já tenho conta
              </button>
            </div>

            {/* Social Google Login Button (Opens Google Account Selector) */}
            <div>
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setIsGoogleModalOpen(true);
                }}
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm flex items-center justify-center gap-3 shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-60"
              >
                {/* Official Google Icon SVG */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                </svg>
                <span>{authMode === 'signup' ? 'Cadastrar com o Google' : 'Continuar com o Google'}</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-purple-900/40 w-full" />
              <span className="bg-[#080b16] px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                ou
              </span>
              <div className="border-t border-purple-900/40 w-full" />
            </div>

            {/* Method Tabs: E-mail vs Telefone */}
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setAuthMethod('email');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  authMethod === 'email'
                    ? 'bg-purple-950/70 border border-purple-500/50 text-purple-200'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>E-mail</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setAuthMethod('phone');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  authMethod === 'phone'
                    ? 'bg-emerald-950/70 border border-emerald-500/50 text-neon-mint'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Celular / WhatsApp</span>
              </button>
            </div>

            {/* Notification / SMS Feedback Banner */}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-neon-mint text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <BellRing className="w-4 h-4 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Error Feedback */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-medium text-center animate-in fade-in">
                {errorMsg}
              </div>
            )}

            {/* FORM: E-MAIL */}
            {authMethod === 'email' && (
              <form onSubmit={handleEmailAuth} className="space-y-3.5">
                {authMode === 'signup' && (
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Seu Nome Completo
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Carlos Eduardo"
                        required={authMode === 'signup'}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-purple-500/30 focus:border-neon-mint focus:ring-1 focus:ring-neon-mint text-slate-100 text-sm outline-none transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu.email@exemplo.com"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-purple-500/30 focus:border-neon-mint focus:ring-1 focus:ring-neon-mint text-slate-100 text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Senha {authMode === 'signup' && <span className="text-[10px] text-slate-500 normal-case">(mínimo 6 caracteres)</span>}
                    </label>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-900/90 border border-purple-500/30 focus:border-neon-mint focus:ring-1 focus:ring-neon-mint text-slate-100 text-sm outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-neon-mint text-slate-950 font-display font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  ) : (
                    <>
                      <span>{authMode === 'signup' ? 'Cadastrar e Iniciar Entrevista' : 'Entrar e Continuar'}</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* FORM: PHONE (CELULAR / WHATSAPP) */}
            {authMethod === 'phone' && (
              <form onSubmit={handlePhoneAuth} className="space-y-3.5">
                {authMode === 'signup' && (
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Seu Nome
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Gabriel Souza"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 focus:border-neon-mint focus:ring-1 focus:ring-neon-mint text-slate-100 text-sm outline-none transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Número de Celular com DDD
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Phone className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="(11) 98765-4321"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 focus:border-neon-mint focus:ring-1 focus:ring-neon-mint text-slate-100 text-sm outline-none transition-all"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSendPhoneCode}
                      className="px-3.5 py-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-neon-mint border border-emerald-500/40 text-xs font-bold transition-all cursor-pointer flex-shrink-0"
                    >
                      {activeSmsCode ? 'Reenviar' : 'Enviar Código'}
                    </button>
                  </div>
                </div>

                {activeSmsCode && (
                  <div className="animate-in fade-in space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-neon-mint block">
                      Código de 6 dígitos recebido por SMS
                    </label>
                    <input
                      type="text"
                      value={phoneCode}
                      onChange={(e) => setPhoneCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="123456"
                      required
                      className="w-full text-center tracking-[0.3em] font-mono font-bold px-4 py-3 rounded-xl bg-slate-900/90 border border-emerald-500/40 focus:border-neon-mint text-neon-mint text-lg outline-none transition-all"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-neon-mint text-slate-950 font-display font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  ) : (
                    <>
                      <span>{authMode === 'signup' ? 'Cadastrar e Iniciar Entrevista' : 'Entrar com Celular'}</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Test Accounts Quick-Fill Helper */}
            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={() => setShowDemoAccounts(!showDemoAccounts)}
                className="text-[11px] text-purple-400/80 hover:text-purple-300 underline cursor-pointer inline-flex items-center gap-1"
              >
                <KeyRound className="w-3 h-3" />
                <span>Ver contas salvas no JSON / Teste rápido</span>
              </button>

              {showDemoAccounts && (
                <div className="mt-2 p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 text-left space-y-2 animate-in fade-in">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                    Contas de Demonstração (Clique para preencher):
                  </p>
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => fillDemoAccount('lucas.silva@gmail.com', 'senha123')}
                      className="w-full text-left p-1.5 rounded-lg bg-slate-900/60 hover:bg-purple-900/40 text-[11px] text-slate-300 hover:text-white flex justify-between"
                    >
                      <span>lucas.silva@gmail.com</span>
                      <span className="font-mono text-purple-400">senha123</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => fillDemoAccount('mariana.tech@gmail.com', 'senha123')}
                      className="w-full text-left p-1.5 rounded-lg bg-slate-900/60 hover:bg-purple-900/40 text-[11px] text-slate-300 hover:text-white flex justify-between"
                    >
                      <span>mariana.tech@gmail.com</span>
                      <span className="font-mono text-purple-400">senha123</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Guarantee / Privacy badge */}
            <div className="pt-1 flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-neon-mint" />
              <span>100% Gratuito & Seguro. Banco de dados local ativo.</span>
            </div>

          </div>

        </div>
      </div>

      {/* Google OAuth Modal Account Selector */}
      <GoogleOAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onSelectAccount={handleGoogleAccountSelected}
        existingAccounts={existingUsers}
      />
    </>
  );
}

