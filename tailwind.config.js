/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#E8E7E7',
      },
      spacing: {
        'full': '100%',
      },
    },
  },  plugins: [],
}

