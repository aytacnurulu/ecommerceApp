/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'trendyol-orange': '#f27a1a',
        'trendyol-orange-hover': '#e06b10',
        'trendyol-gray': '#333333',
        'trendyol-light-gray': '#f5f5f5',
        'trendyol-border': '#e6e6e6',
      },
    },
  },
  plugins: [],
}