export type Brief = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  status: "available" | "queued";
  pages: number;
  sources: number;
  priceINR: number;
  priceUSD: number;
  unresolved: string[];
  provocation?: string;
  whatIsInside?: string[];
  sampleHeading?: string;
  sampleExcerpt?: string;
};

export const briefs: Brief[] = [
  {
    id: "001",
    slug: "the-architecture-of-desire",
    title: "The Architecture of Desire",
    dek: "Why getting what you wanted did not settle anything — and the four-part model of human aims that explains it.",
    status: "available",
    pages: 48,
    sources: 63,
    priceINR: 1299,
    priceUSD: 19,
    unresolved: [
      "Whether the four aims are discovered or merely a useful partition",
      "What happens to the model under chosen, permanent scarcity",
      "Whether ranking can be taught or only caught",
    ],
    provocation:
      "You got the job, the relationship, the number on the scale, the thing you were sure would settle it. It did not settle it. This brief is not about wanting less. It is about a four-part model of human aims — where desire actually sits among knowledge, ambition and meaning — and what breaks when one of the four is left to run the other three.",
    whatIsInside: [
      "The arrival problem — why the feeling never matches the plan",
      "What wanting is actually for, mechanically",
      "The four aims, and what happens when one eats the others",
      "Suppression and its failure modes, examined without moralising",
      "Saturation and its failure modes, examined without moralising",
      "Desire given a correct, bounded place in the architecture",
      "What remains unresolved — stated plainly, not hidden",
    ],
    sampleHeading: "Wanting is not the problem. Ranking is.",
    sampleExcerpt:
      "Materialism says consume, and leaves them hollow. Inherited moral systems say suppress, and leave them guilty. Both are partial. Neither is a system. The result is a permanent low-grade dissonance that people feel constantly and describe almost never — because there is no vocabulary for it that does not sound either clinical or preachy. This brief gives it a vocabulary, and then a structure.",
  },
  {
    id: "002",
    slug: "the-myth-of-the-pure-aesthetic",
    title: "The Myth of the Pure Aesthetic",
    dek: "Purity was never about the surface. What the claim actually is, and why every tradition got it backwards in practice.",
    status: "queued",
    pages: 0,
    sources: 0,
    priceINR: 1299,
    priceUSD: 19,
    unresolved: [],
  },
  {
    id: "003",
    slug: "seven-years-of-cells",
    title: "Seven Years of Cells",
    dek: "Your matter was replaced. Your memory was not. Identity, biology, and the persistence problem.",
    status: "queued",
    pages: 0,
    sources: 0,
    priceINR: 1299,
    priceUSD: 19,
    unresolved: [],
  },
  {
    id: "004",
    slug: "can-vimanas-fly",
    title: "Can Vimānas Fly?",
    dek: "Seventeen primary sources on ancient flight, an aerospace engineer, and an honest verdict.",
    status: "queued",
    pages: 0,
    sources: 0,
    priceINR: 1299,
    priceUSD: 19,
    unresolved: [],
  },
  {
    id: "005",
    slug: "how-to-know-anything",
    title: "How to Know Anything",
    dek: "Testimony, inference, perception — the classical machinery of valid knowledge, taught as a usable tool.",
    status: "queued",
    pages: 0,
    sources: 0,
    priceINR: 1299,
    priceUSD: 19,
    unresolved: [],
  },
];

export function getBrief(slug: string) {
  return briefs.find((b) => b.slug === slug);
}
