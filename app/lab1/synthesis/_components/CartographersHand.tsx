import type { ReactElement } from "react";

export function CartographersHand(): ReactElement {
  return (
    <aside className="v3-cartographer-aside ark-cartographer-box" aria-label="The Cartographer's Hand">
      <div className="v3-cartographer-head">
        <span className="v3-cartographer-icon" aria-hidden="true">⌖</span>
        <span className="v3-cartographer-title">THE CARTOGRAPHER&apos;S HAND</span>
      </div>
      <blockquote className="v3-cartographer-quote ark-cartographer-quote">
        These maps were drawn by different civilisational institutions. They disagree. This atlas is an attempt to navigate all four — and it names its own standpoint wherever that standpoint shapes the reading.
      </blockquote>
    </aside>
  );
}
