/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        'custom': '8px 4%',
      },
      gridTemplateColumns: {
        'custom': '0.5fr 2fr 1fr 1fr 0.5fr',
        'custom-2': '0.5fr 2fr 1fr 1fr 1fr',
      },

      borderRadius: {
        'custom': '3px 0px 0px 3px', // Add custom border radius value
      },



    },
  },
  plugins: [],
}
