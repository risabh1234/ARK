import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/Primitives";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "How ĀRK works: the method behind the briefs, how a brief is structured, and what we deliberately don't do.",
};

const METHOD = [
  {
    title: "Primary sources, not summaries of summaries.",
    body: "Where the original language matters, we read it in the original language. A brief cites what it actually read, not what it read about.",
  },
  {
    title: "Disciplines kept separate, then joined.",
    body: "What a text says, what the evidence shows, and what follows from combining them are three different claims — and every brief labels which one it's making, sentence by sentence.",
  },
  {
    title: "What doesn't resolve gets published anyway.",
    body: "Every brief ends with an Unresolved section, visible before you buy. It's usually the most valuable part, and it's the opposite of how most research gets sold.",
  },
  {
    title: "One interpretive framework, applied the same way every time.",
    body: "Stated, examinable, consistent across briefs — not a mood that shifts with the topic. You can disagree with the framework; you can't accuse it of moving.",
  },
];

const DEPTH_LEVELS = [
  { label: "Quick", detail: "The claim, in one paragraph. Free.", free: true },
  { label: "Explain", detail: "The argument, in full. Free.", free: true },
  { label: "Deep", detail: "Sources, counter-arguments, working notes. Paid.", free: false },
  { label: "Complete", detail: "Everything, including what we couldn't resolve. Paid.", free: false },
];

const WHAT_WE_DONT_DO = [
  "No fake scarcity timers or countdowns. Urgency comes from the idea, not a clock.",
  "No follower counts, no engagement theatre. The only numbers we show are sources read and pages written.",
  "No infinite scroll and no notification badges — we're not competing for your attention, we're trying to end a specific itch.",
  "No exit popups, no chat bubbles, no cookie theatre. Prices are published on the page, not hidden behind a call.",
];

const SITE_MAP = [
  { href: "/research", label: "Research", body: "The brief catalogue. One free item, the rest priced and sourced." },
  { href: "/studio", label: "Studio", body: "Commission research for documentaries, books, series and briefs." },
  { href: "/vision", label: "Vision", body: "What ĀRK Codex is, and the waitlist for early access." },
  { href: "/primer", label: "The Primer", body: "Ten free questions now, forty more by email." },
] as const;

export default function DocsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-140 pb-88">
          <Container>
            <Eyebrow>Documentation</Eyebrow>
            <h1 className="mt-16 max-w-[16ch] font-serif text-section font-light text-bone">
              How ĀRK works.
            </h1>
            <p className="mt-24 max-w-lead font-serif text-lead font-light text-ash">
              This page exists so nobody has to take the framework on faith. It describes the
              method we hold every brief to, how a brief is structured, and what we deliberately
              refuse to do — regardless of what would convert better.
            </p>
          </Container>
        </section>

        <section className="bg-paper py-88 text-paper-text">
          <Container>
            <div className="mx-auto max-w-measure">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper-text/50">
                The method
              </p>
              <div className="mt-32 space-y-32">
                {METHOD.map((item) => (
                  <div key={item.title}>
                    <h3 className="font-sans text-[16px] font-medium">{item.title}</h3>
                    <p className="mt-8 font-serif text-reader text-paper-text/80">{item.body}</p>
                  </div>
                ))}
              </div>

              <p className="mt-56 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-text/50">
                How a brief is structured
              </p>
              <p className="mt-16 font-serif text-reader text-paper-text/80">
                Every paid brief follows the same shape: a title, a one-paragraph provocation, a
                list of what's inside, an Unresolved section you can read before you buy, and a
                depth control so you choose how far in you go.
              </p>
              <div className="mt-24 divide-y divide-paper-text/10 border-y border-paper-text/10">
                {DEPTH_LEVELS.map((level) => (
                  <div key={level.label} className="flex items-baseline justify-between py-16">
                    <span className="font-sans text-[15px] font-medium">{level.label}</span>
                    <span className="font-serif text-[15px] text-paper-text/70">
                      {level.detail}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-56 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-text/50">
                What we deliberately don&rsquo;t do
              </p>
              <ul className="mt-16 space-y-12">
                {WHAT_WE_DONT_DO.map((line) => (
                  <li key={line} className="flex gap-16 font-serif text-reader text-paper-text/80">
                    <span className="text-copper">&rarr;</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <section className="pt-140 rule-h">
          <Container>
            <Eyebrow tone="ash">Where to go next</Eyebrow>
            <div className="mt-32 grid gap-0 border border-[rgba(245,243,239,0.12)] md:grid-cols-4">
              {SITE_MAP.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`p-24 hover:bg-raise transition-colors duration-150 ${
                    i > 0 ? "border-t border-[rgba(245,243,239,0.12)] md:border-t-0 md:border-l" : ""
                  }`}
                >
                  <h3 className="font-serif text-[18px] text-bone">{item.label}</h3>
                  <p className="mt-8 font-serif text-[14px] text-ash">{item.body}</p>
                </Link>
              ))}
            </div>
            <p className="mt-32 font-serif text-[15px] text-ash">
              Questions about how your data is handled belong on the{" "}
              <Link href="/privacy" className="text-copper underline underline-offset-4">
                privacy page
              </Link>
              , not here.
            </p>
          </Container>
        </section>

        <div className="mt-140" />
      </main>
      <Footer />
    </>
  );
}
