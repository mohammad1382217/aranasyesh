/** @type {import('tailwindcss').Config} */

// add material-tailwind
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    './index.html',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': {'max': '425px'},
      // => @media (max-width: 425px) { ... }
    },
  },
  plugins: [require('flowbite/plugin')],
});