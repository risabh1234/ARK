const LABELS = [
  { text: "The join", pos: "left-0 top-[10%]", tone: "copper" as const },
  { text: "Science", pos: "right-0 top-[10%] text-right", tone: "ash" as const },
  { text: "Religion", pos: "left-0 bottom-[10%]", tone: "ash" as const },
  { text: "The market", pos: "right-0 bottom-[10%] text-right", tone: "ash" as const },
];

export function BrokenMapDiagram() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {/* three broken maps — solid ash, three-quarter sweep */}
        <path
          d="M150,10 A140,140 0 1 1 10,150"
          fill="none"
          stroke="#8E8B85"
          strokeWidth="1"
          opacity="0.4"
        />
        {/* the join — dashed copper, one quarter */}
        <path
          d="M10,150 A140,140 0 0 1 150,10"
          fill="none"
          stroke="#C4694A"
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />
      </svg>

      {LABELS.map((label) => (
        <span
          key={label.text}
          className={`absolute w-[40%] font-mono text-eyebrow uppercase ${label.pos} ${
            label.tone === "copper" ? "text-copper" : "text-ash"
          }`}
        >
          {label.text}
        </span>
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <p className="max-w-[62%] text-center font-serif text-[22px] font-light leading-snug text-bone">
          Nobody hands you the whole map. So you carry three broken ones.
        </p>
      </div>
    </div>
  );
}
