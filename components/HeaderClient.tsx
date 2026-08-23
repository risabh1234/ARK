"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

// Spec §4.1 — six items plus the Primer pill (kept as a distinct CTA,
// not a plain nav link, matching its existing visual priority).
const NAV = [
  { href: "/research", label: "Research" },
  { href: "/studio", label: "Studio" },
  { href: "/vision", label: "Vision" },
  { href: "/library", label: "Library" },
  { href: "/articles", label: "Articles" },
  { href: "/docs", label: "Docs" },
] as const;

export function HeaderClient({
  session,
}: {
  session: { email: string; username: string; role: string } | null;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-base ease-standard ${
        scrolled ? "bg-bg/85 backdrop-blur-md shadow-4" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-container items-center justify-between px-24 py-16 md:px-56">
        <Link href="/" className="flex shrink-0 items-center gap-16">
          <Logo height={32} />
          <span className="font-serif text-[22px] tracking-wide text-ink">ĀRK</span>
        </Link>
        <nav className="hidden items-center gap-32 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative font-sans text-[15px] text-muted hover:text-ink transition-colors duration-fast"
            >
              {item.label}
              <span className="pointer-events-none absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-fast ease-standard group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-16">
          <Link
            href="/primer"
            className="border border-accent-deep px-16 py-8 font-sans text-[15px] text-accent hover:bg-accent/[0.08] transition-colors duration-fast"
          >
            The Primer
          </Link>
          {session ? (
            <div className="hidden items-center gap-8 md:flex">
              {(session.role === "owner" || session.role === "admin" || session.role === "moderator") && (
                <Link
                  href="/control"
                  className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted hover:text-accent transition-colors duration-fast"
                >
                  Control
                </Link>
              )}
              <Link
                href="/account"
                className="flex h-32 w-32 items-center justify-center border border-rule font-sans text-[13px] font-medium text-ink hover:border-accent-deep transition-colors duration-fast"
                aria-label="Account"
                title={session.username}
              >
                {session.username.charAt(0).toUpperCase()}
              </Link>
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="hidden font-sans text-[15px] text-muted hover:text-ink transition-colors duration-fast md:block"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
