import Link from "next/link";
import { Logo } from "./Logo";
import { EmailCapture } from "./EmailCapture";

const WORK = [
  { href: "/research", label: "Research" },
  { href: "/studio", label: "Studio" },
  { href: "/vision", label: "Vision" },
  { href: "/primer", label: "The Primer" },
] as const;

const METHOD = [
  { href: "/docs", label: "Docs & framework" },
  { href: "/privacy", label: "Privacy" },
] as const;

export function Footer() {
  return (
    <footer className="rule-h pt-88 pb-56">
      <div className="mx-auto max-w-container px-24 md:px-56">
        <div className="max-w-lead">
          <EmailCapture source="footer" />
        </div>

        <div className="mt-88 grid gap-56 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-16">
              <Logo height={28} />
              <span className="font-serif text-[20px] tracking-wide text-bone">ĀRK</span>
            </Link>
            <p className="mt-16 max-w-[34ch] font-serif text-[15px] text-ash">
              Research and intelligence tools. Sources shown, uncertainty declared.
            </p>
          </div>

          <nav>
            <p className="font-mono text-eyebrow uppercase text-ash">Work</p>
            <ul className="mt-16 space-y-12">
              {WORK.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans text-[15px] text-bone hover:text-copper transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <p className="font-mono text-eyebrow uppercase text-ash">Method</p>
            <ul className="mt-16 space-y-12">
              {METHOD.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans text-[15px] text-bone hover:text-copper transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
