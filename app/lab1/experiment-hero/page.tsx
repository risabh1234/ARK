"use client";

import { useState, useEffect, type ReactElement } from "react";
import { Inter, Space_Mono, Source_Serif_4 } from "next/font/google";
import "./hero-experiment.css";
import { HeroExperimentStage } from "./_components/HeroExperimentStage";

const fontInter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--ark-font-display",
  display: "swap",
});

const fontSpaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--ark-font-mono",
  display: "swap",
});

const fontSourceSerif = Source_Serif_4({
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  variable: "--ark-font-serif",
  display: "swap",
});

export default function HeroExperimentPage(): ReactElement {
  const [systemReducedMotion, setSystemReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSystemReducedMotion(media.matches);

    const listener = (e: MediaQueryListEvent) => {
      setSystemReducedMotion(e.matches);
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return (
    <div
      id="experiment-hero-root"
      data-dir="experiment-hero"
      className={`${fontInter.variable} ${fontSpaceMono.variable} ${fontSourceSerif.variable} ark-experiment-hero`}
    >
      {/* Keyboard Accessibility Skip Link (WCAG 2.2 AA) */}
      <a href="#main-stage" className="ark-skip-link">
        Skip to main plate stage
      </a>

      {/* Primary Hero Stage Container */}
      <HeroExperimentStage systemReducedMotion={systemReducedMotion} />
    </div>
  );
}
