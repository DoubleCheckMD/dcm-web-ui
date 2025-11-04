/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#00C6FB',
          DEFAULT: '#0091EA',
          dark: '#005BEA',
        },
        secondary: {
          DEFAULT: '#1DE9B6',
          light: '#64FFDA',
          dark: '#00BFA5',
        },
        accent: {
          DEFAULT: '#0A84FF',
          light: '#5AC8FA',
          dark: '#0051D5',
        },
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #00C6FB 0%, #005BEA 100%)',
        'primary-gradient-hover': 'linear-gradient(135deg, #00B4E5 0%, #0051D5 100%)',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'shake': 'shake 0.5s',
        'fadeIn': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}


