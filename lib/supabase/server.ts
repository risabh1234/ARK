import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server client — for server components, route handlers, and server
 * actions. Reads/writes the session via cookies (httpOnly, secure,
 * sameSite — handled by @supabase/ssr, per spec §33). Runs as the
 * `authenticated` Postgres role when a session exists, so RLS is the
 * real enforcement boundary for every table it touches.
 *
 * Must be called fresh per request (not module-level singleton) since
 * it's bound to that request's cookie store.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Called from a Server Component that can't set cookies —
            // safe to ignore as long as middleware.ts also refreshes
            // the session, which it does.
          }
        },
      },
    }
  );
}
