import Link from "next/link";
import { getSessionProfile } from "@/lib/supabase/session";

/**
 * The only part of the header that actually needs the Supabase round
 * trip. Split out so it can stream inside a Suspense boundary
 * (Header.tsx) instead of blocking the entire page's first byte on an
 * auth check nobody's eyes are on yet — this was a real, measured
 * contributor to page-load latency (every route was forced fully
 * dynamic on this one lookup). See DEVELOPMENT_LOG.md.
 */
export async function HeaderSessionCorner() {
  const session = await getSessionProfile();

  if (!session) {
    return (
      <Link
        href="/sign-in"
        className="hidden font-sans text-[15px] text-muted hover:text-ink transition-colors duration-fast md:block"
      >
        Sign in
      </Link>
    );
  }

  const canModerate = ["owner", "admin", "moderator"].includes(session.profile.role);

  return (
    <div className="hidden items-center gap-8 md:flex">
      {canModerate && (
        <Link
          href="/control"
          className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted hover:text-accent transition-colors duration-fast"
        >
          Control
        </Link>
      )}
      <Link
        href="/account"
        className="flex h-32 w-32 items-center justify-center border border-rule font-sans text-[13px] font-medium text-ink hover:border-accent-deep transition-colors duration-fast"
        aria-label="Account"
        title={session.profile.username}
      >
        {session.profile.username.charAt(0).toUpperCase()}
      </Link>
    </div>
  );
}
