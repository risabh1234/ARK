"use client";

import { memo, type ReactElement } from "react";

export type HorizonStratumId = "individual" | "civilizational" | "planetary" | "cosmic";

interface CelestialAstrolabeProps {
  activeStratum: HorizonStratumId | null;
  onHoverStratum: (id: HorizonStratumId | null) => void;
  reducedMotion?: boolean;
  showOverlayKey?: boolean;
}

export const CelestialAstrolabe = memo(function CelestialAstrolabe({
  activeStratum,
  onHoverStratum,
  reducedMotion = false,
  showOverlayKey = true,
}: CelestialAstrolabeProps): ReactElement {
  const originX = 660;
  const originY = 340;

  // Degrees for outer coordinate dial
  const degreeSteps = [
    { deg: 0, label: "000°N" },
    { deg: 30, label: "030°" },
    { deg: 60, label: "060°" },
    { deg: 90, label: "090°E" },
    { deg: 120, label: "120°" },
    { deg: 150, label: "150°" },
    { deg: 180, label: "180°S" },
    { deg: 210, label: "210°" },
    { deg: 240, label: "240°" },
    { deg: 270, label: "270°W" },
    { deg: 300, label: "300°" },
    { deg: 330, label: "330°" },
  ];

  return (
    <svg
      viewBox="0 0 1000 800"
      preserveAspectRatio="xMidYMid slice"
      className="ark-stage-astrolabe-layer"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Celestial astrolabe polar coordinate reticle"
      role="img"
    >
      <defs>
        <filter id="astrolabeAmberGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. Main Polar Axis & Azimuth Hairlines */}
      <g stroke="rgba(240, 231, 216, 0.15)" strokeWidth="0.75" opacity="0.6">
        {/* Horizontal Equatorial Axis */}
        <line x1="200" y1={originY} x2="1000" y2={originY} strokeDasharray="3 3" />
        {/* Vertical Zenith / Meridian Axis */}
        <line x1={originX} y1="20" x2={originX} y2="660" strokeDasharray="3 3" />
        {/* 45° Diagonal Axes */}
        <line x1="380" y1="60" x2="940" y2="620" strokeDasharray="1 4" />
        <line x1="940" y1="60" x2="380" y2="620" strokeDasharray="1 4" />
      </g>

      {/* 2. Slowly Drifting Astrolabe Outer Ticks (Drift Group) */}
      <g
        className={reducedMotion ? "" : "ark-astrolabe-spin-slow"}
        style={{ transformOrigin: `${originX}px ${originY}px` }}
      >
        {/* Outer Fine Tick Ring */}
        <circle
          cx={originX}
          cy={originY}
          r="360"
          stroke="var(--ark-faint)"
          strokeWidth="0.5"
          strokeDasharray="1.5 5"
          opacity="0.4"
        />

        {/* Outer Degree Markers */}
        {degreeSteps.map(({ deg, label }) => {
          const rad = (deg - 90) * (Math.PI / 180);
          const x1 = originX + 350 * Math.cos(rad);
          const y1 = originY + 350 * Math.sin(rad);
          const x2 = originX + 370 * Math.cos(rad);
          const y2 = originY + 370 * Math.sin(rad);
          const tx = originX + 385 * Math.cos(rad);
          const ty = originY + 385 * Math.sin(rad);

          return (
            <g key={deg} opacity="0.5">
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ark-muted)" strokeWidth="0.75" />
              {showOverlayKey && (
                <text
                  x={tx}
                  y={ty + 3}
                  fill="var(--ark-muted)"
                  fontSize="7.5"
                  fontFamily="monospace"
                  textAnchor="middle"
                  letterSpacing="0.05em"
                >
                  {label}
                </text>
              )}
            </g>
          );
        })}
      </g>

      {/* 3. Reversing Astrolabe Pattern Layer (Declination Arcs) */}
      <g
        className={reducedMotion ? "" : "ark-astrolabe-spin-reverse"}
        style={{ transformOrigin: `${originX}px ${originY}px` }}
        opacity="0.3"
      >
        <circle
          cx={originX}
          cy={originY}
          r="300"
          stroke="rgba(240, 231, 216, 0.2)"
          strokeWidth="0.75"
          strokeDasharray="4 6 2 6"
        />
        <circle
          cx={originX}
          cy={originY}
          r="200"
          stroke="rgba(240, 231, 216, 0.2)"
          strokeWidth="0.5"
          strokeDasharray="2 8"
        />
      </g>

      {/* 4. Four Interactive Concentric Strata Rings */}
      {/* Ring 3: Cosmic Civilization (Radius 340px) */}
      <circle
        id="ring-cosmic"
        cx={originX}
        cy={originY}
        r="340"
        className={`ark-astrolabe-ring ring-cosmic ${activeStratum === "cosmic" ? "highlighted" : ""}`}
        strokeWidth="1"
        style={{ pointerEvents: "auto", cursor: "pointer" }}
        onMouseEnter={() => onHoverStratum("cosmic")}
        onMouseLeave={() => onHoverStratum(null)}
        filter={activeStratum === "cosmic" ? "url(#astrolabeAmberGlow)" : undefined}
      />

      {/* Ring 2: Planetary Horizon (Radius 240px) */}
      <circle
        id="ring-planetary"
        cx={originX}
        cy={originY}
        r="240"
        className={`ark-astrolabe-ring ring-planetary ${activeStratum === "planetary" ? "highlighted" : ""}`}
        strokeWidth="1"
        style={{ pointerEvents: "auto", cursor: "pointer" }}
        onMouseEnter={() => onHoverStratum("planetary")}
        onMouseLeave={() => onHoverStratum(null)}
        filter={activeStratum === "planetary" ? "url(#astrolabeAmberGlow)" : undefined}
      />

      {/* Ring 1: Civilizational Scale (Radius 150px) */}
      <circle
        id="ring-civilizational"
        cx={originX}
        cy={originY}
        r="150"
        className={`ark-astrolabe-ring ring-civilizational ${activeStratum === "civilizational" ? "highlighted" : ""}`}
        strokeWidth="1"
        style={{ pointerEvents: "auto", cursor: "pointer" }}
        onMouseEnter={() => onHoverStratum("civilizational")}
        onMouseLeave={() => onHoverStratum(null)}
        filter={activeStratum === "civilizational" ? "url(#astrolabeAmberGlow)" : undefined}
      />

      {/* Ring 0: Individual Mastery (Radius 65px) */}
      <circle
        id="ring-individual"
        cx={originX}
        cy={originY}
        r="65"
        className={`ark-astrolabe-ring ring-individual ${activeStratum === "individual" ? "highlighted" : ""}`}
        strokeWidth="1.2"
        style={{ pointerEvents: "auto", cursor: "pointer" }}
        onMouseEnter={() => onHoverStratum("individual")}
        onMouseLeave={() => onHoverStratum(null)}
        filter={activeStratum === "individual" ? "url(#astrolabeAmberGlow)" : undefined}
      />

      {/* 5. Astrolabe Coordinate Notches & Crosshairs */}
      <g stroke="var(--ark-amber)" strokeWidth="1" opacity="0.85">
        <line x1={originX - 14} y1={originY} x2={originX - 4} y2={originY} />
        <line x1={originX + 4} y1={originY} x2={originX + 14} y2={originY} />
        <line x1={originX} y1={originY - 14} x2={originX} y2={originY - 4} />
        <line x1={originX} y1={originY + 4} x2={originX} y2={originY + 14} />
        <circle cx={originX} cy={originY} r="2" fill="var(--ark-amber)" />
      </g>

      {/* 6. Active Stratum Coordinate Annotation Callout (When a ring is active) */}
      {activeStratum && (
        <g transform={`translate(${originX + 15}, ${originY - 100})`}>
          <rect
            x="0"
            y="0"
            width="170"
            height="36"
            fill="rgba(24, 19, 16, 0.9)"
            stroke="var(--ark-amber)"
            strokeWidth="1"
          />
          <text
            x="10"
            y="15"
            fill="var(--ark-amber)"
            fontSize="9"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="0.08em"
          >
            ACTIVE HORIZON RETICLE
          </text>
          <text
            x="10"
            y="28"
            fill="var(--ark-ink-hi)"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="0.04em"
          >
            {activeStratum === "cosmic" && "H·03 COSMIC SCALE (440km)"}
            {activeStratum === "planetary" && "H·02 PLANETARY SCALE (330km)"}
            {activeStratum === "civilizational" && "H·01 CIVILIZATIONAL (220km)"}
            {activeStratum === "individual" && "YOU · INDIVIDUAL ORIGIN (0km)"}
          </text>
        </g>
      )}
    </svg>
  );
});
