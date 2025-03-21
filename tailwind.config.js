/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#ff3334',
        secondary: '#fa3f3d',
        lightBg: '#f8f9fa',
        darkBg: '#1a1a1a',
      },
    },
  },
  plugins: [],
}

