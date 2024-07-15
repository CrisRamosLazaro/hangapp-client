/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["'Poppins'", 'sans-serif']
      },
      keyframes: {
        left: {
          '0%, 100%': { transform: 'translateY(10px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        right: {
          '0%, 100%': { transform: 'translateY(-10px)' },
          '50%': { transform: 'translateY(10px)' },
        },
      },
      animation: {
        left: 'left 1s infinite ease-in-out',
        right: 'right 1.1s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}

