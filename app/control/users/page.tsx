import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getSessionProfile } from "@/lib/supabase/session";
import { UserRow } from "@/components/control/UserRow";

export const metadata: Metadata = { title: "Control · Users" };
export const revalidate = 0;

export default async function ControlUsersPage() {
  const session = await getSessionProfile();
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, username, display_name, role, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <p className="font-mono text-eyebrow uppercase text-bg/40">User management</p>
      <h1 className="mt-16 font-serif text-h1 font-light text-bg">Users</h1>
      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.08em] text-bg/40">
        {data?.length ?? 0} total
      </p>

      <div className="mt-32">
        {(data ?? []).map((user) => (
          <UserRow key={user.id} user={user} viewerRole={session!.profile.role} />
        ))}
      </div>
    </div>
  );
}
