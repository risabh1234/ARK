import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSessionProfile } from "@/lib/supabase/session";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Control · Audit log" };
export const revalidate = 0;

export default async function ControlAuditLogPage() {
  const session = await getSessionProfile();
  if (session?.profile.role !== "owner") notFound();

  const supabase = await createClient();
  const { data } = await supabase
    .from("admin_audit_log")
    .select("id, action, target_type, target_id, detail, created_at, actor:profiles(username)")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div>
      <p className="font-mono text-eyebrow uppercase text-bg/40">Owner only · read-only</p>
      <h1 className="mt-16 font-serif text-h1 font-light text-bg">Audit log</h1>
      <p className="mt-8 max-w-measure font-serif text-[14px] text-bg/60">
        Append-only — no UPDATE/DELETE policy exists on this table for anyone, including Owners,
        through the app layer (spec §27).
      </p>

      <div className="mt-32 border border-bg/15">
        {(data ?? []).length === 0 && (
          <p className="p-24 font-serif text-[14px] text-bg/60">Nothing logged yet.</p>
        )}
        {(data ?? []).map((entry, i) => {
          const actor = Array.isArray(entry.actor) ? entry.actor[0] : entry.actor;
          return (
            <div key={entry.id} className={`p-16 ${i > 0 ? "border-t border-bg/10" : ""}`}>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
                {entry.action} · {entry.target_type}
              </p>
              <p className="mt-4 font-sans text-[13px] text-bg/80">
                by @{actor?.username ?? "unknown"} ·{" "}
                {new Date(entry.created_at).toLocaleString("en-IN")}
              </p>
              {entry.detail && (
                <pre className="mt-8 overflow-x-auto font-mono text-[11px] text-bg/50">
                  {JSON.stringify(entry.detail)}
                </pre>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
