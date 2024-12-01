/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors';

export default {
  content: [
    "./views/**/*.{html,js,jsx,ts,tsx}", // Make sure it covers all your relevant files
  ],
  theme: {
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

