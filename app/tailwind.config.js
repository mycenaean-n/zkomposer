/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        800: '800px', // This adds a class named `w-800`
        1000: '1000px', // This adds a class named `w-800`
      },
      colors: {
        'btn-gray': '#bbb',
      },
    },
  },
  plugins: [],
};
