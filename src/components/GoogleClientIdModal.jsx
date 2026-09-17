import React, { useState } from 'react';
import { X, ExternalLink, ShieldCheck, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

export default function GoogleClientIdModal({ isOpen, onClose, onSaveAndLaunch }) {
  const [clientIdInput, setClientIdInput] = useState(() => {
    return localStorage.getItem('nortech_google_client_id') || import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
  });
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanId = clientIdInput.trim();
    if (!cleanId) {
      setErrorMsg('Por favor, cole o seu Google Client ID.');
      return;
    }

    if (!cleanId.includes('.apps.googleusercontent.com')) {
      setErrorMsg('O Client ID do Google geralmente termina com ".apps.googleusercontent.com"');
      return;
    }

    localStorage.setItem('nortech_google_client_id', cleanId);
    soundFX.playClick();
    onSaveAndLaunch(cleanId);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#080b16] border-2 border-blue-500/50 text-slate-100 shadow-[0_0_60px_rgba(59,130,246,0.35)] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Gradient Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-400" />

        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-blue-900/30">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z" />
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
            </svg>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-100 font-display">
                Configurar Google Sign-In Oficial
              </h3>
              <p className="text-xs text-slate-400">
                Para abrir a janela original do Google (<span className="text-blue-400 font-mono">accounts.google.com</span>)
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            Para que o navegador abra o popup oficial da Google, você precisa informar seu <strong className="text-white">Google OAuth Client ID</strong> gerado no console de desenvolvedores da Google:
          </p>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Google Client ID
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-blue-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={clientIdInput}
                  onChange={(e) => setClientIdInput(e.target.value)}
                  placeholder="Ex: 1234567890-abcdef.apps.googleusercontent.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-blue-500/40 focus:border-blue-400 text-slate-100 text-xs font-mono outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-950/50"
            >
              <span>Salvar e Abrir Popup Oficial da Google</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Tutorial steps */}
          <div className="pt-2 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2 text-slate-400">
            <div className="flex items-center justify-between text-slate-200 font-bold">
              <span>Como pegar seu Client ID gratuito:</span>
              <a 
                href="https://console.cloud.google.com/apis/credentials" 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 text-[11px]"
              >
                <span>Google Cloud Console</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-400">
              <li>Acesse o <strong>Google Cloud Console</strong> &gt; Credenciais.</li>
              <li>Clique em <strong>Criar Credenciais &gt; ID do cliente OAuth</strong>.</li>
              <li>Tipo: <em>Aplicativo da Web</em>.</li>
              <li>Origens autorizadas: adicione <code className="text-neon-mint font-mono">http://localhost</code> e <code className="text-neon-mint font-mono">http://localhost:5173</code>.</li>
              <li>Copie o Client ID gerado e cole acima!</li>
            </ol>
          </div>

        </div>

      </div>
    </div>
  );
}
