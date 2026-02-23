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
      },
      colors: {
        background: '#F5F7FF', // Indigo-white tint (custom)
        surface: '#FFFFFF',    // White
        card: '#F1F5F9',       // Slate 100
        primary: '#4F46E5',    // Indigo 600
        secondary: '#0EA5E9',  // Sky 500
        highlight: '#10B981'   // Emerald 500
      }
    },
  },
  plugins: [],
}
