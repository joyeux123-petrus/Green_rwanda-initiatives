/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1B3B2B',
          dark: '#12271D',
          darker: '#0B1A13',
          light: '#2B5B43',
          emerald: '#23734D',
          accent: '#348B5E',
          muted: '#406C56',
          subtle: '#EEF4F0'
        },
        earth: {
          DEFAULT: '#A85A1D',
          dark: '#7A3F12',
          light: '#C87027',
          subtle: '#FAF3EC'
        },
        sand: {
          50: '#FAF9F6',
          100: '#F2EFE9',
          200: '#E5E0D5',
          300: '#D4CCC0',
          400: '#A79F92',
          500: '#787268',
          600: '#57524A',
          700: '#3F3B35',
          800: '#282522',
          900: '#171513'
        },
        warmBg: '#FAF9F6',
        charcoal: '#171A18',
        slateText: '#38433E'
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
