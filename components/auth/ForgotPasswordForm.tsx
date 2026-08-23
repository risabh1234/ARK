"use client";

import { useActionState } from "react";
import { requestPasswordReset, type AuthFormState } from "@/app/auth/actions";

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(requestPasswordReset, {
    error: null,
  });

  return (
    <form action={formAction} className="space-y-24">
      <div>
        <label htmlFor="email" className="font-mono text-eyebrow uppercase text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-8 w-full border border-rule bg-transparent px-16 py-16 font-sans text-[15px] text-ink placeholder:text-muted focus:border-accent focus:outline-none transition-colors duration-fast"
        />
      </div>
      {state.error && (
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">{state.error}</p>
      )}
      {state.success && (
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
          Check your email for a reset link.
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-accent px-24 py-16 font-sans text-ui font-medium text-bg hover:bg-accent-deep transition-colors duration-fast disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send reset link"}
      </button>
    </form>
  );
}
