"use client";

import { useState, type ReactElement } from "react";
import { TerrainRidges } from "./TerrainRidges";
import { ParticleSkyCanvas } from "./ParticleSkyCanvas";
import { CelestialAstrolabe, type HorizonStratumId } from "./CelestialAstrolabe";
import { InstrumentCitationCard } from "./InstrumentCitationCard";
import { HorizonStrataLadder } from "./HorizonStrataLadder";
import {
  ExperimentControls,
  type TypographyMode,
  type CopyMode,
} from "./ExperimentControls";

interface HeroExperimentStageProps {
  systemReducedMotion?: boolean;
}

export function HeroExperimentStage({
  systemReducedMotion = false,
}: HeroExperimentStageProps): ReactElement {
  const [activeStratum, setActiveStratum] = useState<HorizonStratumId | null>(null);
  const [typographyMode, setTypographyMode] = useState<TypographyMode>("serif");
  const [copyMode, setCopyMode] = useState<CopyMode>("artwork");
  const [forcedReducedMotion, setForcedReducedMotion] = useState(false);
  const [showOverlayKey, setShowOverlayKey] = useState(true);

  const effectiveReducedMotion = systemReducedMotion || forcedReducedMotion;

  return (
    <>
      {/* 1. Master Top Navigation Bar */}
      <header className="ark-hero-topbar">
        <a href="/lab" className="ark-hero-brand">
          <span>ĀRK</span>
          <span className="ark-hero-brand-tag">/ LAB</span>
        </a>

        <div className="ark-hero-status-beacon">
          <span className="ark-hero-status-dot" />
          <span>INSTRUMENT · ACTIVE</span>
        </div>

        <div className="ark-hero-topbar-actions">
          <a href="/lab/synthesis" className="ark-hero-nav-link">
            ← Synthesis v3
          </a>
          <a href="/lab/experiment" className="ark-hero-nav-link">
            Four-Territory Map
          </a>
          <a href="#primary-hero-cta" className="ark-hero-topbar-cta">
            ENTER THE ATLAS <span>→</span>
          </a>
        </div>
      </header>

      {/* 2. Master Plate Wrapper */}
      <main id="main-stage" className="ark-plate-wrapper" tabIndex={-1}>
        <div className="ark-fig-plate">
          {/* Corner Registration Marks (+) */}
          <span className="ark-corner-mark ark-corner-tl" aria-hidden="true">+</span>
          <span className="ark-corner-mark ark-corner-tr" aria-hidden="true">+</span>
          <span className="ark-corner-mark ark-corner-bl" aria-hidden="true">+</span>
          <span className="ark-corner-mark ark-corner-br" aria-hidden="true">+</span>

          {/* Plate Title Header Block */}
          <div className="ark-plate-header">
            <div className="ark-plate-header-primary">
              <span className="ark-plate-fig-badge">FIG. 0</span>
              <span>· THE HORIZON SCALE · INDIVIDUAL → COSMIC</span>
            </div>
            <div className="ark-plate-header-rev">
              <span>LAT 28°36'N · LON 77°12'E</span>
              <span>REV 2026.08 · SHEET 1</span>
            </div>
          </div>

          {/* Masterwork Stage Canvas Container */}
          <div className="ark-hero-stage-canvas-wrap">
            {/* Layer 0: High-Resolution Authentic Masterwork Background Artwork */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/extraordinary-capability-at-dawn.png"
              alt="Extraordinary Capability at Dawn masterwork hero plate"
              className="ark-stage-masterwork-bg"
            />

            {/* Layer 1: Ambient 60fps Particle Sky Canvas */}
            <ParticleSkyCanvas reducedMotion={effectiveReducedMotion} />

            {/* Layer 2: Dynamic Celestial Astrolabe & Polar Coordinates */}
            <CelestialAstrolabe
              activeStratum={activeStratum}
              onHoverStratum={setActiveStratum}
              reducedMotion={effectiveReducedMotion}
              showOverlayKey={showOverlayKey}
            />

            {/* Layer 3: Atmospheric Vector Illumination & Dawn Breathing Flare */}
            <TerrainRidges reducedMotion={effectiveReducedMotion} />

            {/* Layer 4A: Zenith Motto (Floating Upper Celestial Sky) */}
            <div className="ark-motto-zenith-bar" aria-label="Zenith Humility Motto">
              <span className="ark-motto-badge">ZENITH 90°N</span>
              <span className="ark-motto-quote">&ldquo;I AM NOT THE CENTER OF EXISTENCE.&rdquo;</span>
            </div>

            {/* Layer 4B: Azimuth Motto (Floating Mid-Upper Sky) */}
            <div className="ark-motto-azimuth" aria-label="Azimuth Ambition Motto">
              <div className="ark-motto-azimuth-header">
                <span>AZIMUTH 180°W</span>
                <span style={{ fontSize: "9px" }}>· AMBITION</span>
              </div>
              <div style={{ color: "var(--ark-ink-hi)", fontWeight: 600 }}>
                &ldquo;Do not make yourself smaller than you are capable of becoming.&rdquo;
              </div>
            </div>

            {/* Layer 4C: Interactive UI Machinery Grid */}
            <div className="ark-hero-stage-grid">
              {/* Column 1: Left Hero Apparatus (5.2/12) */}
              <div className="ark-apparatus-col">
                <div className="ark-apparatus-top">
                  <span className="ark-apparatus-eyebrow">
                    PLATE 00 · FIRST PRINCIPLES HORIZON
                  </span>

                  {/* H1 Headline Options */}
                  {copyMode === "artwork" ? (
                    <h1
                      className={`ark-hero-h1 ${
                        typographyMode === "serif" ? "font-serif" : "font-sans"
                      }`}
                    >
                      Extraordinary Capability. Rooted in Consciousness.
                    </h1>
                  ) : (
                    <h1
                      className={`ark-hero-h1 ${
                        typographyMode === "serif" ? "font-serif" : "font-sans"
                      }`}
                    >
                      You are not short of information. You are short of a reliable map.
                    </h1>
                  )}

                  {/* Subtitle Prose Options */}
                  {copyMode === "artwork" ? (
                    <p className="ark-hero-subtitle">
                      A knowledge platform uniting science and spirituality, ambition and devotion,
                      intellect and wisdom — to help you become the complete human.
                    </p>
                  ) : (
                    <p className="ark-hero-subtitle">
                      ĀRK builds research and intelligence tools for people who would rather
                      understand something completely than believe it quickly. Every claim verified,
                      sourced, and calibrated across four strata of knowledge.
                    </p>
                  )}

                  {/* Single Primary CTA */}
                  <div className="ark-apparatus-actions">
                    <a
                      id="primary-hero-cta"
                      href="/lab/synthesis"
                      className="ark-primary-cta"
                      aria-label="Enter the Atlas"
                    >
                      <span>ENTER THE ATLAS</span>
                      <span className="ark-primary-cta-arrow">→</span>
                    </a>
                  </div>
                </div>

                {/* Bounded Citation Card (63 Primary Sources) */}
                <InstrumentCitationCard reducedMotion={effectiveReducedMotion} />
              </div>

              {/* Column 2: Center Celestial Viewport (4.2/12) */}
              <div className="ark-celestial-col" />

              {/* Column 3: Right Horizon Strata Ladder (2.6/12) */}
              <HorizonStrataLadder
                activeStratum={activeStratum}
                onSelectStratum={setActiveStratum}
              />
            </div>
          </div>

          {/* Plate Footer Block */}
          <div className="ark-plate-footer">
            <span>SCALE: 1:1 · COORDINATES: 28°36'N, 77°12'E · AZIMUTH: 090°</span>
            <span>END OF PLATE 0 · ĀRK CARTOGRAPHY</span>
          </div>
        </div>
      </main>

      {/* Specimen Proof Strip */}
      <footer className="ark-hero-proof-strip">
        <span>
          <strong>PROOF STRING:</strong> ĀRK · Vimāna · Sāṃkhya — Ā ā Ī ī Ṃ ṃ Ṛ ṛ · ₹1,299
        </span>
        <span>
          <strong>GOVERNING LAW:</strong> CONSTITUTION L1–L6 · TEKTRONIX GLOW LAW · RADIUS 0
        </span>
      </footer>

      {/* Floating Interactive Review Controls */}
      <ExperimentControls
        typographyMode={typographyMode}
        onSetTypographyMode={setTypographyMode}
        copyMode={copyMode}
        onSetCopyMode={setCopyMode}
        forcedReducedMotion={forcedReducedMotion}
        onToggleReducedMotion={() => setForcedReducedMotion(!forcedReducedMotion)}
        showOverlayKey={showOverlayKey}
        onToggleOverlayKey={() => setShowOverlayKey(!showOverlayKey)}
      />
    </>
  );
}
