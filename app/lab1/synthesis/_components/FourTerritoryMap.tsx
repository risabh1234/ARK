"use client";

import { useState, type ReactElement, type KeyboardEvent } from "react";

export type TerritoryId = "measurable" | "marketable" | "wanted" | "inherited";

interface TerritoryDef {
  id: TerritoryId;
  name: string;
  sub: string;
  quadrantName: string;
  description: string;
  pattern: string;
  failure: string;
  x: number;
  y: number;
  width: number;
  height: number;
  textX: number;
  textY: number;
}

const TERRITORIES: ReadonlyArray<TerritoryDef> = [
  {
    id: "measurable",
    name: "THE MEASURABLE",
    sub: "Science · Data · Matter",
    quadrantName: "NORTHWEST",
    description: "The empirical domain: physical mechanism, biological substrate, reproducible observation.",
    pattern: "url(#ark-pat-stipple)",
    failure: "THE MEASURABLE — Explains the mechanism. Denies the meaning.",
    x: 20,
    y: 20,
    width: 270,
    height: 195,
    textX: 40,
    textY: 60,
  },
  {
    id: "marketable",
    name: "THE MARKETABLE",
    sub: "Ambition · Power · Systems",
    quadrantName: "NORTHEAST",
    description: "The economic domain: capital allocation, systemic leverage, competitive optimization.",
    pattern: "url(#ark-pat-bedding)",
    failure: "THE MARKETABLE — Optimises the outcome. Skips the cost.",
    x: 310,
    y: 20,
    width: 270,
    height: 195,
    textX: 330,
    textY: 60,
  },
  {
    id: "wanted",
    name: "THE WANTED",
    sub: "Desire · Psychology · Experience",
    quadrantName: "SOUTHWEST",
    description: "The psychological domain: subjective desire, emotional valence, aesthetic experience.",
    pattern: "url(#ark-pat-hatch)",
    failure: "THE WANTED — Maps the feeling. Cannot rank it.",
    x: 20,
    y: 235,
    width: 270,
    height: 195,
    textX: 40,
    textY: 275,
  },
  {
    id: "inherited",
    name: "THE INHERITED",
    sub: "Meaning · Ethics · Consciousness",
    quadrantName: "SOUTHEAST",
    description: "The philosophical domain: existential purpose, ethical frameworks, conscious agency.",
    pattern: "url(#ark-pat-unsurveyed)",
    failure: "THE INHERITED — Carries the purpose. Distrusts the method.",
    x: 310,
    y: 235,
    width: 270,
    height: 195,
    textX: 330,
    textY: 275,
  },
];

interface FourTerritoryMapProps {
  hovered?: TerritoryId | null;
  setHovered?: (id: TerritoryId | null) => void;
  reducedMotion?: boolean;
}

export function FourTerritoryMap({
  hovered: controlledHovered,
  setHovered: setControlledHovered,
  reducedMotion = false,
}: FourTerritoryMapProps): ReactElement {
  const [localHovered, setLocalHovered] = useState<TerritoryId | null>("measurable");

  const hovered = controlledHovered !== undefined ? controlledHovered : localHovered;
  const setHovered = setControlledHovered ?? setLocalHovered;

  const activeTerritory = TERRITORIES.find((t) => t.id === (hovered || "measurable")) || TERRITORIES[0];

  const handleKeyDown = (e: KeyboardEvent<SVGGElement>, id: TerritoryId) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setHovered(id);
    }
  };

  return (
    <figure
      role="group"
      aria-labelledby="fig1-title"
      data-reduced-motion={reducedMotion ? "true" : undefined}
      className={`v3-fig1-figure ark-fig1-card ${reducedMotion ? "motion-reduced" : ""}`}
    >
      <div className="v3-fig1-head" id="fig1-title">
        FIG. 1 · THE FOUR TERRITORIES OF HUMAN KNOWLEDGE · SCALE 1:1 · REV 2026.08 · SHEET 1/1
      </div>

      <div className="v3-fig1-svg-wrap">
        <svg
          viewBox="0 0 600 460"
          className="v3-fig1-svg ark-fig1-svg"
          role="img"
          aria-label="Quad-territory chart: The Measurable, The Marketable, The Wanted, The Inherited, meeting at a central reticle with disputed borders."
        >
          {/* Outer Border */}
          <rect x="19.5" y="19.5" width="561" height="411" fill="none" stroke="var(--ark-rule-strong)" strokeWidth="1" />

          {/* 4 Quadrants */}
          {TERRITORIES.map((t) => {
            const isCurrent = (hovered || "measurable") === t.id;
            return (
              <g
                key={t.id}
                role="button"
                tabIndex={0}
                aria-label={`${t.name} — ${t.sub}. ${t.failure}`}
                className={`v3-quadrant-group ark-quadrant-group ${isCurrent ? "quad-active" : ""}`}
                onMouseEnter={() => setHovered(t.id)}
                onFocus={() => setHovered(t.id)}
                onClick={() => setHovered(t.id)}
                onKeyDown={(e) => handleKeyDown(e, t.id)}
              >
                {/* Background Pattern Fill */}
                <rect
                  x={t.x}
                  y={t.y}
                  width={t.width}
                  height={t.height}
                  fill={t.pattern}
                  fillOpacity={isCurrent ? 0.85 : 0.4}
                  className="v3-quad-bg quad-bg"
                />

                {/* Selection Highlight Border */}
                {isCurrent && (
                  <rect
                    x={t.x + 0.5}
                    y={t.y + 0.5}
                    width={t.width - 1}
                    height={t.height - 1}
                    fill="none"
                    stroke="var(--ark-amber)"
                    strokeWidth="1.5"
                  />
                )}

                {/* Territory Label */}
                <text
                  x={t.textX}
                  y={t.textY}
                  fill={isCurrent ? "var(--ark-ink-hi)" : "var(--ark-ink)"}
                  fontFamily="var(--ark-font-display)"
                  fontSize="14"
                  fontWeight="600"
                  letterSpacing="0.04em"
                  className="quad-title"
                >
                  {t.name}
                </text>

                {/* Sub-label triad */}
                <text
                  x={t.textX}
                  y={t.textY + 20}
                  fill="var(--ark-muted)"
                  fontFamily="var(--ark-font-mono)"
                  fontSize="10"
                  letterSpacing="0.06em"
                  className="quad-sub"
                >
                  {t.sub}
                </text>
              </g>
            );
          })}

          {/* Disputed Internal Seams (Dashed Signal-Red Hairlines at 40% opacity) */}
          <line
            x1="300"
            y1="20"
            x2="300"
            y2="430"
            stroke="var(--ark-signal-red)"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <line
            x1="20"
            y1="227.5"
            x2="580"
            y2="227.5"
            stroke="var(--ark-signal-red)"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Central Navigational Reticle */}
          <circle cx="300" cy="227.5" r="16" fill="var(--ark-bg-raised)" stroke="var(--ark-muted)" strokeWidth="1" />
          <line x1="290" y1="227.5" x2="310" y2="227.5" stroke="var(--ark-ink-hi)" strokeWidth="1.5" />
          <line x1="300" y1="217.5" x2="300" y2="237.5" stroke="var(--ark-ink-hi)" strokeWidth="1.5" />
          <circle cx="300" cy="227.5" r="2" fill="var(--ark-amber)" />

          <text
            x="300"
            y="256"
            fill="var(--ark-muted)"
            fontFamily="var(--ark-font-mono)"
            fontSize="8"
            letterSpacing="0.1em"
            textAnchor="middle"
          >
            YOU ARE HERE
          </text>
        </svg>
      </div>

      {/* Rich Readout Panel (Harvested V2 Structure + V3 Substance) */}
      <div className="v3-fig1-readout-panel ark-territory-detail">
        <div className="readout-header">
          <span className="readout-tag detail-tag">{activeTerritory.quadrantName} QUADRANT</span>
        </div>

        <h3 className="readout-title detail-title">{activeTerritory.name}</h3>
        <p className="readout-sub detail-sub">{activeTerritory.sub}</p>
        <p className="readout-desc detail-desc">{activeTerritory.description}</p>

        <div className="readout-failmode detail-failmode">
          <p className="v3-fig1-caption-text failmode-quote" aria-live="polite">
            &ldquo;{activeTerritory.failure}&rdquo;
          </p>
        </div>
      </div>
    </figure>
  );
}
