import { notFound } from "next/navigation";
import Link from "next/link";
import { getSessionProfile } from "@/lib/supabase/session";

const NAV: { href: string; label: string; ownerOnly: boolean }[] = [
  { href: "/control/users", label: "Users", ownerOnly: false },
  { href: "/control/content", label: "Content", ownerOnly: false },
  { href: "/control/settings", label: "Settings", ownerOnly: true },
  { href: "/control/audit-log", label: "Audit log", ownerOnly: true },
];

/**
 * Server-side role gate, spec §26.1 — not linked from any public
 * nav/footer, and every request still requires a full sign-in plus this
 * role check. The URL is a convenience boundary; RLS (enforced at the
 * database layer regardless of what this layout does) is the actual
 * security boundary — see supabase/migrations/0002_auth_articles_admin.sql.
 * 404s rather than redirecting to sign-in, so the route's existence
 * isn't confirmed to an unauthorized visitor.
 */
export default async function ControlLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionProfile();
  const role = session?.profile.role;
  if (!session || !["owner", "admin", "moderator"].includes(role ?? "")) notFound();

  return (
    <div className="min-h-screen bg-ink-dark text-bg">
      <div className="mx-auto flex max-w-container gap-56 px-24 py-56 md:px-56">
        <nav className="w-[160px] shrink-0 space-y-8">
          <p className="font-mono text-eyebrow uppercase text-bg/40">ĀRK Control</p>
          <p className="font-mono text-[11px] text-bg/60">{session.profile.username} · {role}</p>
          <div className="mt-24 flex flex-col gap-12">
            {NAV.filter((item) => !item.ownerOnly || role === "owner").map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-[12px] uppercase tracking-[0.1em] text-bg/70 hover:text-accent transition-colors duration-fast"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
