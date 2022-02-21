module.exports = {
  content: [
    './pages/**/*.{html,js,tsx}',
    './components/**/*.{html,js,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#a855f7', 
      },
    },
  },
  plugins: [
    'tailwindcss',
    'postcss-preset-env',
  ],
}
