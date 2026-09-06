"use client";

import { type ReactElement, type KeyboardEvent } from "react";

export type DepthMode = "source" | "evidence" | "interpretation";

interface DepthControlProps {
  id: string;
  value: DepthMode;
  onChange: (mode: DepthMode) => void;
  controlsId?: string;
  helperText?: string;
}

const DEPTH_MODES: ReadonlyArray<{ id: DepthMode; label: string }> = [
  { id: "source", label: "SOURCE" },
  { id: "evidence", label: "EVIDENCE" },
  { id: "interpretation", label: "INTERPRETATION" },
];

export function DepthControl({
  id,
  value,
  onChange,
  controlsId,
  helperText,
}: DepthControlProps): ReactElement {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % DEPTH_MODES.length;
      const nextMode = DEPTH_MODES[nextIndex].id;
      onChange(nextMode);
      const nextBtn = document.getElementById(`${id}-key-${nextMode}`);
      if (nextBtn) nextBtn.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + DEPTH_MODES.length) % DEPTH_MODES.length;
      const prevMode = DEPTH_MODES[prevIndex].id;
      onChange(prevMode);
      const prevBtn = document.getElementById(`${id}-key-${prevMode}`);
      if (prevBtn) prevBtn.focus();
    }
  };

  return (
    <div className="v3-depth-control-wrap" id={id}>
      <div className="v3-depth-control-head">
        <span className="v3-depth-label">DEPTH CONTROL</span>
        <span className="sr-only">
          Current depth: {value.toUpperCase()}
        </span>
      </div>

      <div
        role="group"
        aria-label="Depth of detail"
        className="v3-depth-keys"
      >
        {DEPTH_MODES.map((mode, idx) => {
          const isActive = value === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              id={`${id}-key-${mode.id}`}
              className={`v3-depth-btn ark-depth-key-btn ${isActive ? "active" : ""}`}
              aria-pressed={isActive}
              aria-controls={controlsId}
              onClick={() => onChange(mode.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              {mode.label}
            </button>
          );
        })}
      </div>

      {helperText && (
        <div className="v3-depth-helper-text">
          {helperText}
        </div>
      )}
    </div>
  );
}
