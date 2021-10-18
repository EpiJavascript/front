module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {
      borderRadius: ['hover', 'focus'],
      transitionProperty: ['hover', 'focus'],
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  theme: {
    extend: {
      colors: {
        'regal-blue': '#243c5a',
        primary: '#7157f2',
      },
      minWidth: {
        96: '96px',
      },
      width: {
        440: '440px',
      },
      borderRadius: {
        20: '22px',
        32: '32px',
      },
      transitionProperty: {
        server: 'border-radius, background-color, color',
      },
    },
  },
  plugins: [],
};
