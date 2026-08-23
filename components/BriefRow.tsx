import Link from "next/link";
import type { Brief } from "@/content/briefs";

export function BriefRow({ brief, free = false }: { brief: Brief; free?: boolean }) {
  const available = brief.status === "available";
  const inner = (
    <div className="grid grid-cols-[3rem_1fr] items-baseline gap-16 py-32 md:grid-cols-[4.5rem_1fr_auto] md:gap-32">
      <span className="font-serif text-[28px] font-medium leading-none text-rule md:text-[36px]">
        {free ? "00" : brief.id}
      </span>
      <div className="min-w-0">
        <p className="font-mono text-eyebrow uppercase text-accent">
          {free ? "The Primer" : "Brief"}
          {!available && " · Queued"}
        </p>
        <h3 className="mt-8 font-serif text-[26px] font-medium leading-tight text-ink">{brief.title}</h3>
        <p className="mt-8 max-w-measure font-serif text-reader text-muted">{brief.dek}</p>
      </div>
      {available && (
        <div className="col-span-2 flex items-center justify-between gap-24 pl-64 md:col-span-1 md:flex-col md:items-end md:gap-8 md:pl-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
            {brief.pages} pp &middot; {brief.sources} sources
            {brief.unresolved.length > 0 && (
              <> &middot; {brief.unresolved.length} open questions</>
            )}
          </span>
          <span className="font-sans text-[15px] font-medium text-ink">
            {free ? "Free" : `₹${brief.priceINR.toLocaleString("en-IN")} / $${brief.priceUSD}`}
          </span>
        </div>
      )}
    </div>
  );

  if (!available) {
    return <div className="rule-h opacity-50">{inner}</div>;
  }

  return (
    <Link
      href={free ? "/primer" : `/research/${brief.slug}`}
      className="group block rule-h transition-colors duration-fast hover:bg-bg-raised"
    >
      {inner}
    </Link>
  );
}
