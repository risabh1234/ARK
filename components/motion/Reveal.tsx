"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Section/text reveal, spec §30.2 — whileInView + fade-up, triggers once.
 * Framer Motion does NOT automatically respect prefers-reduced-motion
 * (that only governs CSS transitions/animations, not its JS-driven
 * ones) — useReducedMotion() here is what actually satisfies §10's
 * "every motion token needs a reduced-motion fallback" requirement:
 * under reduced motion this drops to an instant opacity change, no
 * y-offset at all.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduced ? { duration: 0.01 } : { duration: 0.35, delay, ease: [0.22, 0.61, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
