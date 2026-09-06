import type { ReactElement } from "react";

interface RadialTallyProps {
  count?: number;
  reducedMotion?: boolean;
}

export function RadialTally({ count = 63, reducedMotion = false }: RadialTallyProps): ReactElement {
  const radiusInner = 78;
  const radiusOuter = 92;
  const cx = 100;
  const cy = 100;

  const ticks: ReactElement[] = [];
  for (let i = 0; i < count; i++) {
    const isFifth = (i + 1) % 5 === 0;
    const currentRadiusInner = isFifth ? 73 : radiusInner;
    const angle = (i * 360) / count - 90;
    const rad = (angle * Math.PI) / 180;
    const x1 = Number((cx + currentRadiusInner * Math.cos(rad)).toFixed(2));
    const y1 = Number((cy + currentRadiusInner * Math.sin(rad)).toFixed(2));
    const x2 = Number((cx + radiusOuter * Math.cos(rad)).toFixed(2));
    const y2 = Number((cy + radiusOuter * Math.sin(rad)).toFixed(2));

    ticks.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--ark-amber)"
        strokeWidth={isFifth ? "2.25" : "1.5"}
        strokeLinecap="round"
        className={!reducedMotion ? "v3-tick-anim" : undefined}
        style={!reducedMotion ? { animationDelay: `${i * 10}ms` } : undefined}
      />
    );
  }

  return (
    <figure className="v3-radial-figure ark-radial-tally-figure" aria-label="63-Source Radial Dial Figure">
      <div className="v3-radial-svg-wrap">
        <svg
          viewBox="0 0 200 200"
          width="180"
          height="180"
          role="img"
          aria-label="63 sources, 100% traceable, shown as a radial dial of 63 segments."
        >
          {/* Outer Guideline Circle */}
          <circle cx="100" cy="100" r="95" fill="none" stroke="var(--ark-rule-faint)" strokeDasharray="2 3" />
          {/* Inner Guideline Circle */}
          <circle cx="100" cy="100" r="74" fill="none" stroke="var(--ark-rule-faint)" />
          {/* 63 Radial Ticks */}
          {ticks}
        </svg>

        <div className="v3-radial-center-text">
          <span className="v3-radial-center-num">63</span>
          <span className="v3-radial-center-sub">100% TRACEABLE</span>
        </div>
      </div>

      <figcaption className="v3-radial-caption">
        Every source in Brief 001, and every one of them cited in the text.
      </figcaption>
    </figure>
  );
}
