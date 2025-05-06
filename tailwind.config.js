/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-work-sans)', 'sans-serif'],
        // или отдельным классом:
        'work-sans': ['var(--font-work-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};