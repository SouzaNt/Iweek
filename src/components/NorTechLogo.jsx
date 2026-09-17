import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function NorTechLogo({ 
  className = "w-10 h-10", 
  showText = false, 
  variant = "icon", // "icon" | "full" | "banner"
  textClassName = "text-xl font-black tracking-widest"
}) {
  const { lang, t } = useLanguage();
  const brandDisplay = lang === 'ja' ? 'NORTECH (ノーテック)' : 'NORTECH';

  if (variant === "banner" || variant === "full") {
    return (
      <div className="flex flex-col items-center justify-center group select-none">
        {/* Full NorTech 3D Neon Emblem & Typography */}
        <div className="relative flex flex-col items-center justify-center p-4">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-600/30 transition-all duration-500" />

          {/* Emblem SVG */}
          <svg 
            viewBox="0 0 200 240" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-28 sm:w-28 sm:h-32 filter drop-shadow-[0_0_18px_rgba(168,85,247,0.85)] transition-transform duration-500 group-hover:scale-105"
          >
            {/* NORTH NEEDLE (Top Point) */}
            <polygon 
              points="100,10 84,80 100,68" 
              fill="rgba(147, 51, 234, 0.45)" 
              stroke="#C084FC" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />
            <polygon 
              points="100,10 116,80 100,68" 
              fill="rgba(233, 213, 255, 0.65)" 
              stroke="#F3E8FF" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />

            {/* CODE SYMBOLS < / > */}
            <path 
              d="M76,106 L48,128 L76,150" 
              fill="none" 
              stroke="#E9D5FF" 
              strokeWidth="6" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />

            <path 
              d="M109,98 L91,158" 
              fill="none" 
              stroke="#E9D5FF" 
              strokeWidth="6" 
              strokeLinecap="round" 
            />

            <path 
              d="M124,106 L152,128 L124,150" 
              fill="none" 
              stroke="#E9D5FF" 
              strokeWidth="6" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />

            {/* SOUTH NEEDLE (Bottom Point) */}
            <polygon 
              points="100,230 84,170 100,182" 
              fill="rgba(147, 51, 234, 0.45)" 
              stroke="#C084FC" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />
            <polygon 
              points="100,230 116,170 100,182" 
              fill="rgba(233, 213, 255, 0.65)" 
              stroke="#F3E8FF" 
              strokeWidth="3.5" 
              strokeLinejoin="round" 
            />
          </svg>

          {/* Dynamic NORTECH Typography */}
          <span className="mt-2 font-display font-black text-2xl sm:text-3xl tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-purple-200 to-purple-400 drop-shadow-[0_0_16px_rgba(168,85,247,0.9)] text-center">
            {brandDisplay}
          </span>
        </div>
      </div>
    );
  }

  // Default compact icon
  return (
    <div className="inline-flex items-center gap-2.5 group select-none">
      <div className={`relative flex items-center justify-center ${className} transition-transform duration-300 group-hover:scale-105`}>
        <svg 
          viewBox="0 0 100 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter drop-shadow-[0_0_12px_rgba(168,85,247,0.85)]"
        >
          <polygon 
            points="50,4 38,40 50,32" 
            fill="rgba(147, 51, 234, 0.45)" 
            stroke="#C084FC" 
            strokeWidth="3.5" 
            strokeLinejoin="round" 
          />
          <polygon 
            points="50,4 62,40 50,32" 
            fill="rgba(233, 213, 255, 0.65)" 
            stroke="#F3E8FF" 
            strokeWidth="3.5" 
            strokeLinejoin="round" 
          />

          <path 
            d="M36,52 L22,62 L36,72" 
            stroke="#E9D5FF" 
            strokeWidth="4.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          <path 
            d="M55,48 L45,76" 
            stroke="#E9D5FF" 
            strokeWidth="4.5" 
            strokeLinecap="round" 
          />

          <path 
            d="M64,52 L78,62 L64,72" 
            stroke="#E9D5FF" 
            strokeWidth="4.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          <polygon 
            points="50,116 38,80 50,88" 
            fill="rgba(147, 51, 234, 0.45)" 
            stroke="#C084FC" 
            strokeWidth="3.5" 
            strokeLinejoin="round" 
          />
          <polygon 
            points="50,116 62,80 50,88" 
            fill="rgba(233, 213, 255, 0.65)" 
            stroke="#F3E8FF" 
            strokeWidth="3.5" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>

      {showText && (
        <span className={`font-display font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-purple-300 to-purple-400 drop-shadow-[0_0_14px_rgba(168,85,247,0.8)] ${textClassName}`}>
          {brandDisplay}
        </span>
      )}
    </div>
  );
}
