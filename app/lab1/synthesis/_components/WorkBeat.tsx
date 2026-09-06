import type { ReactElement } from "react";
import { ProductCard } from "./ProductCard";
import {
  BriefsEngraving,
  CodexEngraving,
  StudioEngraving,
  LibraryEngraving,
} from "./svg/engravings";

export function WorkBeat(): ReactElement {
  return (
    <section id="beat-6" className="v3-section" aria-labelledby="work-heading">
      <span className="v3-section-eyebrow">THE WORK</span>

      <h2 id="work-heading" className="v3-section-h2">
        Four surfaces. One way of working.
      </h2>

      <p className="v3-lead-prose">
        Everything ĀRK makes is built the way that brief was built: sourced, layered, and honest about its edges.
      </p>

      <div className="v3-ecosystem-grid" style={{ marginTop: "32px" }}>
        <ProductCard
          id="product-briefs"
          title="Briefs"
          sub="Researched essays that go deep without losing clarity."
          list="001 · The Architecture of Desire · Read sample →"
          linkText="All briefs"
          href="#beat-5"
          engraving={<BriefsEngraving />}
        />

        <ProductCard
          id="product-codex"
          title="Codex"
          sub="A living curriculum for the complete human."
          list="Consciousness · Action · Wisdom · Leadership · Technology · & more"
          linkText="See the plan"
          href="/vision"
          engraving={<CodexEngraving />}
        />

        <ProductCard
          id="product-studio"
          title="Studio"
          sub="Research for people who need it to be right in public."
          list="Documentaries · Books · Podcasts · Articles · Reports · & more"
          linkText="Commission research"
          href="/studio"
          engraving={<StudioEngraving />}
        />

        <ProductCard
          id="product-library"
          title="Library"
          sub="Texts that outlasted their centuries. Modern minds. One searchable archive."
          list="Bhagavad-gītā · Upaniṣads · Science · Philosophy · Civilizations · & more"
          linkText="Enter the library"
          href="/library"
          engraving={<LibraryEngraving />}
          gloss="Bhagavad-gītā: the classical dialogue on action and duty. Upaniṣads: the concluding philosophical texts of the Vedic corpus."
        />
      </div>
    </section>
  );
}
