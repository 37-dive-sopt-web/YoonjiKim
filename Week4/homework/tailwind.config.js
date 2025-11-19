/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#d8b4fe',
          light: '#e9d5ff',
          dark: '#c084fc',
        },
        cancel: {
          DEFAULT: '#9ca3af',
          light: '#d1d5db',
          dark: '#6b7280',
        },
        danger: {
          DEFAULT: '#f87171',
          light: '#fca5a5',
          dark: '#ef4444',
        },
      },
    },
  },
  plugins: [],
}