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

const TOC = [
  { href: "#method", label: "The method" },
  { href: "#structure", label: "How a brief is structured" },
  { href: "#dont", label: "What we deliberately don't do" },
  { href: "#articles", label: "Articles &amp; comments" },
  { href: "#site", label: "Where to go next" },
] as const;

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

const STRATA = [
  { n: "I", label: "What the source says", body: "Quoted, located, dated." },
  { n: "II", label: "What the evidence shows", body: "Independent of the source, cited to the study." },
  { n: "III", label: "What follows", body: "Our reading, marked as ours." },
  { n: "IV", label: "Unresolved", body: "What the brief could not close." },
];

const DEPTH_LEVELS = [
  { label: "Quick", detail: "The claim, in one paragraph. Free.", free: true },
  { label: "Explain", detail: "The argument, in full. Free.", free: true },
  { label: "Deep", detail: "Sources, counter-arguments, working notes. Paid.", free: false },
  { label: "Complete", detail: "Everything, including what we couldn't resolve. Paid.", free: false },
];

const WHAT_WE_DONT_DO = [
  "No fake scarcity timers or countdowns. Urgency comes from the idea, not a clock — where we do show a live number (Studio's monthly commission slots), it's a stated operational fact, not manufactured.",
  "No follower counts, no engagement theatre. The only numbers we show are sources read and pages written.",
  "No infinite scroll and no notification badges — we're not competing for your attention, we're trying to end a specific itch.",
  "No exit popups, no chat bubbles, no cookie theatre. Prices are published on the page, not hidden behind a call.",
  "No fabricated authority. Every claim traces to a source you can check yourself, or it's labelled as our reading, not fact.",
];

const ARTICLE_FAQ = [
  {
    q: "Who can write an article?",
    a: "Anyone with a verified ĀRK account. Sign up, confirm your email, and “Write an article” opens the composer — the same account system used across the site, not a separate login.",
  },
  {
    q: "Who can comment?",
    a: "Any signed-in visitor, under any published article. Comments are threaded one level deep — a top-level comment and its direct replies — and each thread is scoped strictly to its own article.",
  },
  {
    q: "What are the tags?",
    a: "Articles are tagged against ĀRK's existing content pillars — Sanskrit, Method, Field Notes — the same categories the briefs already work within, so an article reads as part of the same body of work rather than a bolted-on blog.",
  },
  {
    q: "Who can edit or remove something?",
    a: "An article's author can edit or delete their own work at any time. Moderators and admins can remove content that violates guidelines; only an Owner can change anyone's account role. All of this is enforced at the database layer, not just hidden in the interface.",
  },
];

const SITE_MAP = [
  { href: "/research", label: "Research", body: "The brief catalogue. One free item, the rest priced and sourced." },
  { href: "/studio", label: "Studio", body: "Commission research for documentaries, books, series and briefs." },
  { href: "/vision", label: "Vision", body: "What ĀRK Codex is, and the waitlist for early access." },
  { href: "/library", label: "Library", body: "The next surface, still being assembled." },
  { href: "/articles", label: "Articles", body: "Reader-written pieces, tagged and discussed under the same method." },
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
            <h1 className="mt-16 max-w-[16ch] font-serif text-h1 font-medium text-ink">
              How ĀRK works.
            </h1>
            <p className="mt-24 max-w-lead font-serif text-lead font-light text-muted">
              This page exists so nobody has to take the framework on faith. It describes the
              method we hold every brief to, how a brief is structured, what we deliberately
              refuse to do, and how the Articles system works — regardless of what would convert
              better.
            </p>

            <nav aria-label="On this page" className="mt-56 border border-rule p-24">
              <p className="font-mono text-eyebrow uppercase text-muted">On this page</p>
              <ul className="mt-16 flex flex-wrap gap-x-32 gap-y-8">
                {TOC.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="font-sans text-[15px] text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Container>
        </section>

        <section id="method" className="bg-bg-raised py-88 scroll-mt-140">
          <Container>
            <div className="mx-auto max-w-measure">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                The method
              </p>
              <div className="mt-32 space-y-32">
                {METHOD.map((item) => (
                  <div key={item.title}>
                    <h3 className="font-sans text-[16px] font-medium text-ink">{item.title}</h3>
                    <p className="mt-8 font-serif text-body text-ink/80">{item.body}</p>
                  </div>
                ))}
              </div>

              <p id="structure" className="mt-56 scroll-mt-140 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                How a brief is structured
              </p>
              <p className="mt-16 font-serif text-body text-ink/80">
                Every paid brief follows the same shape: a title, a one-paragraph provocation, a
                list of what's inside, an Unresolved section you can read before you buy, and a
                depth control so you choose how far in you go. The four strata below are the
                same structure previewed on the home page's &ldquo;Anatomy of a brief&rdquo;
                section — repeated here in full, since Docs is the place to read it end to end.
              </p>
              <div className="mt-24 divide-y divide-ink/10 border-y border-ink/10">
                {STRATA.map((row) => (
                  <div key={row.n} className="flex gap-16 py-16">
                    <span className="font-mono text-[13px] text-muted">{row.n}</span>
                    <div className="flex flex-1 items-baseline justify-between gap-16">
                      <span className="font-sans text-[15px] font-medium text-ink">{row.label}</span>
                      <span className="max-w-[32ch] text-right font-serif text-[15px] text-ink/70">
                        {row.body}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-56 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Depth control
              </p>
              <div className="mt-24 divide-y divide-ink/10 border-y border-ink/10">
                {DEPTH_LEVELS.map((level) => (
                  <div key={level.label} className="flex items-baseline justify-between py-16">
                    <span className="font-sans text-[15px] font-medium text-ink">{level.label}</span>
                    <span className="font-serif text-[15px] text-ink/70">{level.detail}</span>
                  </div>
                ))}
              </div>

              <p id="dont" className="mt-56 scroll-mt-140 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                What we deliberately don&rsquo;t do
              </p>
              <ul className="mt-16 space-y-12">
                {WHAT_WE_DONT_DO.map((line) => (
                  <li key={line} className="flex gap-16 font-serif text-body text-ink/80">
                    <span className="text-accent">&rarr;</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <section id="articles" className="py-88 scroll-mt-140 rule-h">
          <Container>
            <div className="mx-auto max-w-measure">
              <Eyebrow>Articles &amp; comments</Eyebrow>
              <p className="mt-16 font-serif text-body text-muted">
                Articles are the one part of ĀRK anyone with an account can write, not just us —
                the same sourcing discipline applies, just without a price tag.
              </p>
              <div className="mt-32 space-y-24">
                {ARTICLE_FAQ.map((item) => (
                  <div key={item.q}>
                    <h3 className="font-sans text-[16px] font-medium text-ink">{item.q}</h3>
                    <p className="mt-8 font-serif text-body text-muted">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section id="site" className="pt-88 rule-h scroll-mt-140">
          <Container>
            <Eyebrow tone="muted">Where to go next</Eyebrow>
            <div className="mt-32 grid gap-0 border border-rule sm:grid-cols-2 md:grid-cols-3">
              {SITE_MAP.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`p-24 transition-colors duration-fast hover:bg-bg-raised ${
                    i > 0 ? "border-t border-rule sm:border-t-0 sm:border-l md:[&:nth-child(3n+1)]:border-l-0" : ""
                  }`}
                >
                  <h3 className="font-serif text-[18px] text-ink">{item.label}</h3>
                  <p className="mt-8 font-serif text-[14px] text-muted">{item.body}</p>
                </Link>
              ))}
            </div>
            <p className="mt-32 pb-140 font-serif text-[15px] text-muted">
              Questions about how your data is handled belong on the{" "}
              <Link href="/privacy" className="text-accent underline underline-offset-4">
                privacy page
              </Link>
              , not here.
            </p>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
