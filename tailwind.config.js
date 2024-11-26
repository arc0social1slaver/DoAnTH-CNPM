/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors';

export default {
  content: [
    "./views/**/*.{html,js,jsx,ts,tsx}", // Make sure it covers all your relevant files
  ],
  theme: {
    colors: {
      colors,
      // Configure your color palette here
      blue: {
        700: '#1D4ED8',  // Example color definition for blue-700
      },
    },
    extend: {},
  },
  "plugins": ["prettier-plugin-tailwindcss"],
}
