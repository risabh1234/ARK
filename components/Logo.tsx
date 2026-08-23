/**
 * The mark, animated — per "ĀRK — Identity in Motion, Doc 02, 5-second cycle."
 * Seven beats, one house curve (cubic-bezier(0.16,1,0.3,1)), draws once on
 * mount then holds (see the .ark-mark rules in app/globals.css). Pure CSS —
 * no client JS, so prefers-reduced-motion is handled natively by the browser
 * without a hydration flash.
 */
export function Logo({ height = 40, className = "" }: { height?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 170"
      height={height}
      width={(height * 200) / 170}
      className={`ark-mark ${className}`}
      role="img"
      aria-label="ĀRK"
    >
      <g fill="none" stroke="#6B6459" strokeWidth="2" strokeLinecap="round">
        <path className="ark-draw ark-earth" pathLength={1} d="M100,152 Q58,157 20,146" />
        <path className="ark-draw ark-earth" pathLength={1} d="M100,152 Q142,157 180,146" />
      </g>
      <circle
        className="ark-draw ark-ring"
        pathLength={1}
        cx="100"
        cy="76"
        r="58"
        fill="none"
        stroke="#B5502F"
        strokeWidth="1.5"
        transform="rotate(-90 100 76)"
      />
      <g fill="none" stroke="#23201B" strokeWidth="5" strokeLinecap="square">
        <path className="ark-draw ark-leg" pathLength={1} d="M52,148 L88,76" />
        <path className="ark-draw ark-leg" pathLength={1} d="M148,148 L112,76" />
      </g>
      <polygon className="ark-plate" points="80,76 120,76 113,65 87,65" fill="#23201B" />
      <circle className="ark-star-glow" cx="100" cy="46" r="20" fill="#B5502F" />
      <polygon
        className="ark-star-core"
        points="100,22 105,37 120,42 105,47 100,62 95,47 80,42 95,37"
        fill="#CD7350"
      />
    </svg>
  );
}
