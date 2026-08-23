"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthFormState = { error: string | null; success?: boolean };

function usernameFromEmail(email: string) {
  const base = email
    .split("@")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 20) || "reader";
  return `${base}${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function signUpWithPassword(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  if (!email || !password) return { error: "Email and password are required." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/auth/callback` },
  });
  if (error) return { error: error.message };

  // Create the public profile row now, not on first sign-in — every
  // authenticated user needs one immediately (RLS on articles/comments
  // references profiles(id)). Username is a placeholder the reader can
  // change from /account once that exists (Phase 7).
  if (data.user) {
    await supabase.from("profiles").insert({
      id: data.user.id,
      username: usernameFromEmail(email),
    });
  }

  if (data.session) {
    // Email confirmation isn't required to establish a session in this
    // project's default Supabase Auth settings — go straight in.
    redirect("/account");
  }

  redirect("/sign-in?check-email=1");
}

export async function signInWithPassword(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  if (!email || !password) return { error: "Email and password are required." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  redirect("/account");
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/auth/callback` },
  });
  // Will error until a Google OAuth client is registered in the Supabase
  // dashboard — surfaced plainly rather than silently swallowed. See
  // IMPLEMENTATION.md's "Continue with Google" known-gap entry.
  if (error || !data.url) redirect("/sign-in?oauth-error=1");
  redirect(data.url);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function requestPasswordReset(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = String(formData.get("email") || "");
  if (!email) return { error: "Email is required." };

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/auth/callback?next=/account/reset-password`,
  });
  if (error) return { error: error.message };
  return { error: null, success: true };
}
