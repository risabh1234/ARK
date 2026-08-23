"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor, spec §31.2 — a small ring that expands over clickable
 * elements, damped spring interpolation rather than raw 1:1 tracking.
 * Never mounted on touch devices (checked before render, not just
 * hidden via CSS) — @media (hover: hover) and (pointer: fine) only.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 35 });
  const springY = useSpring(y, { stiffness: 400, damping: 35 });
  const mounted = useRef(false);

  useEffect(() => {
    const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(supportsHover);
    if (!supportsHover) return;

    mounted.current = true;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, input, textarea, select, [role='button']"));
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
      className="ark-cursor pointer-events-none fixed left-0 top-0 z-[100] border border-accent"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: hovering ? 40 : 12,
        height: hovering ? 40 : 12,
        backgroundColor: hovering ? "rgba(181,80,47,0.08)" : "rgba(181,80,47,0.6)",
      }}
      transition={{ duration: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
    />
  );
}
