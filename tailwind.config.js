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
      backgroundImage: theme => ({
        'email-input-light': "url('/src/assets/images/email-envelope.png')",
        'email-input-dark': "url('/src/assets/images/email-envelope-darkmode.png')",
        'password-input-light': "url('/src/assets/images/padlock-password.png')",
        'password-input-dark': "url('/src/assets/images/padlock-password-darkmode.png')",
        'phone-input-light': "url('/src/assets/images/phone.png')",
        'phone-input-dark': "url('/src/assets/images/phone-darkmode.png')",
        'person-input-light': "url('/src/assets/images/person-login.png')",
        'person-input-dark': "url('/src/assets/images/person-login-darkmode.png')",
        'briefcase-input-light': "url('/src/assets/images/briefcase.png')",
        'briefcase-input-dark': "url('/src/assets/images/briefcase-darkmode.png')",
        "calendar-input-light": "url('/src/assets/images/calendar.png)",
        "calendar-input-dark": "url('/src/assets/images/calendar-darkmode.png)"
      }),
    },
  },
  plugins: [],
}

