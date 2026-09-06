import type { ReactElement } from "react";
import type { DepthMode } from "./DepthControl";
import { TallyStrokes } from "./TallyStrokes";

// Standing watch item fallback constant (FINAL_LANDING_PAGE_SYNTHESIS.md §11 Item 3)
export const LEADERSHIP_STREAM_LABEL_FALLBACK = "Leadership & Duty";

interface ResearchRowData {
  id: string;
  stream: string;
  status: "Reading" | "Writing" | "Mapping";
  sources: number;
  lastUpdate: string;
  isLiveSignal?: boolean;
  evidenceNote: string;
  interpretationNote: string;
}

const RESEARCH_ROWS: ReadonlyArray<ResearchRowData> = [
  {
    id: "R-01",
    stream: "Consciousness Studies",
    status: "Reading",
    sources: 12,
    lastUpdate: "2h ago",
    evidenceNote: "Cross-referencing 12 neuroscience and phenomenology papers on subjective experience.",
    interpretationNote: "The hard problem of consciousness requires epistemic humility at the foundation.",
  },
  {
    id: "R-02",
    stream: "Bhagavad-gītā Analytics",
    status: "Reading",
    sources: 9,
    lastUpdate: "3h ago",
    evidenceNote: "Collation of 9 classical commentaries with strict scholarly transliteration.",
    interpretationNote: "Structural synthesis of action-focused inquiry and analytical discernment as an integrated decision engine.",
  },
  {
    id: "R-03",
    stream: "Psychology & Desire",
    status: "Writing",
    sources: 7,
    lastUpdate: "5h ago",
    evidenceNote: "Synthesizing mimetic theory with classical fourfold human aims taxonomies (purpose, resources, desire, and release).",
    interpretationNote: "Wanting is not the fundamental flaw; distorted ranking of aims creates existential dissonance.",
  },
  {
    id: "R-04",
    stream: "Civilizational History",
    status: "Reading",
    sources: 14,
    lastUpdate: "1h ago",
    evidenceNote: "14 longitudinal analyses of institutional lifespans and cognitive resilience.",
    interpretationNote: "Institutions collapse when they lose the shared legend connecting science, power, and ethics.",
  },
  {
    id: "R-05",
    stream: "Technology & Ethics",
    status: "Mapping",
    sources: 8,
    lastUpdate: "4h ago",
    evidenceNote: "Mapping algorithmic agency against classical accountability frameworks.",
    interpretationNote: "Instrumental power detached from self-inquiry amplifies systematic delusion.",
  },
  {
    id: "R-06",
    stream: "Leadership & Dharma",
    status: "Writing",
    sources: 13,
    lastUpdate: "30m ago",
    isLiveSignal: true,
    evidenceNote: "13 case studies of decision-making under high ambiguity and asymmetrical risk.",
    interpretationNote: "Duty operates as principled structural alignment and institutional stewardship, not moralistic coercion.",
  },
];

interface ResearchPanelProps {
  depth: DepthMode;
}

export function ResearchPanel({ depth }: ResearchPanelProps): ReactElement {
  return (
    <div className="v3-research-panel" id="beat3-panel">
      {/* Scoped concise status line for screen readers */}
      <div className="sr-only" role="status" aria-live="polite">
        Depth mode: {depth}. Provenance and interpretation layers updated.
      </div>

      <div className="v3-panel-header">
        <h3 className="v3-panel-title">LIVE RESEARCH INSTRUMENT PANEL</h3>
        <p className="v3-panel-sub">
          A true snapshot of what is being read and written right now.
        </p>
      </div>

      <div className="v3-table-scroll-wrap">
        <table className="v3-research-table" aria-label="Live Research Streams Snapshot">
          <caption className="sr-only">Live Research Instrument Panel Table</caption>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">WORK STREAM</th>
              <th scope="col">STATUS</th>
              <th scope="col">SOURCES</th>
              <th scope="col">LAST UPDATE</th>
            </tr>
          </thead>
          <tbody>
            {RESEARCH_ROWS.map((row) => (
              <tr
                key={row.id}
                className={`v3-research-row ark-research-row ${row.isLiveSignal ? "status-live" : ""}`}
              >
                <td style={{ fontWeight: 700, color: "var(--ark-ink-hi)" }}>{row.id}</td>
                <td className="ark-col-stream" id={`def-${row.id}`}>
                  <div>{row.stream}</div>
                  {depth === "evidence" && (
                    <div style={{ fontFamily: "var(--ark-font-body)", fontSize: "11px", color: "var(--ark-muted)", marginTop: "4px" }}>
                      [PROVENANCE] {row.evidenceNote}
                    </div>
                  )}
                  {depth === "interpretation" && (
                    <div style={{ fontFamily: "var(--ark-font-body)", fontSize: "11px", color: "var(--ark-ink)", marginTop: "4px" }}>
                      <div style={{ color: "var(--ark-muted)" }}>[PROVENANCE] {row.evidenceNote}</div>
                      <div style={{ color: "var(--ark-amber)", marginTop: "2px" }}>[INTERPRETATION] {row.interpretationNote}</div>
                    </div>
                  )}
                </td>
                <td className="v3-col-status">{row.status}</td>
                <td style={{ textAlign: "right" }}>{row.sources}</td>
                <td>{row.lastUpdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Labor Proof Tally reveals in INTERPRETATION mode */}
      {depth === "interpretation" && (
        <div style={{ padding: "16px 20px", background: "var(--ark-bg-deep)", borderTop: "1px solid var(--ark-rule)" }}>
          <div style={{ fontFamily: "var(--ark-font-mono)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-muted)", marginBottom: "8px" }}>
            LABOUR PROOF · 63 SOURCES READ BEFORE DRAFTING · GROUPED IN FIVES
          </div>
          <TallyStrokes count={63} />
        </div>
      )}

      <div className="v3-panel-footnote">
        Snapshot taken at build. The research is continuous; these figures are real, not incremented for effect.
      </div>
    </div>
  );
}
