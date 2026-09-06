"use client";

import { useState, type ReactElement } from "react";
import { FourRules } from "./FourRules";
import { DepthControl, type DepthMode } from "./DepthControl";
import { ResearchPanel } from "./ResearchPanel";
import { PatternKey } from "./PatternKey";

const DEPTH_HELPERS: Record<DepthMode, string> = {
  source: "SOURCE → Headline readings only.",
  evidence: "EVIDENCE → Add the provenance behind each reading.",
  interpretation: "INTERPRETATION → Add our reading of it, and open the full 63-source tally.",
};

interface MethodBeatProps {
  depth?: DepthMode;
  setDepth?: (mode: DepthMode) => void;
}

export function MethodBeat({
  depth: controlledDepth,
  setDepth: setControlledDepth,
}: MethodBeatProps): ReactElement {
  const [localDepth, setLocalDepth] = useState<DepthMode>("source");
  const depth = controlledDepth ?? localDepth;
  const setDepth = setControlledDepth ?? setLocalDepth;

  return (
    <section id="beat-3" className="v3-section" aria-labelledby="method-heading">
      <span className="v3-section-eyebrow">THE METHOD</span>

      <h2 id="method-heading" className="v3-section-h2">
        Our process is public. Our sources are visible.
      </h2>

      <p className="v3-lead-prose">
        Four rules govern every brief. They are not a philosophy of research; they are things you can check on the page.
      </p>

      {/* 4 Numbered Method Plates */}
      <FourRules />

      {/* Instrument Deck: DepthControl + Live Research Panel in Visual Dialogue */}
      <div className="v3-method-deck-wrap">
        <div className="v3-method-deck-controls">
          <DepthControl
            id="beat3-depth"
            value={depth}
            onChange={setDepth}
            controlsId="beat3-panel"
            helperText={DEPTH_HELPERS[depth]}
          />
        </div>

        <div className="v3-method-deck-panel">
          <ResearchPanel depth={depth} />
        </div>
      </div>

      {/* Stratigraphic Pattern Key */}
      <PatternKey />
    </section>
  );
}
