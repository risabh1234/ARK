export default function LabIndexPage() {
  return (
    <main className="lab-page">
      <p className="lab-tag">ĀRK Lab · internal · noindex</p>
      <h1>Redesign Synthesis</h1>
      <p>
        Finalized landing page synthesis and token specifications governed by{" "}
        <code>Landing Page Design Process.md</code>.
      </p>

      <section style={{ marginTop: "32px", marginBottom: "32px" }}>
        <h2 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--dir-muted)" }}>
          Active Prototype & Specimen
        </h2>
        <nav className="lab-index" aria-label="Synthesis routes">
          <a
            href="/lab/experiment-hero"
            style={{ border: "1px solid #ffb000", background: "rgba(255, 176, 0, 0.12)" }}
          >
            <span>
              <strong>Hero Masterwork: Extraordinary Capability at Dawn (FIG. 0)</strong>
            </span>
            <span className="lab-tag" style={{ color: "#ffb000" }}>
              ACTIVE EXPERIMENT · HIGH FIDELITY
            </span>
          </a>
          <a
            href="/lab/experiment"
            style={{ border: "1px solid rgba(240, 231, 216, 0.2)" }}
          >
            <span>
              <strong>Option B: Astrolabe Four-Territory Map</strong>
            </span>
            <span className="lab-tag" style={{ color: "#ffb000" }}>
              EXPERIMENT
            </span>
          </a>
          <a
            href="/lab/synthesis"
            style={{ border: "1px solid rgba(240, 231, 216, 0.2)" }}
          >
            <span>
              <strong>Final Landing Page Synthesis</strong>
            </span>
            <span className="lab-tag" style={{ color: "#f0e7d8" }}>
              SYNTHESIS V3
            </span>
          </a>
          <a
            href="/lab/synthesis/specimen"
            style={{ border: "1px solid rgba(240, 231, 216, 0.2)" }}
          >
            <span>
              <strong>Triad Specimen Sheet</strong>
            </span>
            <span className="lab-tag" style={{ color: "#f0e7d8" }}>
              RATIFIED SPECIMEN
            </span>
          </a>
        </nav>
      </section>
    </main>
  );
}
