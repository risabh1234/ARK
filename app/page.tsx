import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/Primitives";
import { ButtonLink } from "@/components/Button";
import { EmailCapture } from "@/components/EmailCapture";

const PROBLEM = [
  "Science explains the mechanism and stops at the meaning.",
  "The market explains the ambition and stops at the emptiness.",
  "Religion explains the meaning and asks you to stop asking.",
];

const METHOD = [
  {
    title: "We read the primary sources.",
    body: "Not summaries of summaries. In the original language where the original language matters.",
  },
  {
    title: "We keep the disciplines separate, then join them.",
    body: "What the text says, what the evidence shows, and what follows are three different claims and are labelled as three different claims.",
  },
  {
    title: "We publish what does not resolve.",
    body: "Every brief ends with the questions still open. That section is usually the most valuable one.",
  },
  {
    title: "We interpret from one consistent framework.",
    body: "Stated, examinable, applied the same way every time. Not a mood.",
  },
];

const DOORS = [
  {
    tag: "Research",
    title: "Read the briefs",
    body: "Interdisciplinary investigations, sources shown, uncertainty declared. From ₹1,299.",
    href: "/research",
  },
  {
    tag: "Studio",
    title: "Commission research",
    body: "For documentaries, books, series and briefs that have to be right. Three commissions a month.",
    href: "/studio",
  },
  {
    tag: "Codex",
    title: "A library that thinks with you",
    body: "The software we are building. Early access opens in cohorts.",
    href: "/vision",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero — full viewport, nothing else on screen */}
        <section className="flex min-h-screen flex-col justify-center pt-88">
          <Container>
            <h1 className="max-w-[18ch] font-serif text-hero font-light text-bone">
              You are not short of information. You are short of a way to hold it together.
            </h1>
            <p className="mt-32 max-w-lead font-serif text-lead font-light text-ash">
              ĀRK builds research and intelligence tools for people who would rather understand
              something completely than believe it quickly.
            </p>
            <div className="mt-32 flex flex-wrap items-center gap-24">
              <ButtonLink href="/primer" variant="primary">
                Read the Primer — free
              </ButtonLink>
              <span className="font-mono text-eyebrow uppercase text-ash">
                50 questions &middot; no account needed
              </span>
            </div>
          </Container>
        </section>

        {/* 02 — The problem */}
        <section className="pt-140 rule-h">
          <Container>
            <div className="grid gap-56 md:grid-cols-3">
              {PROBLEM.map((line) => (
                <p key={line} className="font-serif text-[22px] leading-snug text-bone">
                  “{line}”
                </p>
              ))}
            </div>
            <p className="mt-56 max-w-lead font-serif text-lead italic font-light text-copper">
              “Nobody hands you the whole map. So you carry three broken ones.”
            </p>
          </Container>
        </section>

        {/* 03 — The method */}
        <section className="pt-140 rule-h">
          <Container>
            <Eyebrow>The method</Eyebrow>
            <div className="mt-32 grid gap-56 md:grid-cols-2">
              {METHOD.map((item) => (
                <div key={item.title}>
                  <h3 className="font-sans text-[16px] font-medium text-bone">{item.title}</h3>
                  <p className="mt-8 max-w-measure font-serif text-reader text-ash">{item.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* 04 — Three doors */}
        <section className="pt-140 rule-h">
          <Container>
            <div className="grid gap-0 border border-[rgba(245,243,239,0.12)] md:grid-cols-3">
              {DOORS.map((door, i) => (
                <a
                  key={door.tag}
                  href={door.href}
                  className={`p-32 hover:bg-raise transition-colors duration-150 ${
                    i > 0 ? "border-t border-[rgba(245,243,239,0.12)] md:border-t-0 md:border-l" : ""
                  }`}
                >
                  <Eyebrow>{door.tag}</Eyebrow>
                  <h3 className="mt-16 font-serif text-[24px] text-bone">{door.title}</h3>
                  <p className="mt-16 font-serif text-reader text-ash">{door.body}</p>
                </a>
              ))}
            </div>
          </Container>
        </section>

        {/* 05 — closing email capture, full-bleed ink */}
        <section className="mt-140 border-y border-[rgba(245,243,239,0.12)] bg-panel py-88">
          <Container>
            <p className="font-serif text-section font-light text-bone">
              One question, one source, one idea. Every week.
            </p>
            <div className="mt-32 max-w-lead">
              <EmailCapture source="home" />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
