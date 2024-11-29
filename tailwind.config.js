/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'nav-color': '#111b2d',
        'all-cards-color': '#15223a',
        'card-color': '#1a2944',
        'info-color': '#253757',
      },
    },
  },
  plugins: [],
}
