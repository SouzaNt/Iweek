import React, { useState } from 'react';
import { X, ArrowLeft, Check, Shield, UserPlus, AlertCircle, Loader2 } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

export default function GoogleOAuthModal({ isOpen, onClose, onSelectAccount, existingAccounts = [] }) {
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  if (!isOpen) return null;

  // Filter Google or email accounts to show in quick select list
  const googleAccounts = [
    {
      id: 'g_seed_1',
      name: 'Lucas Silva',
      email: 'lucas.silva@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'g_seed_2',
      name: 'Mariana Oliveira',
      email: 'mariana.tech@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    },
    ...existingAccounts
      .filter(acc => acc.email && acc.email.endsWith('@gmail.com') && acc.email !== 'lucas.silva@gmail.com' && acc.email !== 'mariana.tech@gmail.com')
      .map(acc => ({
        id: acc.id,
        name: acc.name,
        email: acc.email,
        avatar: acc.avatar
      }))
  ];

  const handleSelectPredefined = (acc) => {
    soundFX.playClick();
    setSelectedAccountId(acc.id);
    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      onSelectAccount({
        googleEmail: acc.email,
        googleName: acc.name,
        googleAvatar: acc.avatar
      });
      setIsLoading(false);
    }, 700);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = customEmail.trim().toLowerCase();
    const cleanName = customName.trim();

    if (!cleanEmail || !cleanName) {
      setErrorMsg('Por favor, informe seu nome e e-mail do Google.');
      return;
    }
    if (!cleanEmail.includes('@')) {
      setErrorMsg('Informe um endereço de e-mail válido.');
      return;
    }

    soundFX.playClick();
    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      onSelectAccount({
        googleEmail: cleanEmail,
        googleName: cleanName,
        googleAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(cleanEmail)}`
      });
      setIsLoading(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#ffffff] text-slate-900 shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Google Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Google G Logo */}
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z" />
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
            </svg>
            <div>
              <h4 className="font-semibold text-base text-slate-900 leading-tight">Fazer login com o Google</h4>
              <p className="text-xs text-slate-500">para prosseguir para NorTech</p>
            </div>
          </div>

          <button 
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Body */}
        <div className="p-6 pt-4">
          {!isAddingCustom ? (
            <div className="space-y-3">
              <p className="text-xs font-medium text-slate-600 mb-2">
                Escolha uma conta Google para autenticar:
              </p>

              {/* Accounts List */}
              <div className="space-y-1.5 divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {googleAccounts.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => handleSelectPredefined(acc)}
                    disabled={isLoading}
                    className="w-full flex items-center justify-between p-3 hover:bg-slate-50 transition-colors text-left cursor-pointer group disabled:opacity-50"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={acc.avatar} 
                        alt={acc.name} 
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="text-sm font-semibold text-slate-800 group-hover:text-blue-600">
                          {acc.name}
                        </div>
                        <div className="text-xs text-slate-500 font-mono">
                          {acc.email}
                        </div>
                      </div>
                    </div>
                    {isLoading && selectedAccountId === acc.id ? (
                      <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-blue-600 transition-colors" />
                    )}
                  </button>
                ))}

                {/* Option to use another custom account */}
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setIsAddingCustom(true);
                  }}
                  disabled={isLoading}
                  className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 text-blue-600 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <span>Usar outra conta Google...</span>
                </button>
              </div>

              {/* Security note */}
              <div className="pt-3 flex items-start gap-2 text-[11px] text-slate-500">
                <Shield className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>O Google compartilhará seu nome, e-mail e avatar de forma segura com o sistema NorTech.</span>
              </div>
            </div>
          ) : (
            /* Custom Account Form */
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setIsAddingCustom(false);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar para lista de contas</span>
              </button>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Ex: Seu Nome"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm outline-none text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  E-mail do Google (Gmail)
                </label>
                <input
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="exemplo@gmail.com"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm outline-none text-slate-900 bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <span>Autenticar com esta conta Google</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
