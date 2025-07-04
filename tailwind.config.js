/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['Menlo', 'monospace'],
        Sarabun: ['Sarabun', 'sans-serif'],
        NotoSansThai: ['Noto Sans Thai','sans-serif']
      },
    },
  },
  plugins: [],
}

