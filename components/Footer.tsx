import { EmailCapture } from "./EmailCapture";

export function Footer() {
  return (
    <footer className="rule-h pt-88 pb-56">
      <div className="mx-auto max-w-container px-24 md:px-56">
        <div className="max-w-lead">
          <EmailCapture source="footer" />
        </div>
        <div className="mt-56 flex flex-col gap-16 md:flex-row md:items-center md:justify-between">
          <nav className="flex gap-24 font-sans text-[14px] text-ash">
            <a href="/research" className="hover:text-bone transition-colors duration-150">
              Research
            </a>
            <a href="/studio" className="hover:text-bone transition-colors duration-150">
              Studio
            </a>
            <a href="/vision" className="hover:text-bone transition-colors duration-150">
              Vision
            </a>
          </nav>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash">
            Aroha &middot; Research and intelligence tools &middot; India
          </p>
        </div>
      </div>
    </footer>
  );
}
