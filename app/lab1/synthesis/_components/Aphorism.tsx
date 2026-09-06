import type { ReactElement } from "react";

export function Aphorism(): ReactElement {
  return (
    <blockquote className="v3-aphorism-box ark-peak-end-box" aria-label="ĀRK Aphorism">
      {/* SERIF PULL QUOTE #2 OF 2 (Source Serif 4 Italic) */}
      <p className="v3-aphorism-quote">
        “When you know the map, you stop reacting to the terrain.”
      </p>
      <cite className="v3-aphorism-cite">— ĀRK</cite>
    </blockquote>
  );
}
