/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'nav-color': '#154d7f',
        'card-color': '#2769a4',
        'all-cards-color': '#efefef',
        'info-color': '#1a5488',
      },
    },
  },
  plugins: [],
}
