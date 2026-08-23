"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type HoverState = { active: boolean; label: string };

/**
 * Custom cursor v2 — replaces the plain expanding-circle version after
 * the user flagged it as looking cheap. Now: a small precise dot that
 * uses mix-blend-mode: difference (inverts whatever's underneath, so it
 * reads correctly over both light and dark sections with zero per-
 * section color logic), and morphs into a thin contextual-label ring
 * over interactive elements — reads as considered rather than a generic
 * "circle that gets bigger." Tighter spring than v1, less blobby.
 *
 * Still never mounted on touch devices (checked before render), per
 * spec §31.2.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState<HoverState>({ active: false, label: "" });
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.4 });

  useEffect(() => {
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(supportsHover);
    if (!supportsHover) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "a, button, input, textarea, select, [role='button'], [data-cursor-label]"
      );
      if (!target) {
        setHover({ active: false, label: "" });
        return;
      }
      const label =
        target.getAttribute("data-cursor-label") ||
        (target.tagName === "A" || target.tagName === "BUTTON" ? "" : "");
      setHover({ active: true, label });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="ark-cursor pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full"
        style={{ mixBlendMode: "difference" }}
        animate={{
          width: hover.active ? 56 : 8,
          height: hover.active ? 56 : 8,
          backgroundColor: hover.active ? "transparent" : "#FBF6EE",
          borderWidth: hover.active ? 1 : 0,
          borderColor: "#FBF6EE",
          borderStyle: "solid",
        }}
        transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
      >
        {hover.active && hover.label && (
          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#FBF6EE]">
            {hover.label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
