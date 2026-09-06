"use client";

import type { ReactElement, KeyboardEvent } from "react";
import type { StratumId } from "../hooks/useActiveStratum";

interface StrataRulerProps {
  activeStratum: StratumId;
  reducedMotion?: boolean;
}

interface StratumInfo {
  id: StratumId;
  numeral: string;
  name: string;
  targetBeatId: string;
  definition: string;
}

const STRATA_INFO: ReadonlyArray<StratumInfo> = [
  { id: "i", numeral: "I", name: "Source", targetBeatId: "beat-1", definition: "What was read: 63 sources located, dated, and cited." },
  { id: "ii", numeral: "II", name: "Evidence", targetBeatId: "beat-3", definition: "What the sources show when read together." },
  { id: "iii", numeral: "III", name: "Interpretation", targetBeatId: "beat-5", definition: "Where ĀRK argues: thesis, argument, disputable." },
  { id: "iv", numeral: "IV", name: "Unresolved", targetBeatId: "beat-7", definition: "What the evidence cannot yet settle: declared bounded void." },
];

const STRATUM_INDEX: Record<StratumId, number> = {
  i: 0,
  ii: 1,
  iii: 2,
  iv: 3,
};

export function StrataRuler({ activeStratum, reducedMotion = false }: StrataRulerProps): ReactElement {
  const activeIndex = STRATUM_INDEX[activeStratum] ?? 0;
  const beadTopPercent = activeIndex * 25 + 12.5;

  const activeStratumData = STRATA_INFO.find((s) => s.id === activeStratum) || STRATA_INFO[0];

  const scrollToStratum = (targetBeatId: string) => {
    const el = document.getElementById(targetBeatId);
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = -1;

    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = Math.min(currentIndex + 1, STRATA_INFO.length - 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      nextIndex = Math.max(currentIndex - 1, 0);
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = STRATA_INFO.length - 1;
    }

    if (nextIndex !== -1 && nextIndex !== currentIndex) {
      const nextStratum = STRATA_INFO[nextIndex];
      scrollToStratum(nextStratum.targetBeatId);
      const nextBtn = document.getElementById(`ruler-band-${nextStratum.id}`);
      if (nextBtn) nextBtn.focus();
    }
  };

  return (
    <>
      {/* Desktop Left Rail Altimeter (>= 1024px) */}
      <nav
        aria-label="Reading depth — the four strata"
        className="v3-ruler-rail ark-ruler-rail"
      >
        <ol className="v3-ruler-bands">
          {/* Active phosphor amber / signal red reading bead */}
          <div
            className={`v3-ruler-bead ark-ruler-bead ruler-bead ${activeStratum === "iv" ? "bead-iv" : ""}`}
            style={{
              top: `${beadTopPercent}%`,
              transition: reducedMotion ? "none" : "top 220ms cubic-bezier(0.2, 0, 0, 1)",
            }}
            aria-hidden="true"
          />

          {STRATA_INFO.map((s, idx) => {
            const isActive = activeStratum === s.id;
            return (
              <li
                key={s.id}
                className={`v3-ruler-band ${isActive ? "active" : ""} ${s.id === "iv" ? "band-iv" : ""}`}
              >
                <button
                  type="button"
                  id={`ruler-band-${s.id}`}
                  className="v3-ruler-band-btn"
                  onClick={() => scrollToStratum(s.targetBeatId)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`Stratum ${s.numeral}: ${s.name}. ${s.definition}`}
                >
                  <span className="v3-ruler-numeral">{s.numeral}</span>
                  <span className="sr-only">
                    Stratum {s.numeral}, {s.name} {isActive ? "— currently reading" : ""}
                  </span>
                  <div className="v3-ruler-tooltip" role="tooltip">
                    STRATUM {s.numeral} · {s.name.toUpperCase()}
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Mobile Sticky Top Strip (< 1024px) */}
      <nav
        aria-label="Mobile reading depth"
        className="v3-ruler-strip"
      >
        <ol className="v3-strip-list">
          {STRATA_INFO.map((s, idx) => {
            const isActive = activeStratum === s.id;
            return (
              <li
                key={s.id}
                className={`v3-strip-item ${isActive ? "active" : ""} ${s.id === "iv" ? "item-iv" : ""}`}
              >
                <button
                  type="button"
                  id={`mobile-ruler-band-${s.id}`}
                  className="v3-strip-item-btn"
                  onClick={() => scrollToStratum(s.targetBeatId)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={`Stratum ${s.numeral}: ${s.name}`}
                >
                  {isActive && (
                    <span
                      className={`v3-strip-dot strip-dot ${s.id === "iv" ? "dot-iv" : ""}`}
                      aria-hidden="true"
                    />
                  )}
                  <span>{s.numeral} · {s.name.toUpperCase()}</span>
                  <span className="sr-only">
                    Stratum {s.numeral} {isActive ? "(active)" : ""}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Polite Screen Reader Live Region for Stratum Announcements */}
      <div aria-live="polite" className="sr-only">
        Now reading: Stratum {activeStratumData.numeral}, {activeStratumData.name} — {activeStratumData.definition}
      </div>
    </>
  );
}
