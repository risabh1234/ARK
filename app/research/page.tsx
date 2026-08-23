import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/Primitives";
import { ResearchList } from "@/components/ResearchList";
import { briefs } from "@/content/briefs";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Interdisciplinary investigations, sources shown, uncertainty declared. Read the briefs.",
};

export default function ResearchPage() {
  return (
    <>
      <Header />
      <main className="pt-140">
        <Container>
          <Eyebrow>Research</Eyebrow>
          <h1 className="mt-16 max-w-[16ch] font-serif text-h1 font-medium text-ink">
            Questions we refused to leave alone.
          </h1>
          <p className="mt-24 max-w-lead font-serif text-reader text-muted">
            Interdisciplinary investigations. Sources shown. Uncertainty declared. The Primer sits
            at the top, free, styled identically to everything else here — because the free thing
            should feel like the paid thing.
          </p>

          <div className="mt-56">
            <ResearchList briefs={briefs} />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
