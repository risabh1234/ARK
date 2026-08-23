import type { Metadata } from "next";
import { Eyebrow } from "@/components/Primitives";
import { ProfileForm } from "@/components/account/ProfileForm";
import { getSessionProfile } from "@/lib/supabase/session";

export const metadata: Metadata = { title: "Account" };

export default async function AccountOverviewPage() {
  const session = await getSessionProfile();
  if (!session) return null; // layout already redirects; satisfies TS narrowing

  return (
    <div>
      <Eyebrow>Overview</Eyebrow>
      <h1 className="mt-16 font-serif text-h1 font-medium text-ink">{session.profile.username}</h1>
      <p className="mt-8 font-serif text-body text-muted">{session.email}</p>
      <div className="mt-40 max-w-[480px]">
        <ProfileForm profile={session.profile} />
      </div>
    </div>
  );
}
