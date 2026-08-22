import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow, Panel } from "@/components/Primitives";
import { EmailCapture } from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "Vision",
  description: "We are building an instrument, and this is the beginning of it.",
};

const MOVES = [
  {
    n: "01",
    title: "What breaks in how we handle knowledge today",
    body: "Four incompatible accounts, no shared vocabulary, and a permanent low-grade dissonance nobody names.",
  },
  {
    n: "02",
    title: "What the Codex does about it",
    body: "A reader, an inquiry engine, a library, depth control, and citations that hold under scrutiny.",
  },
  {
    n: "03",
    title: "Where it ends up",
    body: "A dedicated knowledge computer — the instrument, not a mission statement about one.",
  },
];

const SAY = [
  "A library that can think with you.",
  "Every answer carries its sources, or it is not an answer.",
  "It works with the network off.",
];

export default function VisionPage() {
  return (
    <>
      <Header />
      <main className="pt-140">
        <Container>
          <Eyebrow>Vision</Eyebrow>
          <h1 className="mt-16 max-w-[16ch] font-serif text-section font-light text-bone">
            We are building an instrument, and this is the beginning of it.
          </h1>
          <p className="mt-24 max-w-lead font-serif text-lead font-light text-ash">
            Aroha Codex is a technology product, not a philosophy. This page is the introduction
            for something that does not exist yet — the way a hardware company writes about a
            machine still in the lab.
          </p>

          <div className="mt-88 grid gap-56 md:grid-cols-[1.15fr_1fr]">
            <div className="space-y-56">
              {MOVES.map((move) => (
                <div key={move.n} className="flex gap-24">
                  <span className="font-mono text-eyebrow text-copper">{move.n}</span>
                  <div>
                    <h3 className="font-serif text-[22px] text-bone">{move.title}</h3>
                    <p className="mt-8 max-w-measure font-serif text-reader text-ash">{move.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-0 border border-[rgba(245,243,239,0.12)] h-fit">
              {SAY.map((line) => (
                <div key={line} className="rule-h p-24 first:border-t-0">
                  <Eyebrow>Say</Eyebrow>
                  <p className="mt-8 font-serif text-[16px] text-bone">&ldquo;{line}&rdquo;</p>
                </div>
              ))}
              <div className="rule-h bg-copper/[0.04] p-24">
                <Eyebrow tone="ash">Do not say</Eyebrow>
                <p className="mt-8 font-serif text-[16px] text-ash">
                  &ldquo;AI-powered&rdquo;, &ldquo;revolutionary&rdquo;, &ldquo;the future of&rdquo;,
                  &ldquo;spiritual&rdquo;, or any Sanskrit product name.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-140 border-t border-[rgba(245,243,239,0.12)] pt-56 pb-88">
            <Panel className="mx-auto max-w-lead" accent>
              <p className="font-serif text-[20px] font-light text-bone">
                Early access opens in cohorts. Leave your email and we will tell you when yours
                opens.
              </p>
              <div className="mt-24">
                <EmailCapture source="vision" helperText="Codex waitlist. No spam." />
              </div>
            </Panel>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
