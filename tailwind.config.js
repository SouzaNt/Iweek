/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          850: '#151d2e',
          900: '#0f172a',
          950: '#070b14',
        },
        neon: {
          purple: '#A855F7',
          'purple-glow': '#9333EA',
          'purple-light': '#C084FC',
          mint: '#10B981',
          'mint-light': '#34D399',
          'mint-glow': '#059669',
          cyan: '#06B6D4',
          blue: '#3B82F6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.55), 0 0 45px rgba(16, 185, 129, 0.25)',
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow: '0 0 35px rgba(16, 185, 129, 0.85), 0 0 70px rgba(16, 185, 129, 0.45)',
            transform: 'scale(1.03)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle, rgba(168, 85, 247, 0.12) 1px, transparent 1px)",
        'radial-glow': "radial-gradient(circle at 50% 30%, rgba(147, 51, 234, 0.18) 0%, rgba(16, 185, 129, 0.08) 45%, transparent 70%)",
      }
    },
  },
  plugins: [],
}
