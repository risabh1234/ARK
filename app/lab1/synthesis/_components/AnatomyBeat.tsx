"use client";

import { useState, type ReactElement } from "react";
import { DepthControl, type DepthMode } from "./DepthControl";
import { StrataTable } from "./StrataTable";
import { StrataRulerExplainer } from "./StrataRulerExplainer";

const ANATOMY_HELPERS: Record<DepthMode, string> = {
  source: "SOURCE → Layer definitions only.",
  evidence: "EVIDENCE → Add worked examples from Brief 001.",
  interpretation: "INTERPRETATION → Add classical pramāṇa provenance & full 63-source tally.",
};

interface AnatomyBeatProps {
  depth?: DepthMode;
  setDepth?: (mode: DepthMode) => void;
}

export function AnatomyBeat({
  depth: controlledDepth,
  setDepth: setControlledDepth,
}: AnatomyBeatProps): ReactElement {
  const [localDepth, setLocalDepth] = useState<DepthMode>("source");
  const depth = controlledDepth ?? localDepth;
  const setDepth = setControlledDepth ?? setLocalDepth;

  return (
    <section id="beat-4" className="v3-section" aria-labelledby="anatomy-heading">
      <span className="v3-section-eyebrow">ANATOMY OF A CLAIM</span>

      <h2 id="anatomy-heading" className="v3-section-h2">
        Every claim is built in four layers. You can audit each one separately.
      </h2>

      <p className="v3-lead-prose">
        A claim you cannot take apart is just an opinion with good posture. Here is how a claim is assembled in a brief — from what a text actually says, up to what we argue it means, and out to what we still cannot answer.
      </p>

      <div className="v3-anatomy-grid">
        {/* Left Column: Strata Table + DepthControl */}
        <div className="v3-anatomy-main">
          <DepthControl
            id="beat4-depth"
            value={depth}
            onChange={setDepth}
            controlsId="beat4-panel"
            helperText={ANATOMY_HELPERS[depth]}
          />

          <StrataTable depth={depth} />
        </div>

        {/* Right Column: Architectural Explainer Card */}
        <div className="v3-anatomy-aside">
          <StrataRulerExplainer />
        </div>
      </div>
    </section>
  );
}
