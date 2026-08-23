import Link from "next/link";
import { Logo } from "./Logo";
import { EmailCapture } from "./EmailCapture";
import { AudioToggle } from "./AudioToggle";
import { GiantWordmark } from "./GiantWordmark";

// Spec §11.2 — four columns: identity, Explore, Company, Newsletter.
const EXPLORE = [
  { href: "/research", label: "Research" },
  { href: "/studio", label: "Studio" },
  { href: "/vision", label: "Vision" },
  { href: "/library", label: "Library" },
  { href: "/articles", label: "Articles" },
] as const;

const COMPANY = [
  { href: "/docs", label: "Docs" },
  { href: "/privacy", label: "Privacy" },
] as const;

export function Footer() {
  return (
    <footer className="bg-ink-dark pt-88 pb-56 text-bg">
      <div className="mx-auto max-w-container px-24 md:px-56">
        <div className="grid gap-56 md:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
          <div>
            <Link href="/" className="flex items-center gap-16">
              <Logo height={28} />
              <span className="font-serif text-[20px] font-semibold tracking-[-0.01em] text-bg">ĀRK</span>
            </Link>
            <p className="mt-16 max-w-[34ch] font-serif text-[15px] text-bg/60">
              Research and intelligence tools. Sources shown, uncertainty declared.
            </p>
            <p className="mt-24 font-mono text-eyebrow uppercase text-bg/40">
              © 2026 ĀRK. All rights reserved.
            </p>
          </div>

          <nav>
            <p className="font-mono text-eyebrow uppercase text-bg/40">Explore</p>
            <ul className="mt-16 space-y-12">
              {EXPLORE.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans text-[15px] text-bg/80 hover:text-accent transition-colors duration-fast"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <p className="font-mono text-eyebrow uppercase text-bg/40">Company</p>
            <ul className="mt-16 space-y-12">
              {COMPANY.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans text-[15px] text-bg/80 hover:text-accent transition-colors duration-fast"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-eyebrow uppercase text-bg/40">Newsletter</p>
            <div className="mt-16">
              <EmailCapture source="footer" dark />
            </div>
          </div>
        </div>

        <div className="mt-56 flex flex-wrap items-center justify-between gap-16 border-t border-bg/10 pt-24">
          <p className="font-mono text-eyebrow uppercase text-bg/40">
            ĀRK · Research and intelligence tools · India
          </p>
          <AudioToggle />
        </div>

        <GiantWordmark />
      </div>
    </footer>
  );
}
