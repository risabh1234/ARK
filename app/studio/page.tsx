import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow, Panel } from "@/components/Primitives";
import { CommissionForm } from "@/components/CommissionForm";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Commission research for documentaries, books, series and briefs that have to be right.",
};

const TIERS = [
  {
    name: "Sprint",
    price: "₹25,000",
    detail: "One question, five working days.",
  },
  {
    name: "Dossier",
    price: "₹75,000",
    detail: "Full research architecture, three weeks.",
  },
  {
    name: "Retainer",
    price: "₹1,50,000/mo",
    detail: "An embedded research desk, monthly.",
  },
];

const HANDOVER = [
  "The research memo",
  "The annotated source ledger",
  "The timeline",
  "The counterargument file",
  "The terminology sheet",
  "A 30-minute call",
];

export default function StudioPage() {
  return (
    <>
      <Header />
      <main className="pt-140">
        <Container>
          <Eyebrow>Studio</Eyebrow>
          <h1 className="mt-16 max-w-[16ch] font-serif text-section font-light text-bone">
            Your next piece deserves better sources than the internet.
          </h1>
          <p className="mt-24 max-w-lead font-serif text-lead font-light text-ash">
            This page pays for everything else, so it is written for one reader: a creator or
            publisher with an audience and no time to read forty books.
          </p>
          <p className="mt-16 max-w-lead font-sans text-[15px] text-ash">
            Who it is for: video essayists, documentary teams, publishers, education companies,
            brand and cultural institutions.
          </p>

          <div className="mt-56 grid gap-0 border border-[rgba(245,243,239,0.12)] md:grid-cols-3">
            {TIERS.map((tier, i) => (
              <div
                key={tier.name}
                className={`p-32 ${i > 0 ? "border-t border-[rgba(245,243,239,0.12)] md:border-t-0 md:border-l" : ""}`}
              >
                <p className="font-sans text-[15px] font-medium text-bone">{tier.name}</p>
                <p className="mt-8 font-serif text-[28px] text-copper">{tier.price}</p>
                <p className="mt-16 font-serif text-reader text-ash">{tier.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
            Prices published on the page. It filters out everyone who was never going to pay.
          </p>

          <div className="mt-88 grid gap-56 md:grid-cols-2">
            <div>
              <Eyebrow tone="ash">What you hand over</Eyebrow>
              <ul className="mt-16 space-y-12">
                {HANDOVER.map((item) => (
                  <li key={item} className="flex gap-16 font-serif text-reader text-bone">
                    <span className="text-copper">&rarr;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-24 max-w-measure font-serif text-reader text-ash">
                Ship with one paid brief. A shop with one excellent item reads as a press. A shop
                with six thin items reads as a content farm. Studio takes three commissions a
                month — stated because it is a fact, and it prices itself.
              </p>
            </div>

            <Panel accent>
              <Eyebrow>Commission research</Eyebrow>
              <div className="mt-24">
                <CommissionForm />
              </div>
            </Panel>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
