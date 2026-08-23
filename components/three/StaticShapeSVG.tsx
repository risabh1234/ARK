/**
 * Static fallback for the 3D scenes — rendered when WebGL is
 * unavailable or prefers-reduced-motion is set, so the page never
 * shows a blank space where the 3D element would be (spec §30.3).
 */
export function StaticIcosahedronSVG() {
  return (
    <svg viewBox="0 0 200 200" className="mx-auto h-full max-h-[280px] w-auto" aria-hidden="true">
      <g fill="none" stroke="#D94A16" strokeWidth="1" opacity="0.5">
        <polygon points="100,20 160,60 160,140 100,180 40,140 40,60" />
        <polygon points="100,20 40,60 100,100" />
        <polygon points="100,20 160,60 100,100" />
        <polygon points="40,60 40,140 100,100" />
        <polygon points="160,60 160,140 100,100" />
        <polygon points="40,140 100,180 100,100" />
        <polygon points="160,140 100,180 100,100" />
      </g>
    </svg>
  );
}

export function StaticGlobeSVG() {
  const nodes: [number, number][] = [
    [60, 55], [140, 40], [175, 90], [130, 145], [70, 155], [30, 100], [100, 100], [155, 65],
  ];
  const arcs: [number, number][] = [[0, 3], [1, 4], [2, 5], [6, 1], [7, 4]];
  return (
    <svg viewBox="0 0 200 200" className="mx-auto h-full max-h-[280px] w-auto" aria-hidden="true">
      <circle cx="100" cy="100" r="70" fill="none" stroke="#3E7BFA" strokeWidth="1" opacity="0.18" />
      <ellipse cx="100" cy="100" rx="70" ry="24" fill="none" stroke="#3E7BFA" strokeWidth="1" opacity="0.18" />
      <ellipse cx="100" cy="100" rx="24" ry="70" fill="none" stroke="#3E7BFA" strokeWidth="1" opacity="0.18" />
      <g stroke="#3E7BFA" strokeWidth="0.6" opacity="0.4" fill="none">
        {arcs.map(([a, b], i) => {
          const [x1, y1] = nodes[a];
          const [x2, y2] = nodes[b];
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2 - 20;
          return <path key={i} d={`M${x1},${y1} Q${mx},${my} ${x2},${y2}`} />;
        })}
      </g>
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#3E7BFA" opacity="0.85" />
      ))}
    </svg>
  );
}

export function StaticParticleClusterSVG() {
  const dots = [
    [40, 60], [70, 30], [110, 40], [150, 55], [170, 90],
    [150, 130], [120, 160], [80, 165], [45, 140], [25, 100],
    [90, 90], [115, 110], [65, 100], [130, 80], [95, 130],
  ];
  return (
    <svg viewBox="0 0 200 200" className="mx-auto h-full max-h-[280px] w-auto" aria-hidden="true">
      <g stroke="#D94A16" strokeWidth="0.6" opacity="0.35">
        {dots.slice(1).map(([x, y], i) => (
          <line key={i} x1={dots[0][0]} y1={dots[0][1]} x2={x} y2={y} />
        ))}
      </g>
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 ? 4 : 2.5} fill="#D94A16" opacity={i === 0 ? 0.7 : 0.45} />
      ))}
    </svg>
  );
}
