import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser client — for client components. Runs as the `anon` Postgres
 * role, so RLS applies to everything queried through it.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
