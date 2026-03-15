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
        background: '#080808',    // Near-black
        surface: '#111111',       // Card surface
        card: '#161616',          // Slightly lighter card
        border: '#222222',        // Subtle border
        primary: '#ffffff',       // Primary text = white
        secondary: '#a0a0a0',     // Muted text
        accent: '#6ee7f7',        // Cyan glow accent
        highlight: '#a78bfa',     // Violet highlight
      },
      boxShadow: {
        'premium-sm': '0 2px 4px 0 rgba(0,0,0,0.4), 0 4px 12px 0 rgba(0,0,0,0.3)',
        'premium-hover': '0 4px 8px 0 rgba(0,0,0,0.5), 0 12px 30px 0 rgba(0,0,0,0.4)',
        'glow-cyan': '0 0 20px rgba(110, 231, 247, 0.15)',
        'glow-violet': '0 0 20px rgba(167, 139, 250, 0.15)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
      },
      transitionTimingFunction: {
        'premium-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
      }
    },
  },
  plugins: [],
}
