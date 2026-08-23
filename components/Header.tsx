import { Suspense } from "react";
import { HeaderClient } from "./HeaderClient";
import { HeaderSessionCorner } from "./HeaderSessionCorner";

/**
 * Sync server wrapper — the header shell (logo, nav, Primer pill)
 * renders immediately with no data dependency. Only the avatar/sign-in
 * corner waits on Supabase, and it's wrapped in Suspense so that wait
 * doesn't block the rest of the page from streaming out. Falls back to
 * "Sign in" while resolving — never a wrong-state flash, since the
 * fallback and the signed-out result render identically.
 */
export function Header() {
  return (
    <HeaderClient
      sessionSlot={
        <Suspense fallback={<HeaderSessionFallback />}>
          <HeaderSessionCorner />
        </Suspense>
      }
    />
  );
}

function HeaderSessionFallback() {
  return (
    <span className="hidden font-sans text-[15px] text-muted md:block" aria-hidden="true">
      Sign in
    </span>
  );
}
