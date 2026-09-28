/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0810',
        surface: {
          DEFAULT: '#15101D',
          hover: '#1B1526',
          border: '#291E38',
        },
        secondary: {
          DEFAULT: '#21182B',
          hover: '#2D203C',
        },
        purple: {
          pastel: '#A78BFA',
          deep: '#6D28D9',
          lavender: '#EDE9FE',
          glow: 'rgba(167, 139, 250, 0.15)',
        },
        red: {
          primary: '#E63946',
          deep: '#9F1239',
          glow: 'rgba(230, 57, 70, 0.15)',
        },
        cinetext: {
          main: '#F8F7FB',
          muted: '#A8A1B5',
          dim: '#6C657B',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to top, #0B0810 10%, rgba(21, 16, 29, 0.7) 60%, rgba(109, 40, 217, 0.25) 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(21, 16, 29, 0) 0%, rgba(21, 16, 29, 0.95) 100%)',
        'purple-red-glow': 'radial-gradient(circle at 50% 0%, rgba(109, 40, 217, 0.25) 0%, rgba(159, 18, 57, 0.15) 50%, rgba(11, 8, 16, 0) 100%)',
      },
      boxShadow: {
        'glow-purple': '0 0 25px rgba(167, 139, 250, 0.25)',
        'glow-red': '0 0 25px rgba(230, 57, 70, 0.25)',
      }
    },
  },
  plugins: [],
}
