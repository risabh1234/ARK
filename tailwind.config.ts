import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0B",
        panel: "#0E0E10",
        raise: "#1A1A1D",
        bone: "#F5F3EF",
        ash: "#8E8B85",
        copper: {
          DEFAULT: "#C4694A",
          dim: "#7A3F2C",
          lift: "#E08A66",
        },
        paper: {
          DEFAULT: "#F2EEE6",
          edge: "#E4DED1",
          text: "#211F1C",
        },
      },
      fontFamily: {
        serif: ["var(--font-spectral)", "Georgia", "serif"],
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        hero: ["clamp(2.75rem, 7vw, 6.5rem)", { lineHeight: "0.94", letterSpacing: "-0.03em" }],
        section: ["clamp(2.5rem, 4.4vw, 2.875rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        lead: ["clamp(1.3125rem, 2vw, 1.5rem)", { lineHeight: "1.6" }],
        reader: ["17px", { lineHeight: "1.75" }],
        ui: ["15px", { lineHeight: "1.2" }],
        eyebrow: ["11px", { lineHeight: "1", letterSpacing: "0.2em" }],
      },
      spacing: {
        "8": "8px",
        "16": "16px",
        "24": "24px",
        "32": "32px",
        "56": "56px",
        "88": "88px",
        "140": "140px",
      },
      maxWidth: {
        container: "1180px",
        measure: "68ch",
        lead: "62ch",
      },
      borderRadius: {
        none: "0",
        DEFAULT: "0",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16,1,0.3,1)",
      },
    },
  },
  plugins: [],
};

export default config;
