import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/Primitives";
import { ButtonLink } from "@/components/Button";
import { EmailCapture } from "@/components/EmailCapture";
import { BrokenMapDiagram } from "@/components/BrokenMapDiagram";
import { Card } from "@/components/Card";
import { Reveal } from "@/components/motion/Reveal";
import { HeroHeadline } from "@/components/motion/HeroHeadline";
import { StickyNumerals } from "@/components/motion/StickyNumerals";
import { Marquee } from "@/components/motion/Marquee";

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
    meta: undefined,
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
        <section className="relative overflow-hidden pt-140">
          <div className="hero-glow" aria-hidden="true" />
          <Container className="relative">
            <Eyebrow>Research &amp; intelligence tools</Eyebrow>
            <HeroHeadline>
              You are not short of information. You are short of a way to hold it together.
            </HeroHeadline>
            <p className="mt-32 max-w-lead font-serif text-lead font-light text-muted">
              ĀRK builds research and intelligence tools for people who would rather understand
              something completely than believe it quickly.
            </p>
            <div className="mt-32 flex flex-wrap items-center gap-24">
              <ButtonLink href="/primer" variant="primary">
                Read the Primer — free
              </ButtonLink>
              <span className="font-mono text-eyebrow uppercase text-muted">
                50 questions &middot; no account needed
              </span>
            </div>
          </Container>
        </section>

        {/* The broken map */}
        <section className="pt-140">
          <Container>
            <Reveal>
              <BrokenMapDiagram />
            </Reveal>
          </Container>
        </section>

        {/* The method — sticky numeral pattern, spec §12.3/§30.5 */}
        <section className="pt-140 rule-h">
          <Container>
            <Eyebrow>The method</Eyebrow>
            <h2 className="mt-16 max-w-[20ch] font-serif text-h1 font-light text-ink">
              Four rules, applied to every brief, in the same order, every time.
            </h2>
            <div className="mt-56">
              <StickyNumerals items={METHOD} />
            </div>
          </Container>
        </section>

        {/* Anatomy of a brief */}
        <section className="pt-140 rule-h">
          <Container>
            <Eyebrow>Anatomy of a brief</Eyebrow>
            <h2 className="mt-16 max-w-[22ch] font-serif text-h1 font-light text-ink">
              Every brief is built the same way, so you can argue with it.
            </h2>
            <p className="mt-24 max-w-lead font-serif text-body text-muted">
              A claim you cannot trace is an opinion. Each section below is separately sourced
              and separately labelled, which means you can accept one part and reject another
              without discarding the whole.
            </p>
            <p className="mt-16 max-w-lead font-serif text-body text-muted">
              The last section is the one we are judged on.
            </p>

            <Reveal className="mt-56 border border-rule">
              <div className="flex items-center justify-between border-b border-rule px-24 py-16 md:px-32">
                <span className="font-mono text-eyebrow uppercase text-muted">Brief &middot; structure</span>
                <span className="font-mono text-eyebrow uppercase text-muted">Four strata</span>
              </div>
              {STRATA.map((row) => (
                <div
                  key={row.n}
                  className={`flex gap-24 border-b border-rule px-24 py-24 last:border-b-0 md:px-32 md:py-32 ${
                    row.accent ? "border-l-2 border-l-accent bg-accent/[0.06]" : ""
                  }`}
                >
                  <span className="font-mono text-[13px] text-muted">{row.n}</span>
                  <div>
                    <h3 className="font-sans text-[17px] font-medium text-ink">{row.title}</h3>
                    <p className="mt-8 font-serif text-body text-muted">{row.body}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </Container>
        </section>

        {/* Three lines of work — standard cards, spec §12.4/§31.1 */}
        <section className="pt-140 rule-h">
          <Container>
            <Eyebrow>Three lines of work</Eyebrow>
            <div className="mt-32 grid gap-24 md:grid-cols-3">
              {LINES.map((line, i) => (
                <Reveal key={line.tag} delay={i * 0.1}>
                  <Card
                    href={line.href}
                    eyebrow={line.tag}
                    title={line.title}
                    body={line.body}
                    meta={line.meta}
                  />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Closing email capture */}
        <section className="mt-140 border-y border-rule bg-bg-raised py-88">
          <Container>
            <Marquee text="One question, one source, one idea. Every week." />
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
