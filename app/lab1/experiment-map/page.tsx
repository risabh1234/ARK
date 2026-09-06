"use client";

import { useState, type ReactElement } from "react";
import { Inter, Space_Mono, Source_Serif_4, Fraunces } from "next/font/google";
import "./experiment.css";
import { AstrolabeMap } from "./_components/AstrolabeMap";
import { AstrolabeTelemetry, type TerritoryId } from "./_components/AstrolabeTelemetry";

const fontInter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const fontSpaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-mono",
  display: "swap",
});

const fontSourceSerif = Source_Serif_4({
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-serif",
  display: "swap",
});

const fontFraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
});

export default function AstrolabeExperimentPage(): ReactElement {
  const [activeTerritory, setActiveTerritory] = useState<TerritoryId>("measurable");

  return (
    <div
      id="experiment-root"
      data-dir="experiment"
      className={`${fontInter.variable} ${fontSpaceMono.variable} ${fontSourceSerif.variable} ${fontFraunces.variable} ark-exp-root`}
    >
      {/* Accessibility Skip Link (WCAG 2.2 AA) */}
      <a
        href="#experiment-main-content"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "16px",
          padding: "8px 16px",
          background: "var(--ark-amber)",
          color: "#000",
          zIndex: 9999,
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          fontWeight: "bold",
        }}
        onFocus={(e) => (e.currentTarget.style.left = "16px")}
        onBlur={(e) => (e.currentTarget.style.left = "-9999px")}
      >
        Skip to main content
      </a>

      {/* Header Bar */}
      <header className="ark-exp-header">
        <div className="ark-exp-brand">
          <a href="/lab" className="ark-exp-logo">
            ĀRK <span style={{ color: "var(--ark-muted)", fontWeight: 400 }}>/ LAB</span>
          </a>
          <span className="ark-exp-status-pill">OPTION B EXPERIMENT · ACTIVE</span>
        </div>
        <nav className="ark-exp-nav-links" aria-label="Experiment navigation">
          <a href="/lab/synthesis" className="ark-exp-link">
            ← Back to Synthesis
          </a>
          <a href="#telemetry-panel" className="ark-exp-link">
            Telemetry HUD ↓
          </a>
        </nav>
      </header>

      {/* Main Container */}
      <main id="experiment-main-content" className="ark-exp-main" tabIndex={-1}>
        <section className="ark-exp-masthead" aria-labelledby="exp-title">
          <span className="ark-exp-eyebrow">THE DIAGNOSIS · ATLAS OF BROKEN MAPS</span>
          <h1 id="exp-title" className="ark-exp-title">
            The Four Territories of Human Knowledge
          </h1>
          <p className="ark-exp-lead">
            Every day you cross four terrains mapped by institutions that deny each other&apos;s borders.
            Science explains the mechanism. Markets optimise the outcome. Psychology maps the feeling.
            Inherited tradition carries the purpose. This atlas is an operational instrument to navigate all four.
          </p>
        </section>

        {/* The Grid: Interactive Astrolabe Map + Telemetry HUD */}
        <div className="ark-exp-grid">
          {/* Column 1: Map Stage */}
          <div className="ark-exp-map-column">
            <AstrolabeMap activeId={activeTerritory} onSelect={setActiveTerritory} />
          </div>

          {/* Column 2: Live Telemetry HUD */}
          <div id="telemetry-panel" className="ark-exp-telemetry-column">
            <AstrolabeTelemetry activeId={activeTerritory} onSelect={setActiveTerritory} />
          </div>
        </div>

        {/* Specimen Proof Strip (Verifying Font Diacritics & System Integrity) */}
        <div className="ark-specimen-strip">
          <span>
            <strong>PROOF STRING:</strong> ĀRK · Vimāna · Sāṃkhya — Ā ā Ī ī Ṃ ṃ Ṛ ṛ · ₹1,299
          </span>
          <span>
            <strong>GOVERNING LAW:</strong> CONSTITUTION L1–L6 · TEKTRONIX GLOW LAW · RADIUS 0
          </span>
        </div>
      </main>
    </div>
  );
}
