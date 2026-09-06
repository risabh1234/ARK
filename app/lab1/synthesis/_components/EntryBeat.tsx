import type { ReactElement } from "react";
import { PeakClaim } from "./PeakClaim";
import { WeeklyLetter } from "./WeeklyLetter";
import { FooterStrip } from "./FooterStrip";

export function EntryBeat(): ReactElement {
  return (
    <section id="beat-7" className="v3-section v3-entry-section" aria-labelledby="entry-heading">
      <h2 id="entry-heading" className="v3-section-eyebrow">
        THE ENTRY
      </h2>

      {/* The Peak-End Working Thesis Claim */}
      <PeakClaim />

      {/* Weekly Letter Subscription Box */}
      <WeeklyLetter />

      {/* End of Section Miniature Stamp (L3) */}
      <div style={{ fontFamily: "var(--ark-font-mono)", fontSize: "10px", letterSpacing: "0.15em", color: "var(--ark-muted)", marginBottom: "32px" }}>
        END OF SECTION · SURVEY CONTINUES
      </div>

      {/* Full Drawing-Office Footer Strip */}
      <FooterStrip />
    </section>
  );
}
