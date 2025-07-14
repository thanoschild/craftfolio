import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)", "sans-serif"],
      },
      colors: {
        "dark-bg": "#09090b",
        "dark-bg-sub": "#18181b",
        "dark-text": "#fafafa",
        "dark-text-sub": "#909091",
        "dark-border": "#BCBCBC",
        "dark-border-sub": "#27272a",
        "light-bg": "#FCFCFD",
        "light-bg-sub": "#f5f5f5",
        "light-text": "#09090B",
        "light-text-sub": "#747475",
        "light-border": "#BCBCBC",
        "light-border-sub": "#e5e7eb",
      },
      keyframes: {
        fadePulse: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-pulse": "fadePulse 2s ease-in-out infinite",
      },
    },
  },
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  plugins: [],
};

export default config;
