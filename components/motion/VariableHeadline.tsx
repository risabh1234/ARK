"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Hover-driven variable-font weight shift — the specific interaction
 * the user pointed to on the Mona Sans page (hovering the headline
 * changes the letterforms). Fraunces is a variable font with a wide
 * weight axis, so this is a real font-variation-settings animation, not
 * a CSS font-weight snap between two static instances. Disabled under
 * reduced motion (holds at the resting weight instead of animating).
 */
export function VariableHeadline({
  children,
  as: Tag = "h1",
  className = "",
  restWeight = 500,
  hoverWeight = 620,
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  restWeight?: number;
  hoverWeight?: number;
}) {
  const [hovering, setHovering] = useState(false);
  const reduced = useReducedMotion();
  const weight = reduced ? restWeight : hovering ? hoverWeight : restWeight;

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      onHoverStart={() => setHovering(true)}
      onHoverEnd={() => setHovering(false)}
      animate={{ fontVariationSettings: `'wght' ${weight}` }}
      transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
