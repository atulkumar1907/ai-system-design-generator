/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colors mapped from your v2 UI design 
        bg: "#080810",
        surface: "#0f0f1a",
        accent: "#7c6dff",
        teal: "#0fd4a0",
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        epilogue: ['Epilogue', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} 