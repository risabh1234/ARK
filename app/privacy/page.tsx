import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/Primitives";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What ĀRK collects, why, who processes it, and how to have it deleted.",
};

const LAST_UPDATED = "23 August 2026";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-140 pb-56">
          <Container>
            <Eyebrow>Privacy</Eyebrow>
            <h1 className="mt-16 max-w-[16ch] font-serif text-h1 font-light text-ink">
              Privacy policy
            </h1>
            <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Last updated {LAST_UPDATED}
            </p>
          </Container>
        </section>

        <section className="bg-bg-bg-raisedd py-88 text-ink">
          <Container>
            <div className="mx-auto max-w-measure space-y-56">
              <div>
                <p className="font-serif text-reader text-ink/80">
                  ĀRK (&ldquo;we&rdquo;, &ldquo;us&rdquo;) builds research and intelligence
                  tools. This page describes, plainly, what we collect on this site, why, who
                  else touches it, and how to have yours removed. It applies to ark.study and
                  its subpages.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-[22px] text-ink">What we collect</h2>
                <div className="mt-16 space-y-16 font-serif text-reader text-ink/80">
                  <p>
                    <strong className="text-ink">Email address.</strong> Submitted through
                    the Primer signup, the newsletter field in the footer, or the Codex waitlist
                    on the Vision page. We also record which of those you used, so we know which
                    letter to send first.
                  </p>
                  <p>
                    <strong className="text-ink">Commission request details.</strong> If
                    you use the Studio form: the project description, deadline, budget range, and
                    the question you want answered. We do not currently ask for a name on that
                    form — we reply to the contact details you give us if you include them in your
                    message.
                  </p>
                  <p>
                    <strong className="text-ink">Order details.</strong> If you buy a
                    brief: the email address you check out with, which brief, and the amount
                    paid. We do not receive or store your card number — that is handled entirely
                    by our payment processor.
                  </p>
                  <p>
                    <strong className="text-ink">Standard server logs.</strong> Like
                    essentially every website, our hosting infrastructure (Cloudflare) logs IP
                    address, browser type, and request timing for security and abuse prevention.
                    We don&rsquo;t run analytics or advertising trackers on this site.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-[22px] text-ink">Why we collect it</h2>
                <ul className="mt-16 space-y-12">
                  {[
                    "To send you the Primer, the weekly letter, and ĀRK Codex waitlist updates — nothing else, to that address, until you tell us to stop.",
                    "To respond to a commission request or process an order.",
                    "To keep the site secure and working as intended.",
                    "To meet basic accounting and tax record-keeping obligations for anything you purchase.",
                  ].map((line) => (
                    <li key={line} className="flex gap-16 font-serif text-reader text-ink/80">
                      <span className="text-accent">&rarr;</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-[22px] text-ink">Who else touches it</h2>
                <p className="mt-16 font-serif text-reader text-ink/80">
                  We keep the list of processors short on purpose, and we don&rsquo;t sell data to
                  anyone.
                </p>
                <div className="mt-16 divide-y divide-ink/10 border-y border-ink/10">
                  {[
                    { name: "Supabase (Postgres)", role: "Stores subscriber, order and commission-request records." },
                    { name: "Resend", role: "Delivers the Primer and the weekly letter." },
                    { name: "Cloudflare", role: "Hosts and serves the site; provides basic security filtering." },
                    { name: "Razorpay / Stripe", role: "Will process payment for briefs and Studio invoices once checkout is live. Card details go to them directly, never to us." },
                  ].map((row) => (
                    <div key={row.name} className="flex flex-col gap-4 py-16 md:flex-row md:justify-between md:gap-24">
                      <span className="font-sans text-[15px] font-medium text-ink">{row.name}</span>
                      <span className="max-w-[38ch] font-serif text-[15px] text-ink/70">{row.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-serif text-[22px] text-ink">Cookies</h2>
                <p className="mt-16 font-serif text-reader text-ink/80">
                  We don&rsquo;t set marketing or analytics cookies. Any cookie you encounter here
                  is strictly functional — for example, a bot-protection challenge on our forms,
                  once that is enabled.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-[22px] text-ink">How long we keep it</h2>
                <p className="mt-16 font-serif text-reader text-ink/80">
                  Subscriber records are kept until you unsubscribe or ask us to delete them.
                  Commission requests and order records are kept as long as reasonably needed for
                  business and tax record-keeping, then deleted.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-[22px] text-ink">Your rights</h2>
                <p className="mt-16 font-serif text-reader text-ink/80">
                  You can ask us, at any time, what we hold on you, to correct it, or to delete
                  it entirely. Write to{" "}
                  <a href="mailto:privacy@ark.study" className="text-accent underline underline-offset-4">
                    privacy@ark.study
                  </a>{" "}
                  and we will act on it within a reasonable time — normally a few working days,
                  including removing you from any list.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-[22px] text-ink">Where it&rsquo;s processed</h2>
                <p className="mt-16 font-serif text-reader text-ink/80">
                  We are based in India. The processors above operate infrastructure in multiple
                  countries, which means your data may be processed outside India — including in
                  the United States and the European Union — under those providers&rsquo; own
                  security and data-protection commitments.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-[22px] text-ink">Children</h2>
                <p className="mt-16 font-serif text-reader text-ink/80">
                  ĀRK is not directed at children, and we don&rsquo;t knowingly collect data
                  from anyone under 16.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-[22px] text-ink">Changes</h2>
                <p className="mt-16 font-serif text-reader text-ink/80">
                  If this policy changes materially, we&rsquo;ll update the date at the top of
                  this page. We won&rsquo;t backdate a change to cover something that already
                  happened.
                </p>
              </div>

              <div className="border-t border-ink/10 pt-32">
                <p className="font-serif text-[15px] text-ink/70">
                  Questions that aren&rsquo;t answered here:{" "}
                  <a href="mailto:privacy@ark.study" className="text-accent underline underline-offset-4">
                    privacy@ark.study
                  </a>
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
