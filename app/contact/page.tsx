import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/Primitives";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact channels for ĀRK research, studio commissions, editorial correspondence, and privacy requests.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-140 pb-56">
          <Container>
            <Eyebrow>Inquiry</Eyebrow>
            <h1 className="mt-16 max-w-[16ch] font-serif text-h1 font-medium text-ink">
              Direct channels
            </h1>
            <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              LAT 28°36&apos;N · LON 77°12&apos;E
            </p>
          </Container>
        </section>

        <section className="bg-bg-bg-raisedd py-88 text-ink">
          <Container>
            <div className="mx-auto max-w-measure space-y-48">
              <div>
                <p className="font-serif text-reader text-ink/80">
                  Every message is read by a member of the research team. We keep correspondence
                  direct, focused, and free of automated marketing funnels.
                </p>
              </div>

              <div className="divide-y divide-ink/10 border-y border-ink/10">
                <div className="flex flex-col gap-4 py-20 md:flex-row md:justify-between md:gap-24">
                  <div>
                    <span className="font-sans text-[16px] font-medium text-ink">General & Editorial Inquiries</span>
                    <p className="mt-4 font-serif text-[14px] text-muted">Questions regarding publications, citations, or the library archive.</p>
                  </div>
                  <a href="mailto:contact@ark.study" className="font-mono text-[13px] text-accent hover:underline">
                    contact@ark.study
                  </a>
                </div>

                <div className="flex flex-col gap-4 py-20 md:flex-row md:justify-between md:gap-24">
                  <div>
                    <span className="font-sans text-[16px] font-medium text-ink">Studio & Research Commissions</span>
                    <p className="mt-4 font-serif text-[14px] text-muted">Custom research briefs, verification desks, and institutional advisory.</p>
                  </div>
                  <a href="mailto:studio@ark.study" className="font-mono text-[13px] text-accent hover:underline">
                    studio@ark.study
                  </a>
                </div>

                <div className="flex flex-col gap-4 py-20 md:flex-row md:justify-between md:gap-24">
                  <div>
                    <span className="font-sans text-[16px] font-medium text-ink">Privacy & Data Requests</span>
                    <p className="mt-4 font-serif text-[14px] text-muted">Data deletion, subscriber records, and privacy questions.</p>
                  </div>
                  <a href="mailto:privacy@ark.study" className="font-mono text-[13px] text-accent hover:underline">
                    privacy@ark.study
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
