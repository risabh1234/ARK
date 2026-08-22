"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/research", label: "Research" },
  { href: "/studio", label: "Studio" },
  { href: "/vision", label: "Vision" },
  { href: "/docs", label: "Docs" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled ? "bg-ink/95 backdrop-blur rule-b shadow-[0_1px_0_rgba(0,0,0,0.4)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-container items-center justify-between px-24 py-16 md:px-56">
        <Link href="/" className="font-serif text-[22px] text-bone">
          Aroha
        </Link>
        <nav className="hidden items-center gap-32 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-[15px] text-ash hover:text-bone transition-colors duration-150"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/primer"
          className="font-sans text-[15px] text-copper underline underline-offset-4 decoration-copper/40 hover:decoration-copper transition-colors duration-150"
        >
          The Primer
        </Link>
      </div>
    </header>
  );
}
