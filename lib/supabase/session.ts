import { createClient } from "./server";

export type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: "user" | "moderator" | "admin" | "owner";
  status: "active" | "suspended" | "banned";
};

/**
 * Server-side session + profile read, used by Header (so it never
 * flashes the wrong signed-in state, spec §20.3) and by any protected
 * route's layout. Returns null when signed out — callers decide what
 * to do about it (redirect, hide UI, etc.), this helper never redirects
 * itself so it stays safe to call from non-protected pages too.
 */
export async function getSessionProfile(): Promise<{ email: string; profile: Profile } | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  if (!profile) return null;

  return { email: user.email!, profile: profile as Profile };
}
