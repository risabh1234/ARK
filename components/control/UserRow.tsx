"use client";

import { useState, useTransition } from "react";
import { changeUserRole, setUserStatus, bestEffortHardDeleteUser } from "@/app/control/actions";

type Row = {
  id: string;
  username: string;
  display_name: string | null;
  role: string;
  status: string;
  created_at: string;
};

export function UserRow({ user, viewerRole }: { user: Row; viewerRole: string }) {
  const [pending, startTransition] = useTransition();
  const [role, setRole] = useState(user.role);
  const isOwner = viewerRole === "owner";
  const canModerateStatus = viewerRole === "owner" || viewerRole === "admin";

  return (
    <div className="flex flex-wrap items-center justify-between gap-16 border-t border-bg/10 py-16 first:border-t-0">
      <div>
        <p className="font-sans text-[14px] font-medium text-bg">
          {user.display_name || user.username}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-bg/50">
          @{user.username} · joined{" "}
          {new Date(user.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-12">
        <span
          className={`border px-8 py-2 font-mono text-[10px] uppercase tracking-[0.08em] ${
            user.status === "active" ? "border-bg/20 text-bg/70" : "border-accent text-accent"
          }`}
        >
          {user.status}
        </span>

        {isOwner ? (
          <select
            value={role}
            disabled={pending}
            onChange={(e) => {
              const next = e.target.value as typeof role;
              setRole(next);
              startTransition(() => changeUserRole(user.id, next as never));
            }}
            className="border border-bg/20 bg-transparent px-8 py-4 font-mono text-[11px] uppercase text-bg"
          >
            {["user", "moderator", "admin", "owner"].map((r) => (
              <option key={r} value={r} className="bg-ink-dark">
                {r}
              </option>
            ))}
          </select>
        ) : (
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-bg/50">{user.role}</span>
        )}

        {canModerateStatus && (
          <>
            {user.status !== "suspended" && (
              <button
                disabled={pending}
                onClick={() => startTransition(() => setUserStatus(user.id, "suspended"))}
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-bg/70 hover:text-accent"
              >
                Suspend
              </button>
            )}
            {user.status !== "banned" && (
              <button
                disabled={pending}
                onClick={() => startTransition(() => setUserStatus(user.id, "banned"))}
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-bg/70 hover:text-accent"
              >
                Ban
              </button>
            )}
            {user.status !== "active" && (
              <button
                disabled={pending}
                onClick={() => startTransition(() => setUserStatus(user.id, "active"))}
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-bg/70 hover:text-accent"
              >
                Reactivate
              </button>
            )}
          </>
        )}

        {isOwner && (
          <button
            disabled={pending}
            onClick={() => {
              if (
                !confirm(
                  "Wipe this user's content, anonymize and ban their profile? (Real note: this cannot remove their login record — see Settings.) Re-authentication required next."
                )
              ) {
                return;
              }
              const password = window.prompt("Re-enter your password to confirm this destructive action:");
              if (!password) return;
              startTransition(async () => {
                try {
                  await bestEffortHardDeleteUser(user.id, password);
                } catch (e) {
                  alert(e instanceof Error ? e.message : "Failed.");
                }
              });
            }}
            className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent hover:text-accent-deep"
          >
            Hard-delete
          </button>
        )}
      </div>
    </div>
  );
}
