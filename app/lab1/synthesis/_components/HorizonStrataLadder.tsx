"use client";

import { memo, type ReactElement } from "react";
import type { HorizonStratumId } from "./CelestialAstrolabe";

interface HorizonStrataLadderProps {
  activeStratum: HorizonStratumId | null;
  onSelectStratum: (id: HorizonStratumId | null) => void;
}

interface StratumTier {
  id: HorizonStratumId;
  tag: string;
  title: string;
  coord: string;
}

const STRATA_TIERS: StratumTier[] = [
  {
    id: "cosmic",
    tag: "H · 03",
    title: "Cosmic Civilization",
    coord: "ZENITH 90°N · 440KM",
  },
  {
    id: "planetary",
    tag: "H · 02",
    title: "Planetary Horizon",
    coord: "ORBIT 45°N · 330KM",
  },
  {
    id: "civilizational",
    tag: "H · 01",
    title: "Civilizational Scale",
    coord: "VALLEY 15°N · 220KM",
  },
  {
    id: "individual",
    tag: "YOU",
    title: "Individual Mastery",
    coord: "SUMMIT 0° · 0KM",
  },
];

export const HorizonStrataLadder = memo(function HorizonStrataLadder({
  activeStratum,
  onSelectStratum,
}: HorizonStrataLadderProps): ReactElement {
  return (
    <aside className="ark-ladder-col" aria-label="Horizon Strata Ladder and Altitude Tiers">
      <div className="ark-ladder-inner">
        <div className="ark-ladder-header">
          <span className="ark-ladder-header-title">HORIZON STRATA</span>
          <span className="ark-ladder-header-badge">ALT · 4 TIERS</span>
        </div>

        <ul className="ark-ladder-list" role="list">
          {STRATA_TIERS.map((tier) => {
            const isActive = activeStratum === tier.id;
            return (
              <li key={tier.id}>
                <button
                  type="button"
                  className={`ark-ladder-item ${isActive ? "active" : ""}`}
                  onMouseEnter={() => onSelectStratum(tier.id)}
                  onMouseLeave={() => onSelectStratum(null)}
                  onFocus={() => onSelectStratum(tier.id)}
                  onBlur={() => onSelectStratum(null)}
                  aria-pressed={isActive}
                  style={{ width: "100%", textAlign: "left" }}
                >
                  <span className="ark-ladder-dot" aria-hidden="true" />
                  <div className="ark-ladder-content">
                    <div className="ark-ladder-tag">{tier.tag}</div>
                    <div className="ark-ladder-title">{tier.title}</div>
                    <div className="ark-ladder-coord">{tier.coord}</div>
                  </div>
                  <span className="ark-ladder-item-arrow" aria-hidden="true">→</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="ark-ladder-hint" aria-hidden="true">
          <span className="ark-ladder-hint-pip">◉</span>
          <span>HOVER TIER TO ENGAGE RETICLE</span>
        </div>
      </div>
    </aside>
  );
});
