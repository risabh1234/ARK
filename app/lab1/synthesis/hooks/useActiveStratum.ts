"use client";

import { useEffect, useState } from "react";

export type StratumId = "i" | "ii" | "iii" | "iv";

/**
 * Hook for stratigraphic depth detection.
 * Uses a single IntersectionObserver with a centered band rootMargin (-45% 0px -45% 0px)
 * and empty dependency array [] to prevent scroll listener churn.
 */
export function useActiveStratum(): StratumId {
  const [active, setActive] = useState<StratumId>("i");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const map: Record<string, StratumId> = {
      "beat-1": "i",
      "beat-2": "i",
      "beat-3": "ii",
      "beat-4": "ii",
      "beat-5": "iii",
      "beat-6": "iii",
      "beat-7": "iv",
    };

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible && map[visible.target.id]) {
          setActive(map[visible.target.id]);
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    const beatIds = ["beat-1", "beat-2", "beat-3", "beat-4", "beat-5", "beat-6", "beat-7"];
    beatIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return active;
}
