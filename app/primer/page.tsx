import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/Primitives";
import { EmailCapture } from "@/components/EmailCapture";
import { primerQuestions } from "@/content/primer";

export const metadata: Metadata = {
  title: "The ĀRK Primer",
  description:
    "Fifty questions worth asking, across consciousness, evidence, desire, death, identity, time, language and power. Ten are here. The rest arrive by email.",
};

export default function PrimerPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-140 pb-88">
          <Container>
            <Eyebrow>Free &middot; The email engine</Eyebrow>
            <h1 className="mt-16 max-w-[16ch] font-serif text-h1 font-medium text-ink">
              The ĀRK Primer
            </h1>
            <p className="mt-16 font-serif text-lead font-light italic text-accent">
              Fifty questions worth asking.
            </p>
            <p className="mt-24 max-w-lead font-serif text-reader text-muted">
              Fifty questions across consciousness, evidence, desire, death, identity, time,
              language and power. Ten are public, below. The rest arrive one at a time, by email —
              the browser first, then the letter. Friction removed to near zero.
            </p>
          </Container>
        </section>

        <section className="bg-bg-bg-raisedd py-88 text-ink">
          <Container>
            <div className="mx-auto max-w-measure divide-y divide-ink/10">
              {primerQuestions.map((q) => (
                <div key={q.n} className="py-32 first:pt-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">
                    {String(q.n).padStart(2, "0")} &middot; {q.category}
                  </p>
                  <p className="mt-16 font-serif text-[20px] leading-snug">{q.question}</p>
                  <p className="mt-16 font-serif text-[14px] italic text-accent">{q.pointsTo}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-t border-[rgba(35,32,27,0.12)] py-88">
          <Container>
            <p className="max-w-lead font-serif text-[20px] font-light text-ink">
              Forty more questions, one at a time. No name required beyond an email address.
            </p>
            <div className="mt-32 max-w-lead">
              <EmailCapture source="primer" />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
