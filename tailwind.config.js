/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#ff7a00',
      },
      boxShadow: {
        glow: '0 20px 60px rgba(255,122,0,0.25)',
      },
    },
  },
  plugins: [],
}
