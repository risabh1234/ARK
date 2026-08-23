import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/Primitives";
import { Button } from "@/components/Button";
import { DepthControl } from "@/components/DepthControl";
import { ReadingProgress } from "@/components/ReadingProgress";
import { briefs, getBrief } from "@/content/briefs";

export function generateStaticParams() {
  return briefs.filter((b) => b.status === "available").map((b) => ({ slug: b.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const brief = getBrief(slug);
  if (!brief) return {};
  return { title: brief.title, description: brief.dek };
}

export default async function BriefPage({ params }: { params: Params }) {
  const { slug } = await params;
  const brief = getBrief(slug);
  if (!brief || brief.status !== "available") notFound();

  return (
    <>
      <ReadingProgress />
      <Header />
      <main className="pt-140">
        <Container>
          <Eyebrow>
            Brief {brief.id} &middot; {brief.sources} sources &middot; {brief.pages} pages
          </Eyebrow>
          <h1 className="mt-16 max-w-[16ch] font-serif text-h1 font-medium text-ink">
            {brief.title}
          </h1>
          <p className="mt-24 max-w-lead font-serif text-lead font-light text-muted">
            {brief.provocation}
          </p>

          <div className="mt-56 grid gap-56 md:grid-cols-[1.15fr_1fr]">
            <div>
              <Eyebrow tone="muted">What is inside</Eyebrow>
              <ul className="mt-16 space-y-16">
                {brief.whatIsInside?.map((item) => (
                  <li key={item} className="flex gap-16 font-serif text-reader text-ink">
                    <span className="text-accent">&rarr;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-accent-deep bg-accent/[0.06] p-32 h-fit">
              <Eyebrow>Unresolved questions</Eyebrow>
              <p className="mt-8 font-serif text-[14px] text-muted">
                Shown before purchase. Deliberately unfinished.
              </p>
              <ul className="mt-16 space-y-12">
                {brief.unresolved.map((q) => (
                  <li key={q} className="font-serif text-[15px] leading-snug text-ink">
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-56 rule-h pt-32">
            <DepthControl />
            <div className="mt-32 flex flex-wrap items-center gap-24">
              <Button variant="primary">
                Buy &mdash; ₹{brief.priceINR.toLocaleString("en-IN")} / ${brief.priceUSD}
              </Button>
              <span className="font-mono text-eyebrow uppercase text-muted">
                Hosted reading page &middot; downloadable PDF
              </span>
            </div>
          </div>
        </Container>

        {/* paper mode — reader ground */}
        <section className="mt-140 bg-bg-bg-raisedd py-88 text-ink">
          <Container>
            <p className="font-mono text-eyebrow uppercase text-ink/50">
              Brief {brief.id} &middot; Sample
            </p>
            <div className="mx-auto mt-24 max-w-measure">
              <h2 className="font-serif text-[28px] leading-tight">{brief.sampleHeading}</h2>
              <p className="mt-24 font-serif text-reader">{brief.sampleExcerpt}</p>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
