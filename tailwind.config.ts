import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#05060f",
        "void-deep": "#020208",
        nebula: "#6c4ce0",
        "nebula-soft": "#9c85f5",
        flare: "#ff7a45",
        stardust: "#f4c95d",
        ice: "#edeffb",
        panel: "#11132a",
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "sans-serif"],
        body: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
        coiny: ["var(--font-coiny)", "sans-serif"],
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.25", transform: "scale(0.9)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        drift: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-40px)" },
        },
        "shooting-star": {
          "0%": { transform: "translate(0, 0) rotate(-35deg)", opacity: "0" },
          "8%": { opacity: "1" },
          "18%": {
            transform: "translate(-320px, 220px) rotate(-35deg)",
            opacity: "0",
          },
          "100%": {
            transform: "translate(-320px, 220px) rotate(-35deg)",
            opacity: "0",
          },
        },
        flicker: {
          "0%, 100%": { opacity: "0.85", transform: "scaleY(1)" },
          "45%": { opacity: "1", transform: "scaleY(1.08)" },
          "55%": { opacity: "0.7", transform: "scaleY(0.92)" },
        },
        "card-in": {
          "0%": { opacity: "0", transform: "translateY(24px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        twinkle: "twinkle 3.2s ease-in-out infinite",
        drift: "drift 60s linear infinite",
        "shooting-star": "shooting-star 6s ease-in infinite",
        flicker: "flicker 0.6s ease-in-out infinite",
        "card-in": "card-in 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
