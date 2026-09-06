import type { ReactElement } from "react";

export function StrataRulerExplainer(): ReactElement {
  return (
    <aside className="v3-ruler-explainer" aria-label="Strata Ruler Altimeter Architecture">
      <div className="v3-ruler-explainer-head">
        <span className="v3-ruler-explainer-tag">⌖ ALTIMETER ARCHITECTURE (L1)</span>
      </div>
      <p className="v3-ruler-explainer-body">
        The rail on the left is an altimeter. As you read, the amber bead descends through the four strata — Source, Evidence, Interpretation — and turns red at Unresolved, the edge of what is known. It is where you are in the descent, not how far you have scrolled.
      </p>
    </aside>
  );
}
