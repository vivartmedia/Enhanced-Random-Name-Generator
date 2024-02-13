const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,js}",
    "./*.{html,js}", // This will track files in the root
    "./pages/**/*.html", // Insert this line if you create other sub-pages
    "./node_modules/flowbite/**/*.js" // Add Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}