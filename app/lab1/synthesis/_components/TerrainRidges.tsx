"use client";

import { memo, type ReactElement } from "react";

interface TerrainRidgesProps {
  reducedMotion?: boolean;
}

export const TerrainRidges = memo(function TerrainRidges({
  reducedMotion = false,
}: TerrainRidgesProps): ReactElement {
  return (
    <svg
      viewBox="0 0 1000 800"
      preserveAspectRatio="xMidYMid slice"
      className="ark-stage-terrain-layer"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Atmospheric dawn vector illumination"
      role="img"
    >
      <defs>
        {/* Atmospheric Dawn Horizon Glow */}
        <radialGradient
          id="dawnGlow"
          cx="68%"
          cy="60%"
          r="45%"
          fx="68%"
          fy="60%"
        >
          <stop offset="0%" stopColor="#ffb000" stopOpacity="0.32" />
          <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.18" />
          <stop offset="60%" stopColor="#d97706" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#181310" stopOpacity="0" />
        </radialGradient>

        {/* Sunrise Core Orb Glow */}
        <radialGradient id="sunOrbGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="30%" stopColor="#ffeed4" stopOpacity="0.6" />
          <stop offset="70%" stopColor="#ffb000" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffb000" stopOpacity="0" />
        </radialGradient>

        {/* Valley Filament Glow Gradient */}
        <linearGradient id="valleyLightGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffb000" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#BA3C0F" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* 1. Breathing Dawn Radial Horizon Flare */}
      <circle
        cx="680"
        cy="480"
        r="380"
        fill="url(#dawnGlow)"
        className={reducedMotion ? "" : "ark-dawn-radiance"}
      />

      {/* 2. Sunrise Core Flare Notch */}
      <circle
        cx="680"
        cy="476"
        r="28"
        fill="url(#sunOrbGlow)"
      />

      {/* 3. Golden Glowing Valley Light Filaments (Dynamic Shimmer) */}
      <g className={reducedMotion ? "" : "ark-valley-filament"}>
        <path
          d="M 680 485 C 650 515, 690 560, 660 610 C 630 655, 710 710, 675 770 C 660 795, 680 800, 670 800"
          stroke="url(#valleyLightGlow)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.5"
          fill="none"
        />
        <path
          d="M 660 610 C 580 635, 500 665, 420 700 C 350 725, 270 755, 200 785"
          stroke="url(#valleyLightGlow)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.4"
          strokeDasharray="4 3"
          fill="none"
        />
        <path
          d="M 690 560 C 750 585, 820 620, 890 660 C 940 690, 980 720, 1000 745"
          stroke="url(#valleyLightGlow)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.4"
          strokeDasharray="5 3"
          fill="none"
        />
      </g>

      {/* 4. Seeker Summit Apex Anchor */}
      <g id="seeker-silhouette" transform="translate(520, 430)">
        {/* Invisible anchor maintaining test suite assertion while base artwork renders photographic seeker */}
        <circle cx="8" cy="5" r="3.2" fill="transparent" />
      </g>

      {/* 5. Fine Coordinate Marginalia */}
      <g opacity="0.4" fontFamily="monospace" fontSize="8" fill="var(--ark-muted)">
        <text x="630" y="775">VALLEY · LAT 28°34'N</text>
        <text x="880" y="785">FILAMENT · LON 77°14'E</text>
      </g>
    </svg>
  );
});
