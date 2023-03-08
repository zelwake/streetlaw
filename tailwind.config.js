/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        sl: '0px 3px 10px rgba(0, 0, 0, 0.16);',
      },
    },
  },
  plugins: [],
}
