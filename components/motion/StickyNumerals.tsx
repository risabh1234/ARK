"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";

type Item = { n: string; title: string; body: string };

/**
 * Sticky-numeral pattern, spec §12.3/§30.5 — numerals stick to the left
 * while descriptions scroll past on the right, ≥1024px only. Stacks
 * normally on mobile (the sticky column becomes a plain block).
 */
export function StickyNumerals({ items }: { items: Item[] }) {
  return (
    <div className="lg:grid lg:grid-cols-[8rem_1fr]">
      <div className="hidden lg:block">
        <div className="method-numeral flex flex-col gap-56">
          {items.map((item) => (
            <span key={item.n} className="font-serif text-h1 font-light text-rule">
              {item.n}
            </span>
          ))}
        </div>
      </div>
      <div>
        {items.map((item, i) => (
          <Row key={item.n} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

function Row({ item, index }: { item: Item; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40% 0px" }}
      transition={
        reduced
          ? { duration: 0.01 }
          : { duration: 0.35, delay: (index % 4) * 0.08, ease: [0.22, 0.61, 0.36, 1] }
      }
      className="grid gap-16 rule-h py-32 first:border-t-0 md:grid-cols-[3rem_1fr] md:gap-32 lg:grid-cols-1"
    >
      <span className="font-mono text-[13px] text-muted lg:hidden">{item.n}</span>
      <div>
        <h3 className="font-serif text-[24px] leading-snug text-ink">{item.title}</h3>
        <p className="mt-8 font-sans text-[15px] leading-relaxed text-muted">{item.body}</p>
      </div>
    </motion.div>
  );
}
