import type { ReactElement } from "react";

interface RuleItem {
  num: string;
  rule: string;
  gloss: string;
}

const RULES: ReadonlyArray<RuleItem> = [
  {
    num: "01",
    rule: "The legend comes before the terrain.",
    gloss: "Anything that carries meaning — a colour, a mark, a counter — arrives with a key you can see.",
  },
  {
    num: "02",
    rule: "Every claim carries its coordinates.",
    gloss: "No sentence stands without its source, its count, its date, or an honest mark saying the question is still open.",
  },
  {
    num: "03",
    rule: "Unmapped ground stays on the map.",
    gloss: "What we could not settle is drawn as bounded, named space — never left blank, never written around.",
  },
  {
    num: "04",
    rule: "The margin carries the proof.",
    gloss: "Sources and working notes live in the margin, in their own typeface, quiet but never absent.",
  },
];

export function FourRules(): ReactElement {
  return (
    <div className="v3-four-rules-grid" role="list" aria-label="Four rules governing every brief">
      {RULES.map((r) => (
        <div key={r.num} className="v3-rule-plate" role="listitem">
          <div className="v3-rule-num">{r.num}</div>
          <h3 className="v3-rule-title">{r.rule}</h3>
          <p className="v3-rule-gloss">{r.gloss}</p>
        </div>
      ))}
    </div>
  );
}
