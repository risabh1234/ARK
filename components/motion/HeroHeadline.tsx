"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Hero headline, spec §12.1/§30.1 — words stagger in on mount (this is
 * above the fold, so whileInView would never re-trigger meaningfully),
 * and the variable-serif weight axis ties to scroll progress through the
 * hero so the headline "settles into place" as the reader starts
 * scrolling. That's the one interactive use of the font's weight axis
 * this spec calls for — never random, never constant.
 */
export function HeroHeadline({ children }: { children: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Under reduced motion, freeze at the resting weight instead of tying
  // it to scroll — a continuous scroll-driven transform is itself the
  // kind of motion this preference asks to skip.
  const weight = useTransform(scrollYProgress, [0, 1], reduced ? [300, 300] : [260, 300]);

  const words = children.split(" ");

  return (
    <motion.h1
      ref={ref}
      style={{ fontVariationSettings: useTransform(weight, (w) => `'wght' ${w}`) }}
      className="mt-16 max-w-[19ch] font-serif text-display text-ink"
      aria-label={children}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduced
              ? { duration: 0.01 }
              : { duration: 0.5, delay: i * 0.03, ease: [0.22, 0.61, 0.36, 1] }
          }
          className="inline-block"
          aria-hidden="true"
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.h1>
  );
}
