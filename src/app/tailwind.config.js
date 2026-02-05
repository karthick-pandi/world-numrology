/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', // src folder use பண்றீங்கன்னா
  ],
  theme: {
    extend: {
      colors: {
        // உங்க custom colors add பண்ணலாம்
      },
      fontFamily: {
        // custom fonts add பண்ணலாம்
      },
    },
  },
  plugins: [],
}