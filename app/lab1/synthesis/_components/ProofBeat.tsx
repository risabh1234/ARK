import type { ReactElement } from "react";
import { BriefCard } from "./BriefCard";
import { UnsurveyedVoid } from "./UnsurveyedVoid";
import { RadialTally } from "./RadialTally";
import { Aphorism } from "./Aphorism";

interface ProofBeatProps {
  reducedMotion?: boolean;
}

export function ProofBeat({ reducedMotion = false }: ProofBeatProps): ReactElement {
  return (
    <section id="beat-5" className="v3-section" aria-labelledby="proof-heading">
      <span className="v3-section-eyebrow">THE PROOF</span>

      <h2 id="proof-heading" className="v3-section-h2">
        One finished instrument. Its dimensions, its sources, and the questions it could not close.
      </h2>

      {/* Row 1: Brief 001 Specimen Card + Bounded UNSURVEYED Void Box */}
      <div className="v3-proof-grid">
        <BriefCard />
        <UnsurveyedVoid reducedMotion={reducedMotion} />
      </div>

      {/* Row 2: Radial 63-Source Tally Dial + Quoted Aphorism */}
      <div className="v3-proof-subgrid">
        <RadialTally count={63} reducedMotion={reducedMotion} />
        <Aphorism />
      </div>
    </section>
  );
}
