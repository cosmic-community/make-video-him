/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#07070b',
          800: '#101018',
          700: '#1c1c28',
        },
        laser: {
          DEFAULT: '#ff1f3d',
          soft: '#ff5c77',
          deep: '#b0001f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Bebas Neue"', 'Impact', 'ui-sans-serif', 'sans-serif'],
      },
      boxShadow: {
        laser: '0 0 20px rgba(255, 31, 61, 0.45)',
        'laser-lg': '0 0 60px rgba(255, 31, 61, 0.45)',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}