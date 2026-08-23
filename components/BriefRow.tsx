import Link from "next/link";
import type { Brief } from "@/content/briefs";

export function BriefRow({ brief, free = false }: { brief: Brief; free?: boolean }) {
  const available = brief.status === "available";
  const inner = (
    <div className="flex flex-col gap-16 py-32 md:flex-row md:items-baseline md:justify-between md:gap-32">
      <div className="min-w-0">
        <p className="font-mono text-eyebrow uppercase text-accent">
          {free ? "The Primer" : `Brief ${brief.id}`}
          {!available && " · Queued"}
        </p>
        <h3 className="mt-8 font-serif text-[26px] leading-tight text-ink">{brief.title}</h3>
        <p className="mt-8 max-w-measure font-serif text-reader text-muted">{brief.dek}</p>
      </div>
      {available && (
        <div className="flex shrink-0 items-center gap-24 md:flex-col md:items-end md:gap-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
            {brief.pages} pp &middot; {brief.sources} sources
            {brief.unresolved.length > 0 && (
              <> &middot; {brief.unresolved.length} open questions</>
            )}
          </span>
          <span className="font-sans text-[15px] text-ink">
            {free ? "Free" : `₹${brief.priceINR.toLocaleString("en-IN")} / $${brief.priceUSD}`}
          </span>
        </div>
      )}
    </div>
  );

  if (!available) {
    return <div className="rule-h opacity-60">{inner}</div>;
  }

  return (
    <Link
      href={free ? "/primer" : `/research/${brief.slug}`}
      className="block rule-h transition-colors duration-fast hover:bg-bg-raised"
    >
      {inner}
    </Link>
  );
}
