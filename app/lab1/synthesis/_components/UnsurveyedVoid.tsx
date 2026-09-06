import type { ReactElement } from "react";

interface UnsurveyedVoidProps {
  reducedMotion?: boolean;
}

export function UnsurveyedVoid({ reducedMotion = false }: UnsurveyedVoidProps): ReactElement {
  return (
    <div
      role="region"
      aria-labelledby="beat5-void-h"
      className="v3-unsurveyed-void ark-unsurveyed"
    >
      <span className="sr-only">
        Open research questions, published before purchase.
      </span>

      <div>
        <div className="v3-void-head">
          <span>UNRESOLVED FRONTIER</span>
          <span>⌖ STRATUM IV</span>
        </div>

        <h3 id="beat5-void-h" className="v3-void-title">
          Questions we have not yet answered. This is not a weakness. It is an honest map.
        </h3>

        <ul className="v3-void-list">
          <li
            className={`v3-void-item ${!reducedMotion ? "v3-fade-up-item" : ""}`}
            style={!reducedMotion ? { animationDelay: "0.15s" } : undefined}
          >
            — Whether the four aims are discovered or merely a useful partition
          </li>
          <li
            className={`v3-void-item ${!reducedMotion ? "v3-fade-up-item" : ""}`}
            style={!reducedMotion ? { animationDelay: "0.3s" } : undefined}
          >
            — What happens to the model under chosen, permanent scarcity
          </li>
          <li
            className={`v3-void-item ${!reducedMotion ? "v3-fade-up-item" : ""}`}
            style={!reducedMotion ? { animationDelay: "0.45s" } : undefined}
          >
            — Whether ranking can be taught or only caught
          </li>
        </ul>
      </div>

      <div className="v3-void-foot">
        UNSURVEYED · REV 2026.08 · 3 OPEN
      </div>
    </div>
  );
}
