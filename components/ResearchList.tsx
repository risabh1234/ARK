"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BriefRow } from "./BriefRow";
import type { Brief, Topic } from "@/content/briefs";

const TOPICS: Topic[] = ["Desire", "Aesthetics", "Identity", "History", "Epistemology"];

const primerRow: Brief = {
  id: "000",
  slug: "primer",
  title: "The ĀRK Primer",
  dek: "Fifty questions worth asking. No account needed.",
  status: "available",
  pages: 0,
  sources: 0,
  priceINR: 0,
  priceUSD: 0,
  unresolved: [],
};

/**
 * Research catalogue filter bar, spec §13 — topic pills with a spring-in
 * animation on selection. Kept as a list (BriefRow), not a card grid —
 * a deliberate, previously-logged deviation from the generic card
 * pattern, unrelated to this redesign.
 */
export function ResearchList({ briefs }: { briefs: Brief[] }) {
  const [active, setActive] = useState<Topic | "all">("all");
  const reduced = useReducedMotion();

  const filtered = useMemo(
    () => (active === "all" ? briefs : briefs.filter((b) => b.topic === active)),
    [active, briefs]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-8" role="group" aria-label="Filter by topic">
        <FilterPill label="All" active={active === "all"} onClick={() => setActive("all")} />
        {TOPICS.map((topic) => (
          <FilterPill key={topic} label={topic} active={active === topic} onClick={() => setActive(topic)} />
        ))}
      </div>

      <div className="mt-40">
        <BriefRow brief={primerRow} free />
        <AnimatePresence initial={false}>
          {filtered.map((brief) => (
            <motion.div
              key={brief.id}
              initial={{ opacity: 0, height: reduced ? "auto" : 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: reduced ? "auto" : 0 }}
              transition={reduced ? { duration: 0.01 } : { duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <BriefRow brief={brief} />
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <p className="rule-h py-32 font-serif text-body text-muted">
            Nothing in this topic yet — it&rsquo;s queued.
          </p>
        )}
      </div>
    </div>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative border px-16 py-8 font-mono text-[12px] uppercase tracking-[0.1em] transition-colors duration-fast ${
        active ? "border-accent-deep text-accent" : "border-rule text-muted hover:text-ink"
      }`}
    >
      {active && (
        <motion.span
          layoutId="active-filter-pill"
          className="absolute inset-0 -z-10 bg-accent/[0.08]"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      {label}
    </button>
  );
}
