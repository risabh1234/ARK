"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getSessionProfile } from "@/lib/supabase/session";

async function requireRole(...roles: Array<"owner" | "admin" | "moderator">) {
  const session = await getSessionProfile();
  if (!session || !roles.includes(session.profile.role as never)) {
    throw new Error("Not authorized.");
  }
  return session;
}

async function logAction(
  action: string,
  targetType: "user" | "article" | "comment" | "setting",
  targetId: string | null,
  detail?: Record<string, unknown>
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  // Enforced by the "Privileged actors can log their own actions" RLS
  // policy (0005) — this insert only succeeds if the caller's own role
  // is moderator/admin/owner, independent of this app-code check.
  await supabase
    .from("admin_audit_log")
    .insert({ actor_id: user.id, action, target_type: targetType, target_id: targetId, detail });
}

/** Owner only — RLS (0004) is the real boundary, this is a friendlier error. */
export async function changeUserRole(targetId: string, newRole: "user" | "moderator" | "admin" | "owner") {
  await requireRole("owner");
  const supabase = await createClient();
  const { error } = await supabase.from("profiles").update({ role: newRole }).eq("id", targetId);
  if (error) throw new Error(error.message);
  await logAction("role_change", "user", targetId, { to: newRole });
  revalidatePath("/control/users");
}

/** Admin or Owner — via the admin_set_user_status RPC (0006), which does its own auth check + audit log write. */
export async function setUserStatus(targetId: string, status: "active" | "suspended" | "banned") {
  await requireRole("admin", "owner");
  const supabase = await createClient();
  const { error } = await supabase.rpc("admin_set_user_status", { target_id: targetId, new_status: status });
  if (error) throw new Error(error.message);
  revalidatePath("/control/users");
}

/**
 * Best-effort "hard delete" — Owner only, and requires re-entering the
 * Owner's own password first (spec §26.1: re-auth for the most
 * destructive actions, even within an already-signed-in session).
 * Full erasure of the login record (auth.users) requires the Supabase
 * Admin API / service-role key, which isn't available to this build
 * (see DEVELOPMENT_LOG.md). This instead: fully anonymizes the profile,
 * bans it, and removes their content. Documented as a known gap, not
 * hidden.
 */
export async function bestEffortHardDeleteUser(targetId: string, ownerPassword: string) {
  const session = await requireRole("owner");
  const supabase = await createClient();

  const { error: reauthError } = await supabase.auth.signInWithPassword({
    email: session.email,
    password: ownerPassword,
  });
  if (reauthError) throw new Error("Password re-entry failed — action cancelled.");

  await supabase.from("articles").delete().eq("author_id", targetId);
  await supabase.from("comments").delete().eq("author_id", targetId);
  await supabase
    .from("profiles")
    .update({
      display_name: "Deleted user",
      bio: null,
      avatar_url: null,
      username: `erased-${targetId.slice(0, 8)}`,
      deleted_at: new Date().toISOString(),
    })
    .eq("id", targetId);
  await supabase.rpc("admin_set_user_status", { target_id: targetId, new_status: "banned" });

  await logAction("hard_delete_attempt", "user", targetId, {
    note: "content wiped + profile anonymized + banned; auth.users row NOT removed — needs SUPABASE_SERVICE_ROLE_KEY",
    by: session.profile.username,
  });
  revalidatePath("/control/users");
}

export async function removeArticle(articleId: string) {
  await requireRole("moderator", "admin", "owner");
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", articleId);
  if (error) throw new Error(error.message);
  await logAction("remove_content", "article", articleId);
  revalidatePath("/control/content");
}

export async function removeComment(commentId: string) {
  await requireRole("moderator", "admin", "owner");
  const supabase = await createClient();
  const { error } = await supabase.from("comments").delete().eq("id", commentId);
  if (error) throw new Error(error.message);
  await logAction("remove_content", "comment", commentId);
  revalidatePath("/control/content");
}
