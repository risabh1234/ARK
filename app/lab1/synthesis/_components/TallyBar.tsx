import type { ReactElement } from "react";

export function TallyBar(): ReactElement {
  // Generate 63 ticks grouped in fives (with a larger gap after every 5 ticks)
  const ticks: ReactElement[] = [];
  for (let i = 0; i < 63; i++) {
    const isGroupEnd = (i + 1) % 5 === 0;
    ticks.push(
      <span
        key={i}
        className={`v3-tally-tick ${isGroupEnd ? "group-end" : ""}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="v3-tally-bar" aria-label="63 primary sources, 100% traceable">
      <div className="v3-tally-kicker">
        <span>RESEARCHED. SOURCED. CITED.</span>
      </div>

      <div className="v3-tally-stat-row">
        <div className="v3-tally-stat-left">
          <span className="v3-tally-big-num ark-prov-num">63</span>
          <div className="v3-tally-stat-meta">
            <span className="meta-primary">PRIMARY SOURCES IN THIS BRIEF</span>
            <span className="meta-secondary">100% TRACEABLE</span>
          </div>
        </div>
      </div>

      <div className="v3-tally-ticks-wrap ark-prov-meter-fill" aria-hidden="true">
        {ticks}
      </div>
    </div>
  );
}
