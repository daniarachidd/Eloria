/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    './pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cardBg: "var(--color-card-bg)",
        cardBorder: "var(--color-card-border)",
        textPrimary: "var(--color-text-primary)",
        textSecondary: "var(--color-text-secondary)",
        textAccent: "var(--color-text-accent)",
        buttonBg: "var(--color-button-bg)",
        buttonHover: "var(--color-button-hover)",
        buttonText: "var(--color-button-text)",
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },

       keyframes: {
      cartPop: {
        '0%, 100%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.3)' },
      },
    },
    animation: {
      cartPop: 'cartPop 0.4s ease-in-out',
    },
    },
  },
  plugins: [],
};