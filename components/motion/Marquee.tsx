/**
 * Newsletter tagline marquee, spec §30.6 — CSS-animated, infinite,
 * pause on hover. Server component; the pause/reduced-motion behavior
 * lives entirely in the .marquee/.marquee-track CSS (app/globals.css),
 * so there's no client JS cost for a purely decorative loop.
 */
export function Marquee({ text }: { text: string }) {
  return (
    <div className="marquee overflow-hidden">
      <div className="marquee-track flex w-max whitespace-nowrap">
        {[0, 1].map((i) => (
          <p key={i} className="pr-64 font-serif text-h2 font-medium text-ink" aria-hidden={i === 1}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
