const { JetBrains_Mono } = require('next/font/google');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-vt323)', 'monospace'],
        JetBrains_Mono: ['var(--font-jetbrains)', 'monospace'],
      },
      colors: {
        bone: '#d0d0d0',
      },
      animation: {
        blink: 'blink 1s step-start infinite'
      },
      keyframes: {
        blink: {
          '100%, 0%': {opacity: '0'},
          '50%': {opacity: '1'},
        },
      },
    },
  },
  plugins: [],
}

