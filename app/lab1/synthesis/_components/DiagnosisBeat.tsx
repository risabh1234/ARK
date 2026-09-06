"use client";

import type { ReactElement } from "react";
import { FourTerritoryMap, type TerritoryId } from "./FourTerritoryMap";
import { CartographersHand } from "./CartographersHand";

interface DiagnosisBeatProps {
  hoveredTerritory?: TerritoryId | null;
  setHoveredTerritory?: (id: TerritoryId | null) => void;
  reducedMotion?: boolean;
}

export function DiagnosisBeat({
  hoveredTerritory,
  setHoveredTerritory,
  reducedMotion = false,
}: DiagnosisBeatProps): ReactElement {
  return (
    <section id="beat-2" className="v3-section" aria-labelledby="diagnosis-heading">
      <div className="v3-diagnosis-grid">
        {/* Left Column: Heading & Prose Stack */}
        <div className="v3-diagnosis-text-stack">
          <span className="v3-section-eyebrow">THE DIAGNOSIS</span>

          <h2 id="diagnosis-heading" className="v3-section-h2">
            You are not short of information. You are short of integration.
          </h2>

          <p className="v3-lead-prose">
            Every day you cross four territories that were mapped by people who deny each other&apos;s borders. Science explains the mechanism and stops at the meaning. Markets optimise the outcome and skip the cost. Psychology maps the feeling and cannot rank it. Inherited tradition carries the purpose and distrusts the method. You are handed four maps and no shared legend. The dissonance you feel and rarely name is the gap between them.
          </p>

          <p className="v3-lead-prose">
            ĀRK&apos;s work is to draw one legend across all four — not by pretending they agree, but by showing exactly where they touch, and what each one gets right.
          </p>

          <CartographersHand />

          <div style={{ marginTop: "24px" }}>
            <a href="#beat-3" className="v3-tertiary-link">
              How the method works <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        {/* Right Column: Fig. 1 Astrolabe Map */}
        <div className="v3-diagnosis-map-wrap">
          <FourTerritoryMap
            hovered={hoveredTerritory}
            setHovered={setHoveredTerritory}
            reducedMotion={reducedMotion}
          />
        </div>
      </div>
    </section>
  );
}
