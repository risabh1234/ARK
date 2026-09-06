"use client";

import { useState, useEffect, type ReactElement } from "react";

const NAV_ITEMS = [
  { label: "Briefs", href: "#beat-5" },
  { label: "Method", href: "#beat-3" },
  { label: "Studio", href: "/studio" },
  { label: "Codex", href: "/vision" },
  { label: "Library", href: "/library" },
  { label: "Journal", href: "#beat-7" },
];

export function TopBar(): ReactElement {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="v3-topbar" aria-label="Primary navigation masthead">
      <div className="v3-topbar-left">
        <a href="#beat-1" className="v3-wordmark ark-wordmark" aria-label="ĀRK Home">
          ĀRK
        </a>

        <nav aria-label="Primary" className="v3-desktop-nav">
          <ul className="v3-nav-links ark-topbar-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="v3-nav-link ark-topbar-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="v3-topbar-right">
        <div className="v3-sensor-pill" role="status" aria-label="Instrument status active">
          <span className="v3-sensor-dot sensor-dot" aria-hidden="true" />
          <span>INSTRUMENT · ACTIVE</span>
        </div>

        <button type="button" className="v3-topbar-utility-btn" aria-label="Search Atlas">
          Search
        </button>

        <button type="button" className="v3-topbar-utility-btn" aria-label="Sign in">
          Sign in
        </button>

        <a href="#beat-2" className="v3-topbar-cta ark-topbar-cta">
          Enter the Atlas
        </a>

        {/* Mobile Disclosure Toggle */}
        <button
          type="button"
          className="v3-menu-toggle"
          aria-expanded={mobileMenuOpen}
          aria-controls="synthesis-mobile-nav"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="synthesis-mobile-nav"
          className="v3-mobile-nav-drawer open"
          style={{ position: "absolute", top: "56px", left: 0, right: 0, zIndex: 999 }}
        >
          <ul className="v3-mobile-nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="v3-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li style={{ borderTop: "1px solid var(--ark-rule)", paddingTop: "12px", display: "flex", gap: "12px" }}>
              <button type="button" className="v3-topbar-utility-btn" style={{ padding: 0 }}>
                Search
              </button>
              <button type="button" className="v3-topbar-utility-btn" style={{ padding: 0 }}>
                Sign in
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
