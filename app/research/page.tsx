import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/Primitives";
import { BriefRow } from "@/components/BriefRow";
import { briefs } from "@/content/briefs";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Interdisciplinary investigations, sources shown, uncertainty declared. Read the briefs.",
};

export default function ResearchPage() {
  const primer = briefs[0];

  return (
    <>
      <Header />
      <main className="pt-140">
        <Container>
          <Eyebrow>Research</Eyebrow>
          <h1 className="mt-16 max-w-[16ch] font-serif text-section font-light text-bone">
            Questions we refused to leave alone.
          </h1>
          <p className="mt-24 max-w-lead font-serif text-reader text-ash">
            Interdisciplinary investigations. Sources shown. Uncertainty declared. The Primer sits
            at the top, free, styled identically to everything else here — because the free thing
            should feel like the paid thing.
          </p>

          <div className="mt-56">
            <BriefRow
              brief={{
                id: "000",
                slug: "primer",
                title: "The Aroha Primer",
                dek: "Fifty questions worth asking. No account needed.",
                status: "available",
                pages: 0,
                sources: 0,
                priceINR: 0,
                priceUSD: 0,
                unresolved: [],
              }}
              free
            />
            {briefs.map((brief) => (
              <BriefRow key={brief.id} brief={brief} />
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
