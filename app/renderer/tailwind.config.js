/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#F0F0F0',
        'secondary-color': '#E6E6E6',
        'secondary-color-disabled': 'rgba(208, 208, 208, 1)',
        black: '#000',
        white: '#fff'
      }
    }
  },
  content: [
    './**/*.{js,ts,jsx,tsx}',
    '../../components/**/*.{js,ts,jsx,tsx}',
    '../../src/**/*.{js,ts,jsx,tsx}'
  ],
  plugins: []
}
