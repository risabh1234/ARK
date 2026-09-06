"use client";

import { useState, memo, type ReactElement } from "react";

export type TypographyMode = "serif" | "sans";
export type CopyMode = "artwork" | "cat";

interface ExperimentControlsProps {
  typographyMode: TypographyMode;
  onSetTypographyMode: (mode: TypographyMode) => void;
  copyMode: CopyMode;
  onSetCopyMode: (mode: CopyMode) => void;
  forcedReducedMotion: boolean;
  onToggleReducedMotion: () => void;
  showOverlayKey: boolean;
  onToggleOverlayKey: () => void;
}

export const ExperimentControls = memo(function ExperimentControls({
  typographyMode,
  onSetTypographyMode,
  copyMode,
  onSetCopyMode,
  forcedReducedMotion,
  onToggleReducedMotion,
  showOverlayKey,
  onToggleOverlayKey,
}: ExperimentControlsProps): ReactElement {
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768;
    }
    return true;
  });

  return (
    <div className="ark-controls-bar">
      <button
        type="button"
        className="ark-controls-toggle-btn"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-label="Toggle Experiment Controls"
      >
        <span style={{ color: "var(--ark-amber)" }}>⚙</span>
        <span>EXPERIMENT CONTROLS {isExpanded ? "▲" : "▼"}</span>
      </button>

      {isExpanded && (
        <div className="ark-controls-panel">
          <div className="ark-controls-title">HERO EXPERIMENT AUDIT HUD</div>

          {/* 1. Typography Mode Toggle */}
          <div className="ark-control-group">
            <span className="ark-control-label">1. H1 Typography Variant</span>
            <div className="ark-btn-switch-group">
              <button
                type="button"
                className={`ark-switch-btn ${typographyMode === "serif" ? "active" : ""}`}
                onClick={() => onSetTypographyMode("serif")}
              >
                Serif (Artwork)
              </button>
              <button
                type="button"
                className={`ark-switch-btn ${typographyMode === "sans" ? "active" : ""}`}
                onClick={() => onSetTypographyMode("sans")}
              >
                Sans (Synthesis)
              </button>
            </div>
          </div>

          {/* 2. Copy Mode Toggle */}
          <div className="ark-control-group">
            <span className="ark-control-label">2. Copy Variant (L6 / CAT Test)</span>
            <div className="ark-btn-switch-group">
              <button
                type="button"
                className={`ark-switch-btn ${copyMode === "artwork" ? "active" : ""}`}
                onClick={() => onSetCopyMode("artwork")}
              >
                Artwork Canonical
              </button>
              <button
                type="button"
                className={`ark-switch-btn ${copyMode === "cat" ? "active" : ""}`}
                onClick={() => onSetCopyMode("cat")}
              >
                Ratified CAT
              </button>
            </div>
          </div>

          {/* 3. Motion & Canvas Control */}
          <div className="ark-control-group">
            <span className="ark-control-label">3. Motion Contract</span>
            <div className="ark-btn-switch-group">
              <button
                type="button"
                className={`ark-switch-btn ${!forcedReducedMotion ? "active" : ""}`}
                onClick={() => forcedReducedMotion && onToggleReducedMotion()}
              >
                Live Drift (60fps)
              </button>
              <button
                type="button"
                className={`ark-switch-btn ${forcedReducedMotion ? "active" : ""}`}
                onClick={() => !forcedReducedMotion && onToggleReducedMotion()}
              >
                Reduced Motion
              </button>
            </div>
          </div>

          {/* 4. Astrolabe Legend Overlay */}
          <div className="ark-control-group">
            <span className="ark-control-label">4. Astrolabe Reticle Key</span>
            <div className="ark-btn-switch-group">
              <button
                type="button"
                className={`ark-switch-btn ${showOverlayKey ? "active" : ""}`}
                onClick={() => !showOverlayKey && onToggleOverlayKey()}
              >
                Show Key
              </button>
              <button
                type="button"
                className={`ark-switch-btn ${!showOverlayKey ? "active" : ""}`}
                onClick={() => showOverlayKey && onToggleOverlayKey()}
              >
                Hide Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
