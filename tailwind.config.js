import {nextui} from '@nextui-org/react';


// const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    // "./node_modules/flowbite/**/*.js"

  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    nextui(),
    // flowbite,

    function({addUtilities}){
      addUtilities({
        '.hidden-scrollbar' : {
          'scrollbar-width': 'none',
          'ms-overflow-style': 'none',
        },
        '.hidden-scrollbar::-webkit-scrollbar':{
          display:'none'
        }
      })
    }
  ],
};
