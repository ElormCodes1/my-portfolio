import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        ink: "var(--color-ink)",
        "ink-elevated": "var(--color-ink-elevated)",
        "ink-muted": "var(--color-ink-muted)",
        radar: "var(--color-radar)",
        "radar-dim": "var(--color-radar-dim)",
        steel: "var(--color-steel)",
        frost: "var(--color-frost)",
        runway: "var(--color-runway)",
        signal: "var(--color-signal)",
        primary: "#4A6CF7",
        "body-color": "#959CB1",
        dark: "#1D2144",
        black: "#090E34",
        white: "#FFFFFF",
        yellow: "#FBB040",
        transparent: "transparent",
        current: "currentColor",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      screens: {
        xs: "450px",
        sm: "575px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
      boxShadow: {
        signUp: "0px 5px 10px rgba(4, 10, 34, 0.2)",
        one: "0px 2px 3px rgba(7, 7, 77, 0.05)",
        sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
        radar: "0 0 40px rgba(229, 168, 75, 0.15)",
      },
      animation: {
        "pulse-signal": "pulse-signal 2.5s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
      keyframes: {
        "pulse-signal": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
