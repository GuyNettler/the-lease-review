// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'DM Sans',
          'Arial',
          'Helvetica',
          'sans-serif',
        ],
      },
      colors: {
        primary: {
          DEFAULT: '#2563eb', // Main blue
          light: '#eff6ff',  // Light blue for backgrounds/illustrations
        },
      },
    },
  },
  safelist: [
    'rtl',
    'ltr',
    'text-right',
    'text-left',
  ],
  plugins: [],
};
