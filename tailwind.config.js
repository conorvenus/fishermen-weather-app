/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,tsx,js,ts}", "index.html"],
  darkMode: 'class',
  theme: {
      colors: {
        'black': '#15171A',
        'dark-gray': '#1D2125',
        'gray': '#2F3339',
        'white': '#FFFFFF',
        'light-gray': '#A8AAAC',
        'blue': '#1383F5',
        'transparent': 'transparent'
      },
      boxShadow: {
        'primary': '0px 15px 50px rgba(0, 0, 0, 0.2)'
      }
  },
  plugins: [],
}