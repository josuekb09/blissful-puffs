import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#061A2F",
        obsidian: "#0B223D",
        gold: "#D4AF37",
        cta: "#C5A059",
        platinum: "#FFFFFF",
        smoke: "#E5E7EB"
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        gold: "0 18px 42px rgba(212, 175, 55, 0.12)",
        cta: "0 18px 44px rgba(197, 160, 89, 0.2)"
      },
      backgroundImage: {
        "luxury-line": "linear-gradient(90deg, transparent, rgba(212,175,55,0.65), transparent)"
      }
    }
  },
  plugins: []
};

export default config;
