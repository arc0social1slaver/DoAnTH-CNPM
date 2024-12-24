/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors';

export default {
  content: [
    "./views/**/*.{html,js,jsx,ts,tsx}", // Make sure it covers all your relevant files
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      colors,
      sky: colors.sky,  // Replace lightBlue with sky
      stone: colors.stone,  // Replace warmGray with stone
      neutral: colors.neutral,  // Replace trueGray with neutral
      gray: colors.gray,  // Replace coolGray with gray
      slate: colors.slate,  // Replace blueGray with slate
      // Configure your color palette here
      blue: {
        700: '#1D4ED8',  // Example color definition for blue-700
      },
      green: {
        100: '#ECFADC',
        700: '#9FD4A3',
        900: '#69bc6f',
      },
      white: {
        100: '#FFFFFF',
      },
      black: {
        900: '#000000',
      },
    },
    extend: {},
  },
  "plugins": ["prettier-plugin-tailwindcss"],
}

