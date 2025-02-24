/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '34vw': '34vw',
      },

      maxWidth: {
     '50p' : '50%',
      },

      inset: {
        '10p': '10%',
      },

      fontSize: {
        'responsive': 'max(3.5vw, 22px)',
      },

      borderRadius: {
        'custom': '50px',
      },

      animation: {
        fadeIn: 'fadeIn 1s ease-in',
        fade: 'fadeIn 0.5s ease-out',

      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      maxWidth: {
        '60p': '60%',
      },

      gridTemplateColumns: {
        'auto-fill-minmax': 'repeat(auto-fill, minmax(240px, 1fr))',
        'custom': '2fr 1fr 1fr',
        'custom-2': '1fr 1.5fr 1fr 1fr 1fr 0.5fr',
        'custom-3': '0.5fr 2fr 1fr 1fr 2fr 1fr',


      },
    
      boxShadow: {
        'custom-shadow': '0px 0px 10px rgba(0, 0, 0, 0.09)',
      },
      
      screens: {
        'custom-lg': '1050px', // Custom breakpoint for max-width 1050px
        'custom-md': '900px',  // Custom breakpoint for max-width 900px
        'custom-sm': '750px',  // Custom breakpoint for max-width 750px
        'custom-s':"430",
      },

    fontFamily:{
      regular:[ "Squada One", "sans-serif"],
 
    },
    


    
    },
  },
  plugins: [],
}

