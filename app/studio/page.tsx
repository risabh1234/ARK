import type { Metadata } from "next";
import { gte } from "drizzle-orm";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow, Panel } from "@/components/Primitives";
import { CommissionForm } from "@/components/CommissionForm";
import { getDb } from "@/lib/db";
import { commissionRequest } from "@/db/schema";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Commission research for documentaries, books, series and briefs that have to be right.",
};

// The "N of 3 slots" count must actually be live, not baked in at build
// time — without this, Next statically renders the async DB query once
// per deploy. Revalidate every 5 minutes rather than force-dynamic on
// every request, since near-live is enough for this and cheaper on
// Cloudflare Workers.
export const revalidate = 300;

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

async function getSlotsOpenThisMonth() {
  const db = getDb();
  if (!db) return 3; // no live DB — assume full availability rather than a broken/fake number
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  const rows = await db
    .select({ id: commissionRequest.id })
    .from(commissionRequest)
    .where(gte(commissionRequest.createdAt, startOfMonth));
  return Math.max(0, 3 - rows.length);
}

export default async function StudioPage() {
  const slotsOpen = await getSlotsOpenThisMonth();

  return (
    <>
      <Header />
      <main className="pt-140">
        <Container>
          <Eyebrow>Studio</Eyebrow>
          <h1 className="mt-16 max-w-[16ch] font-serif text-h1 font-medium text-ink">
            Your next piece deserves better sources than the internet.
          </h1>
          <p className="mt-24 max-w-lead font-serif text-lead font-light text-muted">
            This page pays for everything else, so it is written for one reader: a creator or
            publisher with an audience and no time to read forty books.
          </p>
          <p className="mt-16 max-w-lead font-sans text-[15px] text-muted">
            Who it is for: video essayists, documentary teams, publishers, education companies,
            brand and cultural institutions.
          </p>

          <div className="mt-56 grid gap-0 border border-[rgba(35,32,27,0.12)] md:grid-cols-3">
            {TIERS.map((tier, i) => (
              <div
                key={tier.name}
                className={`p-32 ${i > 0 ? "border-t border-[rgba(35,32,27,0.12)] md:border-t-0 md:border-l" : ""}`}
              >
                <p className="font-sans text-[15px] font-medium text-ink">{tier.name}</p>
                <p className="mt-8 font-serif text-[28px] text-accent">{tier.price}</p>
                <p className="mt-16 font-serif text-reader text-muted">{tier.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap items-center gap-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
              Prices published on the page. It filters out everyone who was never going to pay.
            </p>
            <span className="inline-flex items-center gap-8 border border-accent-deep px-12 py-4 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
              <span className="h-6 w-6 bg-accent" aria-hidden="true" />
              {slotsOpen} of 3 slots open this month
            </span>
          </div>

          <div className="mt-88 grid gap-56 md:grid-cols-2">
            <div>
              <Eyebrow tone="muted">What you hand over</Eyebrow>
              <ul className="mt-16 space-y-12">
                {HANDOVER.map((item) => (
                  <li key={item} className="flex gap-16 font-serif text-reader text-ink">
                    <span className="text-accent">&rarr;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-24 max-w-measure font-serif text-reader text-muted">
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
