import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "#0A0A0B",
        steel: "#141416",
        iron: "#1E1E22",
        mist: "#2C2C32",
        bone: "#F2EDE6",
        ash: "#8A8A96",
        gold: {
          DEFAULT: "#C8922A",
          light: "#E8B84B",
          dim: "rgba(200,146,42,0.12)",
        },
        success: "#4CAF7D",
        error: "#E05C5C",
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "DM Sans", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(3.5rem, 8vw, 7rem)", { lineHeight: "1.02" }],
      },
      letterSpacing: {
        widest2: "0.32em",
      },
      boxShadow: {
        gold: "0 0 40px -12px rgba(200, 146, 42, 0.45)",
        card: "0 24px 60px -24px rgba(0, 0, 0, 0.7)",
      },
      keyframes: {
        "scan-down": {
          "0%": { transform: "translateY(-100vh)", opacity: "0.85" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "scan-down": "scan-down 1.4s ease-in-out 0.2s forwards",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
