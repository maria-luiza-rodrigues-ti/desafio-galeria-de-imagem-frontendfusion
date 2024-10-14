/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "text-color": "#2C2C2C",
        "title-color": "#111111",
        "background-input": "#767676",
        "icon-colors": "#5F5F5F"
      },
      fontFamily: {
        sans: ['Montserrat', 'sans'],
        serif: ['Oswald', 'serif'],
      }
    },
  },
  plugins: [],
}

