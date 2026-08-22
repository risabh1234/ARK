export type PrimerQuestion = {
  n: number;
  category: string;
  question: string;
  pointsTo: string;
};

export const primerQuestions: PrimerQuestion[] = [
  {
    n: 1,
    category: "Identity",
    question:
      "If your body has replaced nearly every cell in seven years, what exactly is the “you” that made a promise in 2019?",
    pointsTo: "Brief 003 takes this one apart.",
  },
  {
    n: 2,
    category: "Evidence",
    question:
      "You rank your sources without knowing you’re doing it. What is actually first on that list, and did you choose it?",
    pointsTo: "Brief 005 takes this one apart.",
  },
  {
    n: 3,
    category: "Desire",
    question:
      "Wanting the thing and getting the thing are two different systems. Which one failed you last time you won?",
    pointsTo: "Brief 001 takes this one apart.",
  },
  {
    n: 4,
    category: "Aesthetic",
    question:
      "Every tradition claims purity is visible on the outside. Point to the experiment that would prove it.",
    pointsTo: "Brief 002 takes this one apart.",
  },
  {
    n: 5,
    category: "Time",
    question:
      "You call it intuition. What is the base rate you’re actually running, and where did you get the sample?",
    pointsTo: "Unresolved. No brief owns this one yet.",
  },
  {
    n: 6,
    category: "Desire",
    question:
      "If suppression and indulgence both fail the same people, what is the third option nobody is selling you?",
    pointsTo: "Brief 001 takes this one apart.",
  },
  {
    n: 7,
    category: "Evidence",
    question:
      "Testimony, perception, inference — which one built the belief you’d defend hardest, and would it survive cross-examination?",
    pointsTo: "Brief 005 takes this one apart.",
  },
  {
    n: 8,
    category: "Power",
    question:
      "Your ambition and your peace are supposedly at war. Who told you that, and what do they gain if you keep believing it?",
    pointsTo: "Unresolved. No brief owns this one yet.",
  },
  {
    n: 9,
    category: "Language",
    question:
      "Name one conclusion you currently hold that you arrived at without a single inherited premise.",
    pointsTo: "Unresolved. No brief owns this one yet.",
  },
  {
    n: 10,
    category: "Power",
    question:
      "If nothing had ranked today’s feed for you, what would you have noticed instead, left alone for an hour?",
    pointsTo: "The Primer takes this one apart — by email.",
  },
];
