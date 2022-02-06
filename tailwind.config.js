module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'background-main': '#111111',
        accent: {
          main: '#65737e',
          active: '#4f5b66',
          disabled: '#343d46',
        },
      },
      fontFamily: {
        body: "'Lato', sans-serif",
        head: "'Nunito Sans', sans-serif",
      },
    },
  },
  plugins: [],
};
