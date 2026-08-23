import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/Primitives";
import { ButtonLink } from "@/components/Button";
import { EmailCapture } from "@/components/EmailCapture";
import { BrokenMapDiagram } from "@/components/BrokenMapDiagram";

const METHOD = [
  {
    n: "01",
    title: "We read the primary sources.",
    body: "Not summaries of summaries. In the original language where the original language matters.",
  },
  {
    n: "02",
    title: "We keep the disciplines separate, then join them.",
    body: "What the text says, what the evidence shows, and what follows are three different claims and are labelled as three different claims.",
  },
  {
    n: "03",
    title: "We publish what does not resolve.",
    body: "Every brief ends with the questions still open. That section is usually the most valuable one.",
  },
  {
    n: "04",
    title: "We interpret from one consistent framework.",
    body: "Stated, examinable, applied the same way every time. Not a mood.",
  },
];

const STRATA = [
  {
    n: "I",
    title: "What the source says",
    body: "Quoted, located, dated. In the original where the original matters.",
  },
  {
    n: "II",
    title: "What the evidence shows",
    body: "Independent of the source. Cited to the study, not the summary.",
  },
  {
    n: "III",
    title: "What follows",
    body: "Our reading, marked as ours, from the framework stated in the Docs.",
  },
  {
    n: "IV",
    title: "Unresolved",
    body: "The questions the brief could not close, and what would close them.",
    accent: true,
  },
];

const LINES = [
  {
    tag: "Research",
    title: "Read the briefs",
    body: "Interdisciplinary investigations, sources shown, uncertainty declared.",
    meta: null,
    href: "/research",
  },
  {
    tag: "Studio",
    title: "Commission research",
    body: "For documentaries, books, series and briefs that have to be right.",
    meta: "Three commissions a month",
    href: "/studio",
  },
  {
    tag: "Codex",
    title: "A library that thinks with you",
    body: "The software we are building. Early access opens in cohorts.",
    meta: "In development",
    href: "/vision",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-140">
          <Container>
            <Eyebrow>Research &amp; intelligence tools</Eyebrow>
            <h1 className="mt-16 max-w-[19ch] font-serif text-hero font-light text-bone">
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

        {/* The broken map */}
        <section className="pt-140">
          <Container>
            <BrokenMapDiagram />
          </Container>
        </section>

        {/* The method */}
        <section className="pt-140 rule-h">
          <Container>
            <Eyebrow>The method</Eyebrow>
            <h2 className="mt-16 max-w-[20ch] font-serif text-section font-light text-bone">
              Four rules, applied to every brief, in the same order, every time.
            </h2>
            <div className="mt-56">
              {METHOD.map((item) => (
                <div
                  key={item.n}
                  className="grid gap-16 rule-h py-32 first:border-t-0 md:grid-cols-[3rem_1fr_1fr] md:gap-32"
                >
                  <span className="font-mono text-[13px] text-ash">{item.n}</span>
                  <h3 className="font-serif text-[24px] leading-snug text-bone">{item.title}</h3>
                  <p className="font-sans text-[15px] leading-relaxed text-ash">{item.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Anatomy of a brief */}
        <section className="pt-140 rule-h">
          <Container>
            <Eyebrow>Anatomy of a brief</Eyebrow>
            <h2 className="mt-16 max-w-[22ch] font-serif text-section font-light text-bone">
              Every brief is built the same way, so you can argue with it.
            </h2>
            <p className="mt-24 max-w-lead font-serif text-reader text-ash">
              A claim you cannot trace is an opinion. Each section below is separately sourced
              and separately labelled, which means you can accept one part and reject another
              without discarding the whole.
            </p>
            <p className="mt-16 max-w-lead font-serif text-reader text-ash">
              The last section is the one we are judged on.
            </p>

            <div className="mt-56 border border-[rgba(245,243,239,0.12)]">
              <div className="flex items-center justify-between border-b border-[rgba(245,243,239,0.12)] px-24 py-16 md:px-32">
                <span className="font-mono text-eyebrow uppercase text-ash">Brief &middot; structure</span>
                <span className="font-mono text-eyebrow uppercase text-ash">Four strata</span>
              </div>
              {STRATA.map((row) => (
                <div
                  key={row.n}
                  className={`flex gap-24 border-b border-[rgba(245,243,239,0.12)] px-24 py-24 last:border-b-0 md:px-32 md:py-32 ${
                    row.accent ? "border-l-2 border-l-copper bg-copper/[0.06]" : ""
                  }`}
                >
                  <span className="font-mono text-[13px] text-ash">{row.n}</span>
                  <div>
                    <h3 className="font-sans text-[17px] font-medium text-bone">{row.title}</h3>
                    <p className="mt-8 font-serif text-reader text-ash">{row.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Three lines of work */}
        <section className="pt-140 rule-h">
          <Container>
            <Eyebrow>Three lines of work</Eyebrow>
            <div className="mt-32 border border-[rgba(245,243,239,0.12)]">
              {LINES.map((line) => (
                <a
                  key={line.tag}
                  href={line.href}
                  className="group flex items-center justify-between gap-24 border-b border-[rgba(245,243,239,0.12)] px-24 py-32 transition-colors duration-150 last:border-b-0 hover:bg-raise md:px-32"
                >
                  <div>
                    <p className="font-mono text-eyebrow uppercase text-ash">{line.tag}</p>
                    <h3 className="mt-16 font-serif text-[28px] text-bone">{line.title}</h3>
                    <p className="mt-16 max-w-measure font-serif text-reader text-ash">{line.body}</p>
                    {line.meta && (
                      <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
                        {line.meta}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 font-serif text-[24px] text-copper transition-transform duration-150 group-hover:translate-x-4">
                    &rarr;
                  </span>
                </a>
              ))}
            </div>
          </Container>
        </section>

        {/* Closing email capture */}
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
