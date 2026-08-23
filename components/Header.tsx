import { getSessionProfile } from "@/lib/supabase/session";
import { HeaderClient } from "./HeaderClient";

/**
 * Server wrapper — reads the session server-side (spec §20.3) so the
 * header never flashes "Sign in" before swapping to the avatar menu.
 * Every existing `<Header />` call site gets this for free, no prop
 * threading required.
 */
export async function Header() {
  const session = await getSessionProfile();

  return (
    <HeaderClient
      session={
        session
          ? { email: session.email, username: session.profile.username, role: session.profile.role }
          : null
      }
    />
  );
}
