/**
 * Giant footer wordmark — the "big letters, color changes" element the
 * user pointed to. Rests at a dim tone against the dark footer ground,
 * shifts to the accent color under the cursor. Plain CSS hover +
 * transition — no JS needed for a color change, so no client bundle
 * cost (a Framer Motion version of this added ~40KB to every route
 * that renders the footer, i.e. nearly every route — not worth it for
 * a hover color swap).
 */
export function GiantWordmark() {
  return (
    <p
      className="mt-56 select-none text-center font-serif text-[18vw] font-semibold leading-none tracking-[-0.04em] text-bg/[0.12] transition-colors duration-slow ease-standard hover:text-accent md:text-[14vw]"
      aria-hidden="true"
    >
      ĀRK
    </p>
  );
}
