import Link from "next/link";

/**
 * Standard hover-lift card, spec §31.1 — reused across Home's product
 * cards, Research's catalogue, and Studio's tiers. Elevation 1 at rest,
 * elevation 2 + accent border + arrow-slide on hover.
 */
export function Card({
  href,
  eyebrow,
  title,
  body,
  meta,
  className = "",
}: {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
  meta?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden border border-rule bg-bg-raised p-32 shadow-1 transition-[transform,box-shadow,border-color] duration-fast ease-standard hover:-translate-y-[8px] hover:border-ink hover:shadow-3 ${className}`}
    >
      <span className="absolute inset-x-0 top-0 h-2 origin-left scale-x-0 bg-accent transition-transform duration-base ease-standard group-hover:scale-x-100" />
      <p className="font-mono text-eyebrow uppercase text-accent">{eyebrow}</p>
      <h3 className="mt-16 font-serif text-h2 font-medium text-ink">{title}</h3>
      <p className="mt-16 max-w-measure font-serif text-body text-muted">{body}</p>
      {meta && (
        <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">{meta}</p>
      )}
      <span className="mt-24 inline-block font-serif text-[20px] font-medium text-ink transition-transform duration-fast ease-standard group-hover:translate-x-6 group-hover:text-accent">
        &rarr;
      </span>
    </Link>
  );
}
