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
    <aside className="ark-ladder-col" aria-label="Horizon Strata Ladder and Telemetry">
      <div>
        <div className="ark-ladder-header">
          <span>HORIZON STRATA</span>
          <span style={{ color: "var(--ark-amber)" }}>ALT · 4 TIERS</span>
        </div>

        <ul className="ark-ladder-list">
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
                  <span className="ark-ladder-dot" />
                  <div className="ark-ladder-content">
                    <div className="ark-ladder-tag">{tier.tag}</div>
                    <div className="ark-ladder-title">{tier.title}</div>
                    <div className="ark-ladder-coord">{tier.coord}</div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Live Telemetry Display */}
      <div className="ark-ladder-footer-telemetry">
        <div className="ark-telemetry-row">
          <span>COORDINATES</span>
          <span className="ark-telemetry-val">28°36'N · 77°12'E</span>
        </div>
        <div className="ark-telemetry-row">
          <span>ACTIVE RETICLE</span>
          <span className="ark-telemetry-val">
            {activeStratum ? activeStratum.toUpperCase() : "HORIZON ZERO"}
          </span>
        </div>
        <div className="ark-telemetry-row">
          <span>PRAMĀṆA STATUS</span>
          <span style={{ color: "var(--ark-success)", fontWeight: 700 }}>LOCK 100%</span>
        </div>
      </div>
    </aside>
  );
});
