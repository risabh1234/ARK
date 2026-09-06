"use client";

import { useState, type ReactElement, type KeyboardEvent } from "react";
import type { TerritoryId } from "./AstrolabeTelemetry";

interface AstrolabeMapProps {
  activeId?: TerritoryId;
  onSelect?: (id: TerritoryId) => void;
}

export function AstrolabeMap({
  activeId: controlledActiveId,
  onSelect: controlledOnSelect,
}: AstrolabeMapProps): ReactElement {
  const [localActiveId, setLocalActiveId] = useState<TerritoryId>("measurable");
  const [hoveredId, setHoveredId] = useState<TerritoryId | null>(null);

  const activeId = controlledActiveId !== undefined ? controlledActiveId : localActiveId;
  const onSelect = controlledOnSelect ?? setLocalActiveId;

  const highlighted = hoveredId || activeId;

  const handleKeyDown = (e: KeyboardEvent<SVGGElement>, id: TerritoryId) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(id);
    }
  };

  return (
    <div className="ark-map-stage" role="region" aria-label="Fig. 1 The Four Territories of Human Knowledge">
      {/* Map Graphic Canvas Container */}
      <div className="ark-map-canvas-wrap">
        {/* Deep Ambient Base Plate (Always in background) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/territory-map-plate.png"
          alt="The Four Territories of Human Knowledge background cartographic filament plate"
          className="ark-map-base-plate"
        />

        {/* Dynamic Inactive Dimming Veil (Dims unselected regions into deeper Z-plane) */}
        <div
          className={`ark-map-depth-veil ${highlighted ? "is-dimming" : ""}`}
          aria-hidden="true"
        />

        {/* Interactive 3D SVG Overlay Stage */}
        <svg
          viewBox="0 0 1402 1122"
          className="ark-map-svg-overlay"
          role="img"
          aria-label="Interactive map with four territories: The Measurable, The Marketable, The Wanted, The Inherited, meeting at a central astrolabe reticle."
        >
          <defs>
            {/* 3D Depth Elevation Shadow Filter for Raised Active Territory */}
            <filter id="ark-elevation-3d" x="-30%" y="-30%" width="170%" height="170%">
              {/* Deep Ambient Occlusion Cast Shadow */}
              <feDropShadow dx="0" dy="16" stdDeviation="22" floodColor="#000000" floodOpacity="0.9" />
              {/* Secondary Soft Mid Shadow */}
              <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#000000" floodOpacity="0.8" />
              {/* Warm Ambient Phosphor Underglow */}
              <feDropShadow dx="0" dy="0" stdDeviation="28" floodColor="#ffb000" floodOpacity="0.25" />
            </filter>

            {/* Radial Warmth Gradients for Interior Luminescence (No harsh outlines) */}
            <radialGradient id="ark-warmth-nw" cx="45%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#ffb000" stopOpacity="0.22" />
              <stop offset="50%" stopColor="#b58a45" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#0c0a07" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="ark-warmth-ne" cx="55%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#ffb000" stopOpacity="0.22" />
              <stop offset="50%" stopColor="#b58a45" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#0c0a07" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="ark-warmth-sw" cx="45%" cy="55%" r="55%">
              <stop offset="0%" stopColor="#ffb000" stopOpacity="0.22" />
              <stop offset="50%" stopColor="#b58a45" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#0c0a07" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="ark-warmth-se" cx="55%" cy="55%" r="55%">
              <stop offset="0%" stopColor="#ffb000" stopOpacity="0.22" />
              <stop offset="50%" stopColor="#b58a45" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#0c0a07" stopOpacity="0" />
            </radialGradient>

            {/* Precision Clip Paths for 3D Raised Layering */}
            <clipPath id="clip-quad-nw">
              <path d="M 605 450 C 630 380, 645 280, 635 180 C 625 125, 560 100, 480 105 C 400 95, 300 105, 230 115 C 150 135, 120 185, 115 260 C 105 340, 130 405, 160 440 C 200 480, 300 485, 410 475 C 490 480, 560 470, 605 450 Z" />
            </clipPath>

            <clipPath id="clip-quad-ne">
              <path d="M 795 450 C 770 380, 755 280, 765 180 C 775 125, 840 100, 920 105 C 1000 95, 1100 105, 1170 115 C 1250 135, 1280 185, 1285 260 C 1295 340, 1270 405, 1240 440 C 1200 480, 1100 485, 990 475 C 910 480, 840 470, 795 450 Z" />
            </clipPath>

            <clipPath id="clip-quad-sw">
              <path d="M 605 520 C 630 590, 645 690, 635 790 C 625 845, 560 870, 480 865 C 400 875, 300 865, 230 855 C 150 835, 120 785, 115 710 C 105 630, 130 565, 160 530 C 200 490, 300 485, 410 495 C 490 490, 560 500, 605 520 Z" />
            </clipPath>

            <clipPath id="clip-quad-se">
              <path d="M 795 520 C 770 590, 755 690, 765 790 C 775 845, 840 870, 920 865 C 1000 875, 1100 865, 1170 855 C 1250 835, 1280 785, 1285 710 C 1295 630, 1270 565, 1240 530 C 1200 490, 1100 485, 990 495 C 910 490, 840 500, 795 520 Z" />
            </clipPath>
          </defs>

          {/* =================================================================
              1. NORTHWEST QUADRANT: THE MEASURABLE (3D Elevated Layer)
              ================================================================= */}
          <g
            role="button"
            tabIndex={0}
            aria-label="The Measurable — Science, Data, Matter. Failure mode: Explains the mechanism. Denies the meaning."
            aria-pressed={activeId === "measurable"}
            className={`ark-3d-quadrant ark-quad-nw ${highlighted === "measurable" ? "is-raised" : "is-recessed"}`}
            style={{ pointerEvents: "all", cursor: "pointer" }}
            onMouseEnter={() => setHoveredId("measurable")}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId("measurable")}
            onBlur={() => setHoveredId(null)}
            onClick={() => onSelect("measurable")}
            onKeyDown={(e) => handleKeyDown(e, "measurable")}
          >
            {/* Solid vector hit-zone for click handling */}
            <path
              d="M 605 450 C 630 380, 645 280, 635 180 C 625 125, 560 100, 480 105 C 400 95, 300 105, 230 115 C 150 135, 120 185, 115 260 C 105 340, 130 405, 160 440 C 200 480, 300 485, 410 475 C 490 480, 560 470, 605 450 Z"
              fill="rgba(255,176,0,0.001)"
              style={{ pointerEvents: "all", cursor: "pointer" }}
              onClick={() => onSelect("measurable")}
            />
            {/* Raised Cut-Out Image Slice with 3D Elevation Drop-Shadow */}
            <g clipPath="url(#clip-quad-nw)" filter={highlighted === "measurable" ? "url(#ark-elevation-3d)" : undefined}>
              <image
                href="/images/territory-map-plate.png"
                x="0"
                y="0"
                width="1402"
                height="1122"
                preserveAspectRatio="none"
              />
              <rect
                x="100"
                y="90"
                width="550"
                height="400"
                fill="url(#ark-warmth-nw)"
                opacity={highlighted === "measurable" ? 1 : 0}
                className="ark-ambient-bloom"
              />
            </g>
          </g>

          {/* =================================================================
              2. NORTHEAST QUADRANT: THE MARKETABLE (3D Elevated Layer)
              ================================================================= */}
          <g
            role="button"
            tabIndex={0}
            aria-label="The Marketable — Ambition, Power, Systems. Failure mode: Optimises the outcome. Skips the cost."
            aria-pressed={activeId === "marketable"}
            className={`ark-3d-quadrant ark-quad-ne ${highlighted === "marketable" ? "is-raised" : "is-recessed"}`}
            style={{ pointerEvents: "all", cursor: "pointer" }}
            onMouseEnter={() => setHoveredId("marketable")}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId("marketable")}
            onBlur={() => setHoveredId(null)}
            onClick={() => onSelect("marketable")}
            onKeyDown={(e) => handleKeyDown(e, "marketable")}
          >
            <path
              d="M 795 450 C 770 380, 755 280, 765 180 C 775 125, 840 100, 920 105 C 1000 95, 1100 105, 1170 115 C 1250 135, 1280 185, 1285 260 C 1295 340, 1270 405, 1240 440 C 1200 480, 1100 485, 990 475 C 910 480, 840 470, 795 450 Z"
              fill="rgba(255,176,0,0.001)"
              style={{ pointerEvents: "all", cursor: "pointer" }}
              onClick={() => onSelect("marketable")}
            />
            <g clipPath="url(#clip-quad-ne)" filter={highlighted === "marketable" ? "url(#ark-elevation-3d)" : undefined}>
              <image
                href="/images/territory-map-plate.png"
                x="0"
                y="0"
                width="1402"
                height="1122"
                preserveAspectRatio="none"
              />
              <rect
                x="750"
                y="90"
                width="550"
                height="400"
                fill="url(#ark-warmth-ne)"
                opacity={highlighted === "marketable" ? 1 : 0}
                className="ark-ambient-bloom"
              />
            </g>
          </g>

          {/* =================================================================
              3. SOUTHWEST QUADRANT: THE WANTED (3D Elevated Layer)
              ================================================================= */}
          <g
            role="button"
            tabIndex={0}
            aria-label="The Wanted — Desire, Psychology, Experience. Failure mode: Maps the feeling. Cannot rank it."
            aria-pressed={activeId === "wanted"}
            className={`ark-3d-quadrant ark-quad-sw ${highlighted === "wanted" ? "is-raised" : "is-recessed"}`}
            style={{ pointerEvents: "all", cursor: "pointer" }}
            onMouseEnter={() => setHoveredId("wanted")}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId("wanted")}
            onBlur={() => setHoveredId(null)}
            onClick={() => onSelect("wanted")}
            onKeyDown={(e) => handleKeyDown(e, "wanted")}
          >
            <path
              d="M 605 520 C 630 590, 645 690, 635 790 C 625 845, 560 870, 480 865 C 400 875, 300 865, 230 855 C 150 835, 120 785, 115 710 C 105 630, 130 565, 160 530 C 200 490, 300 485, 410 495 C 490 490, 560 500, 605 520 Z"
              fill="rgba(255,176,0,0.001)"
              style={{ pointerEvents: "all", cursor: "pointer" }}
              onClick={() => onSelect("wanted")}
            />
            <g clipPath="url(#clip-quad-sw)" filter={highlighted === "wanted" ? "url(#ark-elevation-3d)" : undefined}>
              <image
                href="/images/territory-map-plate.png"
                x="0"
                y="0"
                width="1402"
                height="1122"
                preserveAspectRatio="none"
              />
              <rect
                x="100"
                y="500"
                width="550"
                height="400"
                fill="url(#ark-warmth-sw)"
                opacity={highlighted === "wanted" ? 1 : 0}
                className="ark-ambient-bloom"
              />
            </g>
          </g>

          {/* =================================================================
              4. SOUTHEAST QUADRANT: THE INHERITED (3D Elevated Layer)
              ================================================================= */}
          <g
            role="button"
            tabIndex={0}
            aria-label="The Inherited — Meaning, Ethics, Consciousness. Failure mode: Carries the purpose. Distrusts the method."
            aria-pressed={activeId === "inherited"}
            className={`ark-3d-quadrant ark-quad-se ${highlighted === "inherited" ? "is-raised" : "is-recessed"}`}
            style={{ pointerEvents: "all", cursor: "pointer" }}
            onMouseEnter={() => setHoveredId("inherited")}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId("inherited")}
            onBlur={() => setHoveredId(null)}
            onClick={() => onSelect("inherited")}
            onKeyDown={(e) => handleKeyDown(e, "inherited")}
          >
            <path
              d="M 795 520 C 770 590, 755 690, 765 790 C 775 845, 840 870, 920 865 C 1000 875, 1100 865, 1170 855 C 1250 835, 1280 785, 1285 710 C 1295 630, 1270 565, 1240 530 C 1200 490, 1100 485, 990 495 C 910 490, 840 500, 795 520 Z"
              fill="rgba(255,176,0,0.001)"
              style={{ pointerEvents: "all", cursor: "pointer" }}
              onClick={() => onSelect("inherited")}
            />
            <g clipPath="url(#clip-quad-se)" filter={highlighted === "inherited" ? "url(#ark-elevation-3d)" : undefined}>
              <image
                href="/images/territory-map-plate.png"
                x="0"
                y="0"
                width="1402"
                height="1122"
                preserveAspectRatio="none"
              />
              <rect
                x="750"
                y="500"
                width="550"
                height="400"
                fill="url(#ark-warmth-se)"
                opacity={highlighted === "inherited" ? 1 : 0}
                className="ark-ambient-bloom"
              />
            </g>
          </g>

          {/* =================================================================
              5. CENTRAL ASTROLABE ROTATIONAL ACCENT (Dynamic Micro-Motion)
              ================================================================= */}
          <g id="central-astrolabe-instrument" pointerEvents="none">
            {/* Slowly Rotating Graduation Ring */}
            <circle
              cx="701"
              cy="485"
              r="68"
              fill="none"
              stroke="var(--ark-amber)"
              strokeOpacity="0.85"
              strokeWidth="1.2"
              strokeDasharray="2 4"
              className="ark-reticle-degree-ring"
            />

            {/* Radiant Center Star Pulsing Node */}
            <circle
              cx="701"
              cy="485"
              r="3.5"
              fill="#ffffff"
              className="ark-center-star"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
