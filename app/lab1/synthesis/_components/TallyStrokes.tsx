import type { ReactElement } from "react";

interface TallyStrokesProps {
  count?: number;
}

export function TallyStrokes({ count = 63 }: TallyStrokesProps): ReactElement {
  const fullGroups = Math.floor(count / 5);
  const remainder = count % 5;

  const groups: ReactElement[] = [];

  for (let g = 0; g < fullGroups; g++) {
    groups.push(
      <svg
        key={`group-${g}`}
        width="34"
        height="22"
        viewBox="0 0 34 22"
        className="v3-tally-group-svg"
        aria-hidden="true"
      >
        {/* 4 Vertical Strokes */}
        <line x1="4" y1="3" x2="4" y2="19" stroke="var(--ark-amber)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="11" y1="3" x2="11" y2="19" stroke="var(--ark-amber)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="3" x2="18" y2="19" stroke="var(--ark-amber)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="25" y1="3" x2="25" y2="19" stroke="var(--ark-amber)" strokeWidth="1.5" strokeLinecap="round" />
        {/* 5th Diagonal Strike-through */}
        <line x1="1" y1="18" x2="28" y2="4" stroke="var(--ark-amber)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (remainder > 0) {
    const remLines: ReactElement[] = [];
    for (let r = 0; r < remainder; r++) {
      const x = 4 + r * 7;
      remLines.push(
        <line
          key={`rem-${r}`}
          x1={x}
          y1="3"
          x2={x}
          y2="19"
          stroke="var(--ark-amber)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      );
    }
    groups.push(
      <svg
        key="group-rem"
        width={remainder * 7 + 6}
        height="22"
        viewBox={`0 0 ${remainder * 7 + 6} 22`}
        className="v3-tally-group-svg"
        aria-hidden="true"
      >
        {remLines}
      </svg>
    );
  }

  return (
    <div
      className="v3-tally-strokes-wrap"
      role="img"
      aria-label={`Tally diagram showing ${count} primary sources grouped in fives`}
      style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}
    >
      {groups}
    </div>
  );
}
