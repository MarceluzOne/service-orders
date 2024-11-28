/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'nav-color': '#181818',
        'card-color': '#474747',
        'all-cards-color': '#3d3d3d',
        'info-color': '#666666',
      },
    },
  },
  plugins: [],
}
