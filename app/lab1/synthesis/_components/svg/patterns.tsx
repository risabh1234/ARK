import type { ReactElement } from "react";

/**
 * Global SVG Pattern Definitions for Geological Stratigraphy & Quadrant Fills.
 * Rendered once at the root of the page inside a hidden SVG container.
 */
export function SvgPatternDefs(): ReactElement {
  return (
    <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }} aria-hidden="true">
      <defs>
        {/* 
          * Stratum I: Fine Dot Stipple
          * Note: Literal hex #d9cdb9 (matching --ark-ink) is used inside SVG <defs>
          * to ensure deterministic cross-browser rendering across SVG pattern references.
          */}
        <pattern id="ark-pat-stipple" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="#d9cdb9" />
          <circle cx="5" cy="5" r="0.8" fill="#d9cdb9" />
        </pattern>

        {/* Stratum II: Horizontal Bedding Rules */}
        <pattern id="ark-pat-bedding" width="8" height="6" patternUnits="userSpaceOnUse">
          <line x1="0" y1="3" x2="8" y2="3" stroke="#d9cdb9" strokeWidth="1" />
        </pattern>

        {/* Stratum III: 45° Diagonal Hatch */}
        <pattern id="ark-pat-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="-1" x2="0" y2="7" stroke="#d9cdb9" strokeWidth="1" />
        </pattern>

        {/* Stratum IV: Declared Unsurveyed Boundary */}
        <pattern id="ark-pat-unsurveyed" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect
            x="0.5"
            y="0.5"
            width="11"
            height="11"
            fill="none"
            stroke="rgba(186, 60, 15, 0.4)"
            strokeDasharray="2 2"
            strokeWidth="1"
          />
        </pattern>
      </defs>
    </svg>
  );
}
