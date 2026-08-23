import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ĀRK design tokens v3 — "Rajo Guna luxury-tech" direction,
        // user's own exact palette. Deliberately NOT a dark-mode-primary
        // site (that reads as Tamas/generic dark developer portfolio —
        // explicitly rejected). Warm ivory base stays primary; contrast,
        // density and typographic scale carry the "expensive" feeling
        // instead of a black background. See DEVELOPMENT_LOG.md.
        bg: "#F6F1E8",
        "bg-raised": "#FBF9F4",
        ink: "#171512",
        muted: "#625E57",
        accent: {
          DEFAULT: "#D94A16",
          deep: "#B83A0E",
        },
        gold: "#B58A45",
        rule: "#D8D0C3",
        "ink-dark": "#1A1610",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-inter)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Spec §7.2 type scale, pushed larger + tighter for more graphic
        // impact — the Mona Sans page's headline is the primary design
        // element on the page, not a caption above other content.
        display: ["clamp(3.25rem, 10vw, 8.5rem)", { lineHeight: "0.92", letterSpacing: "-0.035em" }],
        h1: ["clamp(2.25rem, 4.6vw, 3.75rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        h2: ["clamp(1.625rem, 2.8vw, 2.25rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        lead: ["1.25rem", { lineHeight: "1.6" }],
        body: ["1.0625rem", { lineHeight: "1.7" }],
        small: ["0.875rem", { lineHeight: "1.4" }],
        // Legacy aliases kept during the phased re-skin so unconverted
        // pages don't break — remove once every page uses the spec names.
        hero: ["clamp(3.25rem, 10vw, 8.5rem)", { lineHeight: "0.92", letterSpacing: "-0.035em" }],
        section: ["clamp(1.625rem, 2.8vw, 2.25rem)", { lineHeight: "1.1" }],
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
