/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'prime':'#0d253f',
        'second':'#01b4e4',
        'tert':'#90cea1'
      }
    },
  },
  plugins: [],
}