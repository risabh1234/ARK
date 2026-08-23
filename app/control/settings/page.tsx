import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSessionProfile } from "@/lib/supabase/session";

export const metadata: Metadata = { title: "Control · Settings" };

export default async function ControlSettingsPage() {
  const session = await getSessionProfile();
  if (session?.profile.role !== "owner") notFound();

  return (
    <div className="space-y-32">
      <div>
        <p className="font-mono text-eyebrow uppercase text-bg/40">Owner only</p>
        <h1 className="mt-16 font-serif text-h1 font-medium text-bg">Site settings</h1>
      </div>

      <div className="max-w-measure space-y-16 border border-bg/15 p-24">
        <p className="font-serif text-[15px] text-bg/80">
          No feature-flag/newsletter-copy/homepage-highlight settings table exists yet — the spec
          (§26.2) lists this as a screen, not a schema, so nothing was fabricated here. Building it
          for real means deciding what's actually configurable first (ask before adding a
          <code className="mx-4 font-mono text-[13px]">site_settings</code> table).
        </p>
      </div>

      <div className="max-w-measure space-y-16 border border-bg/15 p-24">
        <h2 className="font-serif text-[18px] text-bg">Known gap: true hard-delete</h2>
        <p className="font-serif text-[14px] text-bg/70">
          The Users screen&rsquo;s &ldquo;Hard-delete&rdquo; action wipes a user&rsquo;s content
          and fully anonymizes + bans their profile, but it cannot remove their actual login
          record (<code className="font-mono text-[13px]">auth.users</code>) — that requires
          Supabase&rsquo;s Admin API, which needs{" "}
          <code className="font-mono text-[13px]">SUPABASE_SERVICE_ROLE_KEY</code>. That key
          isn&rsquo;t available in this build. Set it as a server-only env var (never
          <code className="mx-4 font-mono text-[13px]">NEXT_PUBLIC_</code>) to enable true erasure
          later.
        </p>
      </div>

      <div className="max-w-measure space-y-16 border border-bg/15 p-24">
        <h2 className="font-serif text-[18px] text-bg">Known gap: 2FA</h2>
        <p className="font-serif text-[14px] text-bg/70">
          Spec §26.1 suggests TOTP 2FA for Owner/Admin accounts specifically. Supabase Auth
          supports it, but enrollment UI isn&rsquo;t built here — not done, not hidden.
        </p>
      </div>
    </div>
  );
}
