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
        background: '#F8FAFC', // Clean slate-white (brand)
        surface: '#FFFFFF',
        card: '#F1F5F9',
        primary: '#0f172a',    // Slate-900 – Midnight Blue brand accent
        secondary: '#1e293b',  // Slate-800 – Hover / secondary
        highlight: '#10B981'   // Emerald 500
      },
      boxShadow: {
        'premium-sm': '0 2px 4px 0 rgba(0, 0, 0, 0.02), 0 4px 12px 0 rgba(0, 0, 0, 0.04)',
        'premium-hover': '0 4px 8px 0 rgba(0, 0, 0, 0.04), 0 12px 30px 0 rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.02)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
      },
      transitionTimingFunction: {
        'premium-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
      }
    },
  },
  plugins: [],
}
