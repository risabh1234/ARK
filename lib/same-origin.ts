/**
 * Same-origin check for plain form POSTs, spec §33 ("ensure any custom
 * form POST uses same-origin checks" — Supabase's SSR helpers handle
 * this for auth flows via server actions automatically; these two
 * hand-rolled routes predate that and needed it added explicitly).
 */
export function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // same-origin requests from some clients omit Origin; host check below still applies
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}
