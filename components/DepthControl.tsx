"use client";

import { useState } from "react";

const LEVELS = [
  { key: "quick", label: "Quick", paid: false },
  { key: "explain", label: "Explain", paid: false },
  { key: "deep", label: "Deep", paid: true },
  { key: "complete", label: "Complete", paid: true },
] as const;

export function DepthControl({ owned = false }: { owned?: boolean }) {
  const [active, setActive] = useState<(typeof LEVELS)[number]["key"]>("explain");
  const current = LEVELS.find((l) => l.key === active)!;

  return (
    <div>
      <div className="grid grid-cols-4 border border-[rgba(245,243,239,0.16)]">
        {LEVELS.map((level) => (
          <button
            key={level.key}
            onClick={() => setActive(level.key)}
            className={`px-16 py-16 font-sans text-[14px] transition-colors duration-150 ${
              active === level.key
                ? "bg-copper text-ink"
                : "bg-transparent text-bone hover:bg-raise"
            }`}
          >
            {level.label}
          </button>
        ))}
      </div>
      {current.paid && !owned && (
        <div className="mt-16 border-t-2 border-copper pt-16">
          <p className="font-sans text-[14px] text-bone">
            <span className="font-medium">Included with the brief.</span>{" "}
            <span className="text-ash">Deep and Complete are the paid tier.</span>
          </p>
        </div>
      )}
    </div>
  );
}
