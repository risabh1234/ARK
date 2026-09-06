import type { ReactElement } from "react";

interface CelestialPlateProps {
  reducedMotion?: boolean;
}

export function CelestialPlate({ reducedMotion = false }: CelestialPlateProps): ReactElement {
  return (
    <figure
      className="v3-celestial-plate ark-horizon-figure"
      aria-labelledby="fig0-cap"
    >
      {/* Plate Header Title Block */}
      <div className="v3-plate-title-block">
        <span>FIG. 0 · THE HORIZON SCALE</span>
        <span>SHEET 1/1</span>
      </div>

      <div className="v3-plate-canvas-wrap">
        <svg
          viewBox="0 0 600 480"
          className="v3-celestial-svg ark-horizon-svg"
          role="img"
          aria-label="The horizon scale: individual mastery to cosmic civilization across four concentric coordinate rings, solitary seeker on the summit ridge."
        >
          <defs>
            {/* Dawn Glow Radial Gradient — Strictly <= 0.06 core per Von Restorff & Anti-list #14 */}
            <radialGradient
              id="synthesis-dawn-glow"
              cx="50%"
              cy="65%"
              r="60%"
              fx="50%"
              fy="65%"
            >
              <stop offset="0%" stopColor="#ffb000" stopOpacity="0.06" />
              <stop offset="35%" stopColor="#BA3C0F" stopOpacity="0.04" />
              <stop offset="70%" stopColor="#282018" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#181310" stopOpacity="0" />
            </radialGradient>

            {/* Ridge Gradient */}
            <linearGradient id="synthesis-ridge-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#211a14" />
              <stop offset="100%" stopColor="#110d0b" />
            </linearGradient>
          </defs>

          {/* Calibrated Dawn Glow Field */}
          <rect x="0" y="0" width="600" height="480" fill="url(#synthesis-dawn-glow)" />

          {/* Coordinate Grid Guides */}
          <g opacity="0.15" stroke="var(--ark-ink)" strokeWidth="0.75">
            <line x1="300" y1="20" x2="300" y2="460" strokeDasharray="2 4" />
            <line x1="40" y1="290" x2="560" y2="290" strokeDasharray="2 4" />
          </g>

          {/* Subtle Sunrise Glow Arcs behind rings (<= 0.04) */}
          <circle cx="300" cy="290" r="190" fill="none" stroke="rgba(255, 176, 0, 0.03)" strokeWidth="40" />
          <circle cx="300" cy="290" r="260" fill="none" stroke="rgba(255, 176, 0, 0.015)" strokeWidth="60" />

          {/* Concentric Coordinate Rings (YOU -> H-01 -> H-02 -> H-03) */}
          {/* Ring 4: H-03 Cosmic Civilization */}
          <ellipse
            cx="300"
            cy="290"
            rx="270"
            ry="230"
            fill="none"
            stroke="var(--ark-faint)"
            strokeWidth="1"
            strokeDasharray="4 6"
            pathLength="1"
            className={!reducedMotion ? "v3-ring-4" : undefined}
          />
          <text
            x="300"
            y="72"
            textAnchor="middle"
            fill="var(--ark-muted)"
            fontFamily="var(--ark-font-mono)"
            fontSize="10"
            letterSpacing="0.1em"
            className="ark-ring-label"
          >
            H·03 · COSMIC CIVILIZATION
          </text>

          {/* Ring 3: H-02 Planetary Horizon */}
          <ellipse
            cx="300"
            cy="290"
            rx="190"
            ry="160"
            fill="none"
            stroke="var(--ark-faint)"
            strokeWidth="1"
            strokeDasharray="2 4"
            pathLength="1"
            className={!reducedMotion ? "v3-ring-3" : undefined}
          />
          <text
            x="300"
            y="142"
            textAnchor="middle"
            fill="var(--ark-muted)"
            fontFamily="var(--ark-font-mono)"
            fontSize="10"
            letterSpacing="0.1em"
            className="ark-ring-label"
          >
            H·02 · PLANETARY HORIZON
          </text>

          {/* Ring 2: H-01 Civilizational Scale */}
          <ellipse
            cx="300"
            cy="290"
            rx="115"
            ry="95"
            fill="none"
            stroke="var(--ark-amber)"
            strokeOpacity="0.4"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            pathLength="1"
            className={!reducedMotion ? "v3-ring-2" : undefined}
          />
          <text
            x="300"
            y="206"
            textAnchor="middle"
            fill="var(--ark-muted)"
            fontFamily="var(--ark-font-mono)"
            fontSize="10"
            letterSpacing="0.08em"
            className="ark-ring-label"
          >
            H·01 · CIVILIZATIONAL SCALE
          </text>

          {/* Ring 1: YOU Individual Mastery */}
          <ellipse
            cx="300"
            cy="290"
            rx="45"
            ry="38"
            fill="rgba(255, 176, 0, 0.05)"
            stroke="var(--ark-ink-hi)"
            strokeWidth="1.5"
            pathLength="1"
            className={!reducedMotion ? "v3-ring-1" : undefined}
          />
          <text
            x="300"
            y="262"
            textAnchor="middle"
            fill="var(--ark-ink-hi)"
            fontFamily="var(--ark-font-mono)"
            fontSize="9"
            fontWeight="700"
            letterSpacing="0.08em"
            className="ark-ring-label ark-ring-label-you"
          >
            YOU · INDIVIDUAL MASTERY
          </text>

          {/* Mountain Ridge Silhouettes */}
          {/* Distant Ridge */}
          <path
            d="M0 380 L80 340 L180 360 L270 315 L360 350 L460 320 L540 355 L600 330 L600 480 L0 480 Z"
            fill="#1d1712"
            opacity="0.85"
          />

          {/* Foreground Summit Ridge */}
          <path
            d="M0 420 L120 395 L220 410 L300 320 L380 405 L490 385 L600 425 L600 480 L0 480 Z"
            fill="url(#synthesis-ridge-grad)"
            stroke="var(--ark-rule)"
            strokeWidth="1"
          />

          {/* Solitary Seeker Silhouette on Ridge Peak (300, 320) */}
          <g transform="translate(294, 282)" aria-label="Solitary seeker figure">
            {/* Head */}
            <circle cx="6" cy="5" r="3.5" fill="var(--ark-ink-hi)" />
            {/* Torso & Cloak */}
            <path d="M6 9 L2 22 L5 38 L7 38 L10 22 Z" fill="var(--ark-ink-hi)" />
            {/* Staff / Walking Pole */}
            <line x1="12" y1="4" x2="12" y2="38" stroke="var(--ark-amber)" strokeWidth="1.2" />
            {/* Active Datum Light point */}
            <circle cx="12" cy="4" r="1.5" fill="var(--ark-amber)" />
          </g>

          {/* Coordinate Crosshairs at Central Intersections */}
          <g stroke="rgba(255, 176, 0, 0.7)" strokeWidth="1">
            <line x1="295" y1="290" x2="305" y2="290" />
            <line x1="300" y1="285" x2="300" y2="295" />
          </g>
        </svg>

        {/* Dual Psychological Mottos in Bracketed Cards */}
        {/* 1. Zenith Coordinate Motto (Top-Right) */}
        <div className="v3-celestial-motto motto-top-right ark-horizon-motto-zenith">
          <span className="motto-bracket">[ 90°N · ZENITH ]</span>
          <p className="motto-text">I AM NOT THE CENTER OF EXISTENCE.</p>
        </div>

        {/* 2. Lateral Coordinate Motto (Mid-Left) */}
        <div className="v3-celestial-motto motto-mid-left ark-horizon-motto-lateral">
          <span className="motto-bracket">[ 180°W · AZIMUTH ]</span>
          <p className="motto-text">
            DO NOT MAKE YOURSELF SMALLER THAN YOU ARE CAPABLE OF BECOMING.
          </p>
        </div>
      </div>

      {/* Plate Scale Line */}
      <div className="v3-plate-scale-line">
        <span>SCALE: INDIVIDUAL → COSMIC</span>
        <span>REV 2026.08</span>
      </div>

      <figcaption id="fig0-cap" className="sr-only">
        Figure 0: The Horizon Scale — individual mastery to cosmic civilization across four concentric coordinate rings, solitary seeker on the summit ridge.
      </figcaption>
    </figure>
  );
}
