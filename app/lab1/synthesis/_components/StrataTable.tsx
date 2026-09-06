import type { ReactElement } from "react";
import type { DepthMode } from "./DepthControl";
import { TallyStrokes } from "./TallyStrokes";

interface StratumRowDef {
  numeral: string;
  name: string;
  whatItHolds: string;
  example: string;
  provenance: string;
  isUnresolved?: boolean;
}

const STRATA_ROWS: ReadonlyArray<StratumRowDef> = [
  {
    numeral: "I",
    name: "Source",
    whatItHolds: "What a text says — quoted, located, dated, and given in its original transliteration where the wording matters.",
    example: "Bhagavad-gītā 2.20, on the self that is neither born nor dies. (Gītā: the 700-verse dialogue at the centre of the Mahābhārata.)",
    provenance: "Śabda (testimony) — Sanskrit text corpus with verified IAST transliteration: na jāyate mriyate vā kadācin.",
  },
  {
    numeral: "II",
    name: "Evidence",
    whatItHolds: "What independent data shows when read together — findings kept separate from whoever first reported them.",
    example: "Cellular turnover replaces most tissue on a scale of years; consolidated memory persists far longer.",
    provenance: "Pratyakṣa (perception, instrument-mediated) — longitudinal biological & cognitive-psychology data sets (1998–2024).",
  },
  {
    numeral: "III",
    name: "Interpretation",
    whatItHolds: "Where ĀRK argues. Marked as argument, built up from the strata beneath it, and open to dispute.",
    example: "\"Wanting is not the problem. Ranking is.\"",
    provenance: "Anumāna (inference) — ĀRK Synthesis Framework: hierarchical ordering of material, psychological, and transcendental aims.",
  },
  {
    numeral: "IV",
    name: "Unresolved",
    whatItHolds: "What the evidence cannot yet settle. Drawn as a bounded space and marked UNSURVEYED — not left off the map.",
    example: "Whether the four aims are discovered, or just a useful way to cut the pie.",
    provenance: "Epistemic boundary register: 3 open research questions declared in Brief 001.",
    isUnresolved: true,
  },
];

interface StrataTableProps {
  depth: DepthMode;
}

export function StrataTable({ depth }: StrataTableProps): ReactElement {
  return (
    <div id="beat4-panel" style={{ width: "100%" }}>
      {/* Desktop Table View (>= 768px) */}
      <div className="v3-strata-table-desktop">
        <table className="v3-strata-table" aria-label="The Four Strata of Knowledge Table">
          <caption className="sr-only">The Four Strata of Knowledge</caption>
          <thead>
            <tr>
              <th scope="col" style={{ width: "48px" }}></th>
              <th scope="col" style={{ width: "140px" }}>STRATUM</th>
              <th scope="col">WHAT IT HOLDS</th>
              {depth !== "source" && <th scope="col">EXAMPLE</th>}
            </tr>
          </thead>
          <tbody>
            {STRATA_ROWS.map((row) => (
              <tr
                key={row.numeral}
                className={row.isUnresolved ? "v3-strata-row-iv" : ""}
              >
                <td className="v3-strata-num">{row.numeral}</td>
                <td style={{ fontWeight: 600, color: row.isUnresolved ? "var(--ark-signal-red)" : "var(--ark-ink-hi)" }}>
                  {row.name}
                </td>
                <td style={{ color: "var(--ark-ink)", lineHeight: 1.5 }}>
                  <div>{row.whatItHolds}</div>
                  {depth === "interpretation" && (
                    <div style={{ fontFamily: "var(--ark-font-mono)", fontSize: "11px", color: "var(--ark-muted)", marginTop: "6px" }}>
                      [SIGLA] {row.provenance}
                    </div>
                  )}
                  {depth === "interpretation" && row.numeral === "I" && (
                    <div style={{ marginTop: "10px", padding: "10px", background: "var(--ark-bg-deep)", border: "1px solid var(--ark-rule)" }}>
                      <span style={{ fontFamily: "var(--ark-font-mono)", fontSize: "10px", letterSpacing: "0.08em", color: "var(--ark-amber)", display: "block", marginBottom: "4px" }}>
                        PROVENANCE MARKS · 63 SOURCES READ
                      </span>
                      <TallyStrokes count={63} />
                    </div>
                  )}
                </td>
                {depth !== "source" && (
                  <td style={{ color: "var(--ark-ink-hi)", fontFamily: row.numeral === "I" ? "var(--ark-font-body)" : "inherit", fontSize: "13px", lineHeight: 1.5 }}>
                    {row.example}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards View (< 768px) */}
      <div className="v3-strata-cards-mobile">
        {STRATA_ROWS.map((row) => (
          <article
            key={row.numeral}
            className={`v3-strata-card ${row.isUnresolved ? "card-iv" : ""}`}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span className="v3-strata-num" style={{ fontSize: "14px" }}>STRATUM {row.numeral}</span>
              <span style={{ fontWeight: 700, color: row.isUnresolved ? "var(--ark-signal-red)" : "var(--ark-ink-hi)", textTransform: "uppercase", fontSize: "12px", fontFamily: "var(--ark-font-mono)" }}>
                {row.name}
              </span>
            </div>
            <p style={{ margin: "0 0 8px 0", fontSize: "13px", color: "var(--ark-ink)", lineHeight: 1.5 }}>
              {row.whatItHolds}
            </p>
            {depth !== "source" && (
              <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: "1px solid var(--ark-rule-faint)", fontSize: "12px", color: "var(--ark-ink-hi)" }}>
                <strong style={{ color: "var(--ark-muted)", display: "block", fontSize: "10px", fontFamily: "var(--ark-font-mono)" }}>EXAMPLE:</strong>
                {row.example}
              </div>
            )}
            {depth === "interpretation" && (
              <div style={{ marginTop: "8px", fontFamily: "var(--ark-font-mono)", fontSize: "10px", color: "var(--ark-muted)" }}>
                [SIGLA] {row.provenance}
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Classical Pramāṇa Gloss Footnote (L6 first-use gloss, gated to INTERPRETATION depth) */}
      {depth === "interpretation" && (
        <div className="v3-strata-footnote" style={{ marginTop: "12px", fontFamily: "var(--ark-font-mono)", fontSize: "10px", color: "var(--ark-muted)", borderTop: "1px dashed var(--ark-rule)", paddingTop: "8px" }}>
          Śabda, pratyakṣa, anumāna: testimony, perception, and inference — the three classical tests of a valid claim (pramāṇa-śāstra), used here as an analytical tool.
        </div>
      )}
    </div>
  );
}
