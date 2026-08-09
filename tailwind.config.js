/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['variant', '&:is(.dark-theme *)'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'arm-cyan': '#00F0FF',
        'arm-green': '#00E676',
        'arm-dark': '#060913',
        'arm-card': '#0E1424',
        'arm-violet': '#9D4EDD',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
