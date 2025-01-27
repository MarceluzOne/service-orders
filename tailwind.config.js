/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'nav-color': '#F0F2FB',
        'all-cards-color': '#F0F2FB',
        'card-color': '#E3E8FA',
        'info-color': '#f1f2fc',
        'user-color': '#0a1443',
        'search-bar-color': '#BDC0D8'
      },
    },
  },
  plugins: [],
}
