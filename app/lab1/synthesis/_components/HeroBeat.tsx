"use client";

import { useState, type ReactElement } from "react";
import { ParticleSkyCanvas } from "./ParticleSkyCanvas";
import { CelestialAstrolabe, type HorizonStratumId } from "./CelestialAstrolabe";
import { TerrainRidges } from "./TerrainRidges";
import { HorizonStrataLadder } from "./HorizonStrataLadder";

interface HeroBeatProps {
  reducedMotion?: boolean;
}

export function HeroBeat({ reducedMotion = false }: HeroBeatProps): ReactElement {
  const [activeHorizonStratum, setActiveHorizonStratum] = useState<HorizonStratumId | null>(null);

  return (
    <section id="beat-1" className="v3-section ark-hero-beat-section" aria-labelledby="beat-1-h">
      <div className="ark-fig-plate">
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
          <ParticleSkyCanvas reducedMotion={reducedMotion} />

          {/* Layer 2: Dynamic Celestial Astrolabe & Polar Coordinates */}
          <CelestialAstrolabe
            activeStratum={activeHorizonStratum}
            onHoverStratum={setActiveHorizonStratum}
            reducedMotion={reducedMotion}
            showOverlayKey={true}
          />

          {/* Layer 3: Atmospheric Vector Illumination & Dawn Breathing Flare */}
          <TerrainRidges reducedMotion={reducedMotion} />

          {/* Layer 4A: Zenith Motto (Floating Upper Celestial Sky) */}
          <div className="ark-motto-zenith-bar" aria-label="Zenith Humility Motto">
            <span className="ark-motto-badge">[ ZENITH 90°N ]</span>
            <span className="ark-motto-quote">&ldquo;I AM NOT THE CENTER OF EXISTENCE.&rdquo;</span>
          </div>

          {/* Layer 4B: Azimuth Motto (Floating Mid-Upper Sky) */}
          <div className="ark-motto-azimuth" aria-label="Azimuth Ambition Motto">
            <div className="ark-motto-azimuth-header">
              <span>[ AZIMUTH 180°W · AMBITION ]</span>
            </div>
            <div className="ark-motto-azimuth-quote">
              &ldquo;Do not make yourself smaller than you are capable of becoming.&rdquo;
            </div>
          </div>

          {/* Layer 4C: Interactive UI Machinery Grid */}
          <div className="ark-hero-stage-grid v3-hero-grid">
            {/* Column 1: Left Hero Apparatus (5.2/12) */}
            <div className="ark-apparatus-col v3-hero-text-stack">
              <div className="ark-apparatus-top">
                <span className="v3-section-eyebrow ark-apparatus-eyebrow">
                  <span className="ark-eyebrow-pip" aria-hidden="true" />
                  <span>A KNOWLEDGE INSTRUMENT FOR THE COMPLETE HUMAN</span>
                </span>

                <h1 id="beat-1-h" className="ark-hero-h1 v3-hero-h1 font-sans">
                  Extraordinary Capability.<br className="ark-hero-h1-break" />
                  Rooted in Consciousness.
                </h1>

                <p className="ark-hero-subtitle v3-hero-hook">
                  A research platform that unites science and philosophy, ambition and meaning, evidence and interpretation — so you can understand something completely instead of believing it quickly. Every claim is sourced, dated, and typed by the kind of evidence behind it. Where the work is unfinished, we mark it and say so.
                </p>

                {/* Single Primary CTA + Tertiary Link */}
                <div className="ark-apparatus-actions v3-hero-actions">
                  <a
                    id="primary-hero-cta"
                    href="#beat-2"
                    className="v3-btn-primary ark-primary-cta"
                    aria-label="Enter the Atlas"
                  >
                    <span>ENTER THE ATLAS</span>
                    <span className="ark-primary-cta-arrow" aria-hidden="true">→</span>
                  </a>
                  <a href="#beat-5" className="v3-tertiary-link ark-tertiary-btn">
                    <span>READ A SAMPLE BRIEF</span>
                    <span className="ark-tertiary-arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Center Celestial Viewport (4.2/12) - Frames seeker silhouette & astrolabe */}
            <div className="ark-celestial-col" />

            {/* Column 3: Right Horizon Strata Ladder (2.6/12) */}
            <HorizonStrataLadder
              activeStratum={activeHorizonStratum}
              onSelectStratum={setActiveHorizonStratum}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
