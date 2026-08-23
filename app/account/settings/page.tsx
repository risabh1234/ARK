import type { Metadata } from "next";
import { Eyebrow } from "@/components/Primitives";
import { ChangeEmailForm, ChangePasswordForm, DeleteAccountForm } from "@/components/account/SettingsForms";
import { createClient } from "@/lib/supabase/server";
import { getSessionProfile } from "@/lib/supabase/session";

export const metadata: Metadata = { title: "Settings" };

export default async function AccountSettingsPage() {
  const session = await getSessionProfile();
  if (!session) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const providers = user?.app_metadata?.providers as string[] | undefined;

  return (
    <div className="space-y-56">
      <div>
        <Eyebrow>Settings</Eyebrow>
        <h1 className="mt-16 font-serif text-h1 font-light text-ink">Account settings</h1>
      </div>

      <div className="max-w-[480px] space-y-16">
        <h2 className="font-serif text-h2 text-ink">Email</h2>
        <ChangeEmailForm currentEmail={session.email} />
      </div>

      <div className="max-w-[480px] space-y-16">
        <h2 className="font-serif text-h2 text-ink">Password</h2>
        <ChangePasswordForm />
      </div>

      <div className="max-w-[480px] space-y-16">
        <h2 className="font-serif text-h2 text-ink">Connected accounts</h2>
        <p className="font-serif text-body text-muted">
          Google: {providers?.includes("google") ? "connected" : "not connected"}
        </p>
      </div>

      <div className="max-w-[480px] space-y-16 border-t border-rule pt-40">
        <h2 className="font-serif text-h2 text-ink">Delete account</h2>
        <DeleteAccountForm />
      </div>
    </div>
  );
}
