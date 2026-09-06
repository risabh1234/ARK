import type { ReactElement } from "react";

export function FooterStrip(): ReactElement {
  return (
    <footer className="v3-footer" aria-label="Site and legal footer">
      <div className="v3-footer-tagline ark-footer-brand-chain">
        © ĀRK 2026 · Built on truth · Driven by curiosity · Guided by consciousness
      </div>

      <div className="v3-footer-meta" style={{ fontFamily: "var(--ark-font-mono)", fontSize: "11px", color: "var(--ark-muted)", display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", margin: "12px 0" }}>
        <span>LAT 28°36&apos;N · LON 77°12&apos;E</span>
        <span>REV 2026.08</span>
      </div>

      <nav aria-label="Legal and contact" className="v3-footer-nav">
        <a href="/privacy" className="v3-footer-link" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center" }}>
          Privacy
        </a>
        <a href="/terms" className="v3-footer-link" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center" }}>
          Terms
        </a>
        <a href="/contact" className="v3-footer-link" style={{ minHeight: "48px", display: "inline-flex", alignItems: "center" }}>
          Contact
        </a>
      </nav>
    </footer>
  );
}
