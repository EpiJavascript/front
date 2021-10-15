module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {
      borderRadius: ['hover', 'focus'],
      transitionProperty: ['hover', 'focus'],
    },
  },
  theme: {
    extend: {
      colors: {
        'regal-blue': '#243c5a',
        primary: '#7157f2',
      },
    },
  },
  plugins: [],
};
