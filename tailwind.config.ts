import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ĀRK design tokens — single cream/terracotta system, per
        // ARK_Redesign_Specification.md §6. Retires the former dark
        // "ink" / light "paper" dual-mode identity (see DEVELOPMENT_LOG.md).
        bg: "#FBF6EE",
        "bg-raised": "#F6EEE3",
        ink: "#23201B",
        muted: "#6B6459",
        accent: {
          DEFAULT: "#B5502F",
          deep: "#8A3B22",
        },
        rule: "#D8CFC0",
        "ink-dark": "#141210",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-inter)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Spec §7.2 type scale
        display: ["clamp(2.75rem, 8vw, 6.5rem)", { lineHeight: "0.96", letterSpacing: "-0.03em" }],
        h1: ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.15" }],
        lead: ["1.25rem", { lineHeight: "1.6" }],
        body: ["1.0625rem", { lineHeight: "1.7" }],
        small: ["0.875rem", { lineHeight: "1.4" }],
        // Legacy aliases kept during the phased re-skin so unconverted
        // pages don't break — remove once every page uses the spec names.
        hero: ["clamp(2.75rem, 8vw, 6.5rem)", { lineHeight: "0.96", letterSpacing: "-0.03em" }],
        section: ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.15" }],
        reader: ["1.0625rem", { lineHeight: "1.7" }],
        ui: ["0.9375rem", { lineHeight: "1.3" }],
        eyebrow: ["11px", { lineHeight: "1", letterSpacing: "0.2em" }],
      },
      spacing: {
        // Spec §8 8px scale, union'd with the site's existing literal
        // values so nothing already shipped breaks mid-redesign.
        "1": "8px",
        "8": "8px",
        "2": "16px",
        "16": "16px",
        "3": "24px",
        "24": "24px",
        "32": "32px",
        "4": "40px",
        "40": "40px",
        "5": "64px",
        "56": "56px",
        "64": "64px",
        "6": "96px",
        "88": "88px",
        "96": "96px",
        "7": "160px",
        "140": "140px",
        "160": "160px",
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
      boxShadow: {
        // Spec §9 elevation scale — four fixed levels, used everywhere
        // instead of ad hoc per-component shadows.
        0: "none",
        1: "0 1px 2px rgba(35,32,27,.06)",
        2: "0 6px 16px rgba(35,32,27,.10)",
        3: "0 16px 40px rgba(35,32,27,.16)",
        4: "0 24px 64px rgba(35,32,27,.22)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16,1,0.3,1)",
        // Spec §10 motion tokens
        standard: "cubic-bezier(.22,.61,.36,1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "350ms",
        slow: "700ms",
      },
    },
  },
  plugins: [],
};

export default config;
