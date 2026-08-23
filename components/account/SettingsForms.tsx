"use client";

import { useActionState } from "react";
import { changeEmail, changePassword, softDeleteOwnAccount, type AccountFormState } from "@/app/account/actions";

const inputClass =
  "mt-8 w-full border border-rule bg-transparent px-16 py-16 font-sans text-[15px] text-ink placeholder:text-muted focus:border-accent focus:outline-none transition-colors duration-fast";

export function ChangeEmailForm({ currentEmail }: { currentEmail: string }) {
  const [state, formAction, pending] = useActionState<AccountFormState, FormData>(changeEmail, {
    error: null,
  });
  return (
    <form action={formAction} className="space-y-16">
      <div>
        <label htmlFor="email" className="font-mono text-eyebrow uppercase text-muted">
          New email (currently {currentEmail})
        </label>
        <input id="email" name="email" type="email" required className={inputClass} />
      </div>
      {state.error && <p className="font-mono text-[11px] uppercase text-accent">{state.error}</p>}
      {state.success && (
        <p className="font-mono text-[11px] uppercase text-accent">
          Confirmation sent to both addresses — check your inbox.
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="border border-rule px-24 py-12 font-sans text-[14px] font-medium text-ink hover:border-accent-deep transition-colors duration-fast disabled:opacity-60"
      >
        {pending ? "Working…" : "Change email"}
      </button>
    </form>
  );
}

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState<AccountFormState, FormData>(changePassword, {
    error: null,
  });
  return (
    <form action={formAction} className="space-y-16">
      <div>
        <label htmlFor="password" className="font-mono text-eyebrow uppercase text-muted">
          New password
        </label>
        <input id="password" name="password" type="password" required minLength={8} className={inputClass} />
      </div>
      {state.error && <p className="font-mono text-[11px] uppercase text-accent">{state.error}</p>}
      {state.success && <p className="font-mono text-[11px] uppercase text-accent">Password updated.</p>}
      <button
        type="submit"
        disabled={pending}
        className="border border-rule px-24 py-12 font-sans text-[14px] font-medium text-ink hover:border-accent-deep transition-colors duration-fast disabled:opacity-60"
      >
        {pending ? "Working…" : "Change password"}
      </button>
    </form>
  );
}

export function DeleteAccountForm() {
  return (
    <form
      action={softDeleteOwnAccount}
      onSubmit={(e) => {
        if (!confirm("Delete your account? Your profile will be anonymized. This can't be undone from here.")) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="border border-accent-deep px-24 py-12 font-sans text-[14px] font-medium text-accent hover:bg-accent/[0.06] transition-colors duration-fast"
      >
        Delete my account
      </button>
      <p className="mt-8 max-w-measure font-serif text-[13px] text-muted">
        Soft-delete: your profile is anonymized, your articles and comments stay (no broken
        references). To request full erasure, email{" "}
        <a href="mailto:privacy@ark.study" className="text-accent underline underline-offset-4">
          privacy@ark.study
        </a>
        .
      </p>
    </form>
  );
}
