/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Cores utilizadas na aplicação
      colors: {
        primary: { 100: '#FFA59A', 200: '#FF6363', 300: '#FF3B3B'},

        secondary: {
          100: '#E2E2D5',
          200: '#888883',
        },
      },
    },
  },
  plugins: [],
}

