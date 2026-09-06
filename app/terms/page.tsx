import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/Primitives";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of service, usage principles, and intellectual property terms for ĀRK.",
};

const LAST_UPDATED = "23 August 2026";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-140 pb-56">
          <Container>
            <Eyebrow>Terms</Eyebrow>
            <h1 className="mt-16 max-w-[16ch] font-serif text-h1 font-medium text-ink">
              Terms of service
            </h1>
            <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Last updated {LAST_UPDATED}
            </p>
          </Container>
        </section>

        <section className="bg-bg-bg-raisedd py-88 text-ink">
          <Container>
            <div className="mx-auto max-w-measure space-y-56">
              <div>
                <p className="font-serif text-reader text-ink/80">
                  ĀRK (&ldquo;we&rdquo;, &ldquo;us&rdquo;) provides rigorous research,
                  epistemic tools, and intelligence briefs. By accessing ark.study and our
                  publications, you agree to these straightforward terms.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-[22px] text-ink">Research & Publications</h2>
                <div className="mt-16 space-y-16 font-serif text-reader text-ink/80">
                  <p>
                    <strong className="text-ink">Intellectual property.</strong> All briefs,
                    frameworks, diagrams, and texts published by ĀRK are protected by copyright.
                    Purchased briefs are licensed for your personal or internal organizational study.
                  </p>
                  <p>
                    <strong className="text-ink">Citations & fair use.</strong> You are welcome
                    to quote short excerpts with clear attribution and link to the source at ark.study.
                    Full redistribution, commercial resale, or unauthorized automated scraping is prohibited.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-[22px] text-ink">Accounts & Subscriptions</h2>
                <div className="mt-16 space-y-16 font-serif text-reader text-ink/80">
                  <p>
                    <strong className="text-ink">Weekly Letter & Primer.</strong> Email dispatches
                    are provided free of charge. You may unsubscribe with a single click at any time.
                  </p>
                  <p>
                    <strong className="text-ink">Purchases & Refunds.</strong> Digital briefs and
                    research commissions are delivered electronically upon confirmation. If an
                    order encounters a delivery failure, contact us for immediate resolution.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-[22px] text-ink">Epistemic Disclaimer</h2>
                <p className="mt-16 font-serif text-reader text-ink/80">
                  Our research is designed to provide philosophical and structural integration.
                  It does not constitute individualized medical, legal, or financial advice.
                  Where knowledge remains unresolved, we declare it as such.
                </p>
              </div>

              <div className="border-t border-ink/10 pt-32">
                <p className="font-serif text-[15px] text-ink/70">
                  Questions regarding these terms:{" "}
                  <a href="mailto:contact@ark.study" className="text-accent underline underline-offset-4">
                    contact@ark.study
                  </a>
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
