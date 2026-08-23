import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/Primitives";
import { EmailCapture } from "@/components/EmailCapture";
import { LibraryOrb } from "@/components/three/LibraryOrb";

export const metadata: Metadata = {
  title: "Library",
  description: "The Library — being assembled.",
};

export default function LibraryPage() {
  return (
    <>
      <Header />
      <main className="pt-140">
        <Container>
          <Eyebrow>Library</Eyebrow>
          <h1 className="mt-16 max-w-[14ch] font-serif text-display font-semibold text-ink">
            The Library
          </h1>
          <p className="mt-24 max-w-lead font-serif text-lead font-light text-muted">
            Everything a brief has to leave out to stay a brief — the full source ledgers, the
            drafts that didn&rsquo;t survive, the questions still being read into — held here
            until it&rsquo;s ready to be read.
          </p>

          <div className="mt-56">
            <LibraryOrb />
            <p className="mt-24 text-center font-mono text-eyebrow uppercase text-accent">
              Assembling
            </p>
          </div>
        </Container>

        <section className="mt-140 border-y border-rule bg-bg-raised py-88">
          <Container>
            <p className="font-serif text-h2 font-medium text-ink">
              One question, one source, one idea. Every week.
            </p>
            <div className="mt-32 max-w-lead">
              <EmailCapture source="library" />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
