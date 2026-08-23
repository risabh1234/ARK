"use client";

import { useEffect, useRef, useState } from "react";
import type { Howl as HowlType } from "howler";

// Spec §32 — opt-in ambient loop. No audio file is bundled in this
// build (no network access in this environment to source a
// public-domain/licensed track, and one shouldn't be fabricated) — set
// this to a real hosted URL once you have a licensed track, and the
// toggle activates automatically. Until then it renders disabled with
// a title explaining why, rather than silently doing nothing.
const AMBIENT_TRACK_URL = "";

export function AudioToggle() {
  const [playing, setPlaying] = useState(false);
  const howlRef = useRef<HowlType | null>(null);

  useEffect(() => {
    if (!AMBIENT_TRACK_URL) return;
    const stored = localStorage.getItem("ark-ambient-audio");
    if (stored === "on") setPlaying(true);
  }, []);

  useEffect(() => {
    if (!AMBIENT_TRACK_URL) return;
    if (playing && !howlRef.current) {
      import("howler").then(({ Howl }) => {
        howlRef.current = new Howl({ src: [AMBIENT_TRACK_URL], loop: true, volume: 0.15 });
        howlRef.current.play();
      });
    } else if (!playing && howlRef.current) {
      howlRef.current.stop();
      howlRef.current = null;
    }
    localStorage.setItem("ark-ambient-audio", playing ? "on" : "off");
  }, [playing]);

  return (
    <button
      type="button"
      disabled={!AMBIENT_TRACK_URL}
      onClick={() => setPlaying((v) => !v)}
      title={AMBIENT_TRACK_URL ? (playing ? "Mute ambient audio" : "Play ambient audio") : "No ambient track configured yet"}
      aria-label="Toggle ambient audio"
      className="font-mono text-[11px] uppercase tracking-[0.08em] text-bg/40 hover:text-accent transition-colors duration-fast disabled:cursor-not-allowed disabled:opacity-40"
    >
      {playing ? "♪ on" : "♪ off"}
    </button>
  );
}
