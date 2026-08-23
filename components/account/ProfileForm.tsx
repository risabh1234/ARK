"use client";

import { useActionState } from "react";
import { updateProfile, type AccountFormState } from "@/app/account/actions";

const inputClass =
  "mt-8 w-full border border-rule bg-transparent px-16 py-16 font-sans text-[15px] text-ink placeholder:text-muted focus:border-accent focus:outline-none transition-colors duration-fast";

export function ProfileForm({
  profile,
}: {
  profile: { username: string; display_name: string | null; bio: string | null };
}) {
  const [state, formAction, pending] = useActionState<AccountFormState, FormData>(updateProfile, {
    error: null,
  });

  return (
    <form action={formAction} className="space-y-24">
      <div>
        <label htmlFor="username" className="font-mono text-eyebrow uppercase text-muted">
          Username
        </label>
        <input id="username" name="username" required defaultValue={profile.username} className={inputClass} />
      </div>
      <div>
        <label htmlFor="display_name" className="font-mono text-eyebrow uppercase text-muted">
          Display name
        </label>
        <input
          id="display_name"
          name="display_name"
          defaultValue={profile.display_name ?? ""}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="bio" className="font-mono text-eyebrow uppercase text-muted">
          Bio
        </label>
        <textarea id="bio" name="bio" rows={3} defaultValue={profile.bio ?? ""} className={inputClass} />
      </div>
      {state.error && (
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">{state.error}</p>
      )}
      {state.success && (
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">Saved.</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="bg-accent px-24 py-16 font-sans text-ui font-medium text-bg hover:bg-accent-deep transition-colors duration-fast disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
