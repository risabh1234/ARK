"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type AccountFormState = { error: string | null; success?: boolean };

export async function updateProfile(
  _prev: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not signed in." };

  const displayName = String(formData.get("display_name") || "").trim() || null;
  const bio = String(formData.get("bio") || "").trim() || null;
  const username = String(formData.get("username") || "").trim();

  if (!username) return { error: "Username can't be empty." };

  const { error } = await supabase
    .from("profiles")
    .update({ display_name: displayName, bio, username })
    .eq("id", user.id);

  if (error) return { error: error.message.includes("duplicate") ? "That username is taken." : error.message };

  revalidatePath("/account");
  return { error: null, success: true };
}

export async function changeEmail(
  _prev: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  const supabase = await createClient();
  const newEmail = String(formData.get("email") || "").trim();
  if (!newEmail) return { error: "Email is required." };

  const { error } = await supabase.auth.updateUser({ email: newEmail });
  if (error) return { error: error.message };
  return { error: null, success: true };
}

export async function changePassword(
  _prev: AccountFormState,
  formData: FormData
): Promise<AccountFormState> {
  const supabase = await createClient();
  const password = String(formData.get("password") || "");
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: error.message };
  return { error: null, success: true };
}

/**
 * Self-service deletion soft-deletes by default (spec §23.3) — anonymize
 * the profile, keep articles/comments so nothing else breaks a foreign
 * key or leaves a dangling reference. Full erasure on request is a
 * manual Owner action (control panel), not built as self-serve.
 */
export async function softDeleteOwnAccount() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  // Note: `status` deliberately isn't touched here — it's locked to
  // owner-only changes by RLS (see supabase/migrations/0004_...), on
  // purpose, so a user can't self-un-suspend/un-ban by racing this
  // action. `deleted_at` alone is the soft-delete signal.
  await supabase
    .from("profiles")
    .update({
      display_name: "Deleted user",
      bio: null,
      avatar_url: null,
      username: `deleted-${user.id.slice(0, 8)}`,
      deleted_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  await supabase.auth.signOut();
  redirect("/");
}
