module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          main: '#631177',
          active: '#4f5b66',
          disabled: '#343d46',
        },
        secondary: {
          purple: '#B3AAB8',
          blue: '#E5E5FF',
          pink: '#FFC0CB',
        },
      },
      fontFamily: {
        body: "'Lato', sans-serif",
        head: "'Nunito Sans', sans-serif",
        mono: "'Source Code Pro', monospace",
      },
    },
  },
  plugins: [],
};
