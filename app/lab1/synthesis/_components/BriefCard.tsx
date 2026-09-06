import type { ReactElement } from "react";

export function BriefCard(): ReactElement {
  return (
    <article className="v3-brief-card ark-specimen-card" aria-label="Brief 001 Specimen Card">
      <div>
        <div className="v3-brief-kicker">
          <span>BRIEF 001</span>
          <span style={{ color: "var(--ark-amber)", fontWeight: 700 }}>AVAILABLE</span>
        </div>

        <h3 className="v3-brief-title specimen-title">
          The Architecture of Desire
        </h3>

        <p className="v3-brief-dek">
          Why getting what you wanted did not settle anything — and the four-part model of human aims that explains it.
        </p>

        <div className="v3-brief-dim">
          48 PAGES · 63 SOURCES · 3 UNRESOLVED
        </div>

        {/* SERIF PULL QUOTE #1 OF 2 (Source Serif 4 Italic) */}
        <blockquote className="v3-serif-pull-quote">
          “Materialism says consume, and leaves them hollow. Inherited moral systems say suppress, and leave them guilty.”
        </blockquote>
      </div>

      <div className="v3-brief-foot">
        <a href="/research/the-architecture-of-desire" className="v3-tertiary-link" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center" }}>
          Read sample <span aria-hidden="true">→</span>
        </a>
        <span className="v3-brief-price pricing-tag">₹1,299 / $19</span>
      </div>
    </article>
  );
}
