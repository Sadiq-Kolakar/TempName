/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf9ef',
          100: '#f9f0d5',
          200: '#f2dfa9',
          300: '#e9c96e',
          400: '#c9a84c',
          500: '#b8912d',
          600: '#9a7223',
          700: '#7d571f',
          800: '#674720',
          900: '#583c1f',
        },
        luxury: {
          black: '#0a0a0a',
          dark: '#141414',
          darker: '#1a1a1a',
          card: '#1e1e1e',
          border: '#2a2a2a',
          muted: '#888888',
          light: '#f5f5f5',
          charcoal: '#171717',
          red: '#c41010',
          'red-dark': '#8b0808',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'count': 'count 2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #c9a84c 0%, #e9c96e 50%, #c9a84c 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0a0a0a 0%, #141414 100%)',
        'gradient-sport': 'linear-gradient(135deg, #c41010 0%, #171717 100%)',
        'gradient-charcoal': 'radial-gradient(circle at top right, #c41010 0%, transparent 40%), radial-gradient(circle at bottom left, #8b0808 0%, transparent 40%), #171717',
      },
    },
  },
  plugins: [],
}
