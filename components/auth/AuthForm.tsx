"use client";

import { useActionState } from "react";
import type { AuthFormState } from "@/app/auth/actions";
import { signInWithGoogle } from "@/app/auth/actions";

const inputClass =
  "mt-8 w-full border border-rule bg-transparent px-16 py-16 font-sans text-[15px] text-ink placeholder:text-muted focus:border-accent focus:outline-none transition-colors duration-fast";

export function AuthForm({
  mode,
  action,
}: {
  mode: "sign-in" | "sign-up";
  action: (state: AuthFormState, formData: FormData) => Promise<AuthFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, { error: null });

  return (
    <div className="space-y-32">
      <form action={formAction} className="space-y-24">
        <div>
          <label htmlFor="email" className="font-mono text-eyebrow uppercase text-muted">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
        </div>
        <div>
          <label htmlFor="password" className="font-mono text-eyebrow uppercase text-muted">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
            className={inputClass}
          />
          {mode === "sign-up" && (
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
              At least 8 characters
            </p>
          )}
        </div>

        {state.error && (
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-accent px-24 py-16 font-sans text-ui font-medium text-bg hover:bg-accent-deep transition-colors duration-fast disabled:opacity-60"
        >
          {pending ? "Working" : mode === "sign-in" ? "Sign in" : "Create account"}
        </button>
      </form>

      <div className="flex items-center gap-16">
        <div className="h-px flex-1 bg-rule" />
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">or</span>
        <div className="h-px flex-1 bg-rule" />
      </div>

      <form action={signInWithGoogle}>
        <button
          type="submit"
          className="w-full border border-rule px-24 py-16 font-sans text-ui font-medium text-ink hover:border-accent-deep hover:bg-bg-raised transition-colors duration-fast"
        >
          Continue with Google
        </button>
      </form>
    </div>
  );
}
