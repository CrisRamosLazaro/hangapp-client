import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["'Poppins'", 'sans-serif']
      },
      backgroundImage: ({
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
      backgroundSize: {
        '20': '20px',
      },
      backgroundPosition: {
        'right-10-center': 'right 10px center',
      },
      boxShadow: {
        'solid-black': '10px 10px 0px 0px rgba(0,0,0,1)',
      },
    },
  },
  variants: {
    extend: {
      textColor: ['placeholder'],
      borderColor: ['focus']
    },
  },
  plugins: [
    forms({
      strategy: 'class',
    }),
  ]
}

