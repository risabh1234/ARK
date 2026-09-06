import type { ReactElement } from "react";

/**
 * 4 Product Surface Line Engravings for Beat 6.
 * Pure SVG line drawings with pathLength="1" for clean draw-in transitions.
 */

export function BriefsEngraving(): ReactElement {
  return (
    <svg
      viewBox="0 0 120 120"
      width="100%"
      height="100%"
      fill="none"
      stroke="var(--ark-muted)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="ark-engraving-svg"
    >
      {/* Outer bounding hexagon */}
      <polygon points="60,14 98,36 98,84 60,106 22,84 22,36" stroke="var(--ark-faint)" pathLength="1" className="v3-engraving-stroke" />
      {/* Icosahedral internal triangular faces */}
      <polygon points="60,14 60,60 22,36" pathLength="1" className="v3-engraving-stroke" />
      <polygon points="60,14 98,36 60,60" pathLength="1" className="v3-engraving-stroke" />
      <polygon points="98,36 98,84 60,60" pathLength="1" className="v3-engraving-stroke" />
      <polygon points="98,84 60,106 60,60" pathLength="1" className="v3-engraving-stroke" />
      <polygon points="60,106 22,84 60,60" pathLength="1" className="v3-engraving-stroke" />
      <polygon points="22,84 22,36 60,60" pathLength="1" className="v3-engraving-stroke" />
      {/* Inner pentagram star network */}
      <circle cx="60" cy="60" r="3" fill="var(--ark-amber)" stroke="none" />
      <circle cx="60" cy="14" r="2" fill="var(--ark-ink-hi)" stroke="none" />
      <circle cx="98" cy="36" r="2" fill="var(--ark-ink-hi)" stroke="none" />
      <circle cx="98" cy="84" r="2" fill="var(--ark-ink-hi)" stroke="none" />
      <circle cx="60" cy="106" r="2" fill="var(--ark-ink-hi)" stroke="none" />
      <circle cx="22" cy="84" r="2" fill="var(--ark-ink-hi)" stroke="none" />
      <circle cx="22" cy="36" r="2" fill="var(--ark-ink-hi)" stroke="none" />
    </svg>
  );
}

export function CodexEngraving(): ReactElement {
  return (
    <svg
      viewBox="0 0 120 120"
      width="100%"
      height="100%"
      fill="none"
      stroke="var(--ark-muted)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="ark-engraving-svg"
    >
      {/* Concentric orbital rings */}
      <circle cx="60" cy="60" r="48" stroke="var(--ark-faint)" strokeDasharray="3 3" pathLength="1" className="v3-engraving-stroke" />
      <ellipse cx="60" cy="60" rx="46" ry="20" transform="rotate(-30 60 60)" pathLength="1" className="v3-engraving-stroke" />
      <ellipse cx="60" cy="60" rx="46" ry="20" transform="rotate(30 60 60)" pathLength="1" className="v3-engraving-stroke" />
      <circle cx="60" cy="60" r="24" pathLength="1" className="v3-engraving-stroke" />
      <circle cx="60" cy="60" r="10" stroke="var(--ark-amber)" pathLength="1" className="v3-engraving-stroke" />
      {/* Coordinate axes */}
      <line x1="12" y1="60" x2="108" y2="60" stroke="var(--ark-faint)" pathLength="1" className="v3-engraving-stroke" />
      <line x1="60" y1="12" x2="60" y2="108" stroke="var(--ark-faint)" pathLength="1" className="v3-engraving-stroke" />
      {/* Focal celestial nodes */}
      <circle cx="60" cy="60" r="2.5" fill="var(--ark-amber)" stroke="none" />
      <circle cx="95" cy="40" r="2" fill="var(--ark-ink-hi)" stroke="none" />
      <circle cx="25" cy="80" r="2" fill="var(--ark-ink-hi)" stroke="none" />
    </svg>
  );
}

export function StudioEngraving(): ReactElement {
  return (
    <svg
      viewBox="0 0 120 120"
      width="100%"
      height="100%"
      fill="none"
      stroke="var(--ark-muted)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="ark-engraving-svg"
    >
      {/* Surveyor theodolite / Optical lens reticle */}
      <circle cx="60" cy="48" r="32" pathLength="1" className="v3-engraving-stroke" />
      <circle cx="60" cy="48" r="22" stroke="var(--ark-faint)" pathLength="1" className="v3-engraving-stroke" />
      <circle cx="60" cy="48" r="8" stroke="var(--ark-amber)" pathLength="1" className="v3-engraving-stroke" />
      {/* Crosshairs with tick marks */}
      <line x1="18" y1="48" x2="102" y2="48" pathLength="1" className="v3-engraving-stroke" />
      <line x1="60" y1="6" x2="60" y2="90" pathLength="1" className="v3-engraving-stroke" />
      <line x1="50" y1="44" x2="50" y2="52" pathLength="1" className="v3-engraving-stroke" />
      <line x1="70" y1="44" x2="70" y2="52" pathLength="1" className="v3-engraving-stroke" />
      <line x1="56" y1="38" x2="64" y2="38" pathLength="1" className="v3-engraving-stroke" />
      <line x1="56" y1="58" x2="64" y2="58" pathLength="1" className="v3-engraving-stroke" />
      {/* Tripod mounting base */}
      <line x1="60" y1="80" x2="30" y2="112" pathLength="1" className="v3-engraving-stroke" />
      <line x1="60" y1="80" x2="90" y2="112" pathLength="1" className="v3-engraving-stroke" />
      <line x1="60" y1="80" x2="60" y2="114" stroke="var(--ark-faint)" pathLength="1" className="v3-engraving-stroke" />
      <line x1="42" y1="96" x2="78" y2="96" stroke="var(--ark-faint)" pathLength="1" className="v3-engraving-stroke" />
    </svg>
  );
}

export function LibraryEngraving(): ReactElement {
  return (
    <svg
      viewBox="0 0 120 120"
      width="100%"
      height="100%"
      fill="none"
      stroke="var(--ark-muted)"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="ark-engraving-svg"
    >
      {/* Stacked architectural strata & folio archive bindings */}
      <rect x="20" y="86" width="80" height="18" pathLength="1" className="v3-engraving-stroke" />
      <line x1="26" y1="86" x2="26" y2="104" pathLength="1" className="v3-engraving-stroke" />
      <line x1="32" y1="95" x2="92" y2="95" stroke="var(--ark-faint)" pathLength="1" className="v3-engraving-stroke" />

      <rect x="26" y="64" width="68" height="18" pathLength="1" className="v3-engraving-stroke" />
      <line x1="32" y1="64" x2="32" y2="82" pathLength="1" className="v3-engraving-stroke" />
      <line x1="38" y1="73" x2="86" y2="73" stroke="var(--ark-faint)" pathLength="1" className="v3-engraving-stroke" />

      <rect x="32" y="42" width="56" height="18" pathLength="1" className="v3-engraving-stroke" />
      <line x1="38" y1="42" x2="38" y2="60" pathLength="1" className="v3-engraving-stroke" />
      <line x1="44" y1="51" x2="80" y2="51" stroke="var(--ark-faint)" pathLength="1" className="v3-engraving-stroke" />

      <polygon points="60,16 82,38 38,38" stroke="var(--ark-amber)" pathLength="1" className="v3-engraving-stroke" />
      <circle cx="60" cy="28" r="2" fill="var(--ark-amber)" stroke="none" />
    </svg>
  );
}
