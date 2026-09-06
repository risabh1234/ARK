"use client";

import type { ReactElement } from "react";

export type TerritoryId = "measurable" | "marketable" | "wanted" | "inherited";

export interface TerritoryData {
  id: TerritoryId;
  name: string;
  sub: string;
  quadrantName: string;
  coords: string;
  pramana: string;
  tattva: string;
  darsana: string;
  purusartha: string;
  failure: string;
  description: string;
  soundingsCount: number;
  openQuestionsCount: number;
}

export const TERRITORIES: ReadonlyArray<TerritoryData> = [
  {
    id: "measurable",
    name: "THE MEASURABLE",
    sub: "Science · Data · Matter",
    quadrantName: "NORTHWEST QUADRANT",
    coords: "NW · 28°N · Strata I–II",
    pramana: "Pratyakṣa (Observation) + Anumāna (Inference)",
    tattva: "Prakṛti (Material laws & physical substrate)",
    darsana: "Nyāya-Vaiśeṣika / Empirical Naturalism",
    purusartha: "Mokṣa (Demystifying mechanism)",
    failure: "Explains the mechanism. Denies the meaning.",
    description:
      "The empirical domain: physical mechanism, biological substrate, and reproducible observation. Rigorous on what is observable, silent on purpose.",
    soundingsCount: 63,
    openQuestionsCount: 14,
  },
  {
    id: "marketable",
    name: "THE MARKETABLE",
    sub: "Ambition · Power · Systems",
    quadrantName: "NORTHEAST QUADRANT",
    coords: "NE · 45°E · Strata II–III",
    pramana: "Anumāna (Economic Modelling) + Deśa-Kāla",
    tattva: "Karma (Action, incentive & reciprocal causality)",
    darsana: "Artha-śāstra / Game Theory / Cybernetics",
    purusartha: "Artha (Wealth, leverage & structural scale)",
    failure: "Optimises the outcome. Skips the cost.",
    description:
      "The economic domain: capital allocation, systemic leverage, and competitive optimization. Masters the game without calculating the human depletion.",
    soundingsCount: 42,
    openQuestionsCount: 9,
  },
  {
    id: "wanted",
    name: "THE WANTED",
    sub: "Desire · Psychology · Experience",
    quadrantName: "SOUTHWEST QUADRANT",
    coords: "SW · 12°S · Strata I–IV",
    pramana: "Pratyakṣa (Internal/Affective Perception)",
    tattva: "Jīva (Subjective conscious self & psyche)",
    darsana: "Sāṅkhya-Yoga / Phenomenological Psychology",
    purusartha: "Kāma (Desire, aesthetic & emotional valence)",
    failure: "Maps the feeling. Cannot rank it.",
    description:
      "The psychological domain: subjective desire, emotional valence, and felt aesthetic experience. Charts the landscape of craving without an objective compass.",
    soundingsCount: 51,
    openQuestionsCount: 12,
  },
  {
    id: "inherited",
    name: "THE INHERITED",
    sub: "Meaning · Ethics · Consciousness",
    quadrantName: "SOUTHEAST QUADRANT",
    coords: "SE · 88°W · Strata III–IV",
    pramana: "Śabda (Transmitted Lineage) + Vedānta",
    tattva: "Īśvara & Jīva (Constitutional ground & conscious agency)",
    darsana: "Brahma-Vaiṣṇava Vedānta / Govinda-bhāṣya",
    purusartha: "Dharma (Duty, ethical structure & ultimate alignment)",
    failure: "Carries the purpose. Distrusts the method.",
    description:
      "The philosophical and spiritual domain: existential purpose, ethical frameworks, and conscious agency. Carries the deepest human telos, yet often resists modern empirical scrutiny.",
    soundingsCount: 78,
    openQuestionsCount: 19,
  },
];

interface AstrolabeTelemetryProps {
  activeId: TerritoryId;
  onSelect: (id: TerritoryId) => void;
}

export function AstrolabeTelemetry({
  activeId,
  onSelect,
}: AstrolabeTelemetryProps): ReactElement {
  const current = TERRITORIES.find((t) => t.id === activeId) || TERRITORIES[0];

  return (
    <aside
      className="ark-telemetry-hud"
      aria-label="Epistemological Telemetry and Quadrant Readout"
    >
      <div className="ark-telemetry-header">
        <div>
          <h2 className="ark-telemetry-heading" style={{ marginTop: 0 }}>{current.name}</h2>
          <div className="ark-telemetry-triad">{current.sub}</div>
        </div>
      </div>

      <div className="ark-failmode-box" role="alert" aria-live="polite">
        <div className="ark-failmode-label">DIAGNOSTIC FAILURE MODE</div>
        <p className="ark-failmode-quote">&ldquo;{current.failure}&rdquo;</p>
      </div>

      <p style={{ fontSize: "13px", lineHeight: "1.55", color: "var(--ark-ink)", margin: 0 }}>
        {current.description}
      </p>

      {/* 4-Layer Epistemology Classifier Breakdown (ark epistemology spec §1.3) */}
      <div className="ark-epist-grid" aria-label="Epistemology Engine Classification">
        <div className="ark-epist-row">
          <span className="ark-epist-layer">Pramāṇa (Epistemic Weight)</span>
          <span className="ark-epist-value">{current.pramana}</span>
        </div>
        <div className="ark-epist-row">
          <span className="ark-epist-layer">Topic (Universal Tattva)</span>
          <span className="ark-epist-value">{current.tattva}</span>
        </div>
        <div className="ark-epist-row">
          <span className="ark-epist-layer">Darśana (Reasoning System)</span>
          <span className="ark-epist-value">{current.darsana}</span>
        </div>
        <div className="ark-epist-row">
          <span className="ark-epist-layer">Puruṣārtha (Human Telos)</span>
          <span className="ark-epist-value">{current.purusartha}</span>
        </div>
      </div>

      {/* Direct Switcher */}
      <div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--ark-muted)",
            display: "block",
            marginBottom: "8px",
          }}
        >
          Select Territory:
        </span>
        <div className="ark-quad-selector" role="tablist">
          {TERRITORIES.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={t.id === activeId}
              className={`ark-quad-btn ${t.id === activeId ? "is-active" : ""}`}
              onClick={() => onSelect(t.id)}
            >
              {t.name.replace("THE ", "")}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
