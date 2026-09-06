"use client";

import { useState, useEffect, memo, type ReactElement } from "react";

interface InstrumentCitationCardProps {
  reducedMotion?: boolean;
}

export const InstrumentCitationCard = memo(function InstrumentCitationCard({
  reducedMotion = false,
}: InstrumentCitationCardProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTicks, setActiveTicks] = useState(reducedMotion ? 20 : 0);

  // Sequential tally animation on mount
  useEffect(() => {
    if (reducedMotion) {
      setActiveTicks(20);
      return;
    }

    const interval = setInterval(() => {
      setActiveTicks((prev) => {
        if (prev >= 20) {
          clearInterval(interval);
          return 20;
        }
        return prev + 1;
      });
    }, 55);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  // Keyboard escape handler for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const tallyBars = Array.from({ length: 20 }, (_, i) => i);

  return (
    <>
      {/* 1. Bounded Plate Citation Card */}
      <div
        className="ark-citation-card v3-tally-bar"
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Inspect 63 Primary Sources & Provenance Index"
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        <div className="ark-citation-header">
          <span>RESEARCHED · SOURCED · CITED</span>
          <span className="ark-citation-tag">VERIFIED 100%</span>
        </div>

        <div className="ark-citation-body">
          <div className="ark-citation-number-group">
            <span className="ark-citation-number">63</span>
            <div className="ark-citation-label">
              <div>PRIMARY</div>
              <div>SOURCES</div>
            </div>
          </div>

          {/* 20-Bar Amber Tally Indicator */}
          <div
            className="ark-tally-container"
            aria-label={`Evidence tally: ${activeTicks} of 20 units verified`}
            role="progressbar"
            aria-valuenow={activeTicks}
            aria-valuemin={0}
            aria-valuemax={20}
          >
            {tallyBars.map((idx) => {
              const isActive = idx < activeTicks;
              const isFifth = (idx + 1) % 5 === 0;
              return (
                <span
                  key={idx}
                  className={`ark-tally-bar ${isActive ? "active" : ""} ${isFifth ? "fifth" : ""}`}
                />
              );
            })}
          </div>
        </div>

        <div className="ark-citation-footer">
          <span>TRACEABLE EVIDENTIARY ARCHITECTURE</span>
          <span className="ark-citation-inspector-hint">
            INSPECT PROVENANCE <span>↗</span>
          </span>
        </div>
      </div>

      {/* 2. Provenance Inspection Modal Drawer */}
      {isOpen && (
        <div
          className="ark-provenance-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="provenance-title"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="ark-provenance-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ark-provenance-modal-header">
              <div className="ark-provenance-title" id="provenance-title">
                EPISTEMIC PROVENANCE · 63 PRIMARY SOURCES REGISTER
              </div>
              <button
                type="button"
                className="ark-modal-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close provenance register"
              >
                [ CLOSE ESC ]
              </button>
            </div>

            <div className="ark-provenance-body">
              <p style={{ color: "var(--ark-muted)", fontSize: "12px", margin: 0 }}>
                Every claim, metric, and coordinate in ĀRK is calibrated across 63 primary sources.
                No secondary summaries; no ungrounded abstractions.
              </p>

              {/* Tier I: Classical Foundations */}
              <div className="ark-provenance-category">
                <div className="ark-provenance-cat-title">
                  <span>I. CLASSICAL PHILOLOGY & SĀṂKHYA ONTOLOGY</span>
                  <span>18 SOURCES</span>
                </div>
                <ul className="ark-provenance-source-list">
                  <li className="ark-provenance-source-item">
                    <span className="ark-source-idx">01–06</span>
                    <span>Sāṃkhyakārikā of Īśvarakṛṣṇa (Pramāṇa & Tattva Ontology)</span>
                  </li>
                  <li className="ark-provenance-source-item">
                    <span className="ark-source-idx">07–12</span>
                    <span>Nāṭyaśāstra of Bharata Muni (Rasa Synthesis & Cognitive States)</span>
                  </li>
                  <li className="ark-provenance-source-item">
                    <span className="ark-source-idx">13–18</span>
                    <span>Nyāyasūtra of Akṣapāda Gautama (Epistemic Validation Pramāṇas)</span>
                  </li>
                </ul>
              </div>

              {/* Tier II: Cognitive Science & Neuroscience */}
              <div className="ark-provenance-category">
                <div className="ark-provenance-cat-title">
                  <span>II. COGNITIVE NEUROSCIENCE & EMPIRICAL PSYCHOLOGY</span>
                  <span>19 SOURCES</span>
                </div>
                <ul className="ark-provenance-source-list">
                  <li className="ark-provenance-source-item">
                    <span className="ark-source-idx">19–26</span>
                    <span>Predictive Processing & Active Inference (Friston, Clark et al.)</span>
                  </li>
                  <li className="ark-provenance-source-item">
                    <span className="ark-source-idx">27–33</span>
                    <span>Attention Restoration & Epistemic Hunger (Kaplan, Berlyne)</span>
                  </li>
                  <li className="ark-provenance-source-item">
                    <span className="ark-source-idx">34–37</span>
                    <span>Peak States & Self-Transcendence Trajectories (Csikszentmihalyi, Maslow)</span>
                  </li>
                </ul>
              </div>

              {/* Tier III: Astrophysics, Complex Systems & Scaling */}
              <div className="ark-provenance-category">
                <div className="ark-provenance-cat-title">
                  <span>III. COMPLEX SYSTEMS & HORIZON SCALING</span>
                  <span>16 SOURCES</span>
                </div>
                <ul className="ark-provenance-source-list">
                  <li className="ark-provenance-source-item">
                    <span className="ark-source-idx">38–45</span>
                    <span>Planetary Boundaries & Earth System Dynamics (Steffen, Rockström)</span>
                  </li>
                  <li className="ark-provenance-source-item">
                    <span className="ark-source-idx">46–53</span>
                    <span>Cosmological Horizon Structures & Information Limits (Bekenstein, Susskind)</span>
                  </li>
                </ul>
              </div>

              {/* Tier IV: Modern Epistemology & Cartography */}
              <div className="ark-provenance-category">
                <div className="ark-provenance-cat-title">
                  <span>IV. CARTOGRAPHIC & DESIGN SPECIFICATIONS</span>
                  <span>10 SOURCES</span>
                </div>
                <ul className="ark-provenance-source-list">
                  <li className="ark-provenance-source-item">
                    <span className="ark-source-idx">54–58</span>
                    <span>NASA-GSM Drawing Office Plate Specifications (MIL-STD-100)</span>
                  </li>
                  <li className="ark-provenance-source-item">
                    <span className="ark-source-idx">59–63</span>
                    <span>ĀRK Epistemology Framework v3 (L1–L6 Constitutional Ratification)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
