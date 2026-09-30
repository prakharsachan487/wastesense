/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#0077CC',
          'light-blue': '#0EA5E9',
          'dark-blue': '#004A80',
          black: '#0F172A',
          white: '#FFFFFF',
          'light-grey': '#F8FAFC',
        },
      },
    },
  },
  plugins: [],
}
