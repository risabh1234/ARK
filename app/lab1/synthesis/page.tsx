"use client";

import { useState, type ReactElement } from "react";
import { Inter, Space_Mono, Source_Serif_4 } from "next/font/google";
import "./synthesis-layout.css";

import { SvgPatternDefs } from "./_components/svg/patterns";
import { useActiveStratum } from "./hooks/useActiveStratum";
import { useReducedMotion } from "./hooks/useReducedMotion";

import { TopBar } from "./_components/TopBar";
import { StrataRuler } from "./_components/StrataRuler";
import { HeroBeat } from "./_components/HeroBeat";
import { DiagnosisBeat } from "./_components/DiagnosisBeat";
import { MethodBeat } from "./_components/MethodBeat";
import { AnatomyBeat } from "./_components/AnatomyBeat";
import { ProofBeat } from "./_components/ProofBeat";
import { WorkBeat } from "./_components/WorkBeat";
import { EntryBeat } from "./_components/EntryBeat";
import type { DepthMode } from "./_components/DepthControl";
import type { TerritoryId } from "./_components/FourTerritoryMap";

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

export default function SynthesisPage(): ReactElement {
  const activeStratum = useActiveStratum();
  const reducedMotion = useReducedMotion();

  const [depth3, setDepth3] = useState<DepthMode>("source");
  const [depth4, setDepth4] = useState<DepthMode>("source");
  const [hoveredTerritory, setHoveredTerritory] = useState<TerritoryId | null>("measurable");

  return (
    <div
      id="synthesis-root"
      data-dir="synthesis"
      className={`${fontInter.variable} ${fontSpaceMono.variable} ${fontSourceSerif.variable} ark-synthesis`}
    >
      {/* Global Geological & Stratigraphic Pattern Definitions */}
      <SvgPatternDefs />

      {/* Keyboard Accessibility Skip Link (WCAG 2.2 AA) */}
      <a href="#main-content" className="v3-skip-link">
        Skip to main content
      </a>

      {/* TopBar Masthead */}
      <TopBar />

      {/* Strata Ruler Altimeter (Desktop Rail + Mobile Sticky Strip) */}
      <StrataRuler activeStratum={activeStratum} reducedMotion={reducedMotion} />

      {/* Primary Narrative Descent Main Container */}
      <main id="main-content" tabIndex={-1} className="v3-main">
        {/* Beat 1: Provocation (I · Source) */}
        <HeroBeat reducedMotion={reducedMotion} />

        {/* Beat 2: Diagnosis (I · Source -> II) */}
        <DiagnosisBeat
          hoveredTerritory={hoveredTerritory}
          setHoveredTerritory={setHoveredTerritory}
          reducedMotion={reducedMotion}
        />

        {/* Beat 3: The Method (II · Evidence) */}
        <MethodBeat depth={depth3} setDepth={setDepth3} />

        {/* Beat 4: Anatomy of a Claim (II · Evidence) */}
        <AnatomyBeat depth={depth4} setDepth={setDepth4} />

        {/* Beat 5: The Proof (III · Interpretation) */}
        <ProofBeat reducedMotion={reducedMotion} />

        {/* Beat 6: The Work (III · Interpretation, Accent Rested) */}
        <WorkBeat />

        {/* Beat 7: Entry (IV · Unresolved, Signal Red) */}
        <EntryBeat />
      </main>
    </div>
  );
}
