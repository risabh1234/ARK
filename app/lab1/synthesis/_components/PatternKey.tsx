import type { ReactElement } from "react";

interface KeyItem {
  stratum: string;
  name: string;
  patternFill: string;
}

const KEY_ITEMS: ReadonlyArray<KeyItem> = [
  { stratum: "I", name: "Source (Stipple)", patternFill: "url(#ark-pat-stipple)" },
  { stratum: "II", name: "Evidence (Bedding)", patternFill: "url(#ark-pat-bedding)" },
  { stratum: "III", name: "Interpretation (Hatch)", patternFill: "url(#ark-pat-hatch)" },
  { stratum: "IV", name: "Unresolved (Dashed)", patternFill: "url(#ark-pat-unsurveyed)" },
];

export function PatternKey(): ReactElement {
  return (
    <div className="v3-pattern-key" aria-label="Stratigraphic pattern legend">
      <span className="v3-pattern-key-head">STRATIGRAPHIC PATTERN KEY (L1 LEGEND):</span>
      <div className="v3-pattern-key-grid">
        {KEY_ITEMS.map((item) => (
          <div key={item.stratum} className="v3-pattern-item">
            <svg width="24" height="24" viewBox="0 0 24 24" className="v3-pattern-swatch" aria-hidden="true">
              <rect x="0" y="0" width="24" height="24" fill={item.patternFill} stroke="var(--ark-rule)" strokeWidth="1" />
            </svg>
            <span className="v3-pattern-label">
              STRATUM {item.stratum} · {item.name.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
