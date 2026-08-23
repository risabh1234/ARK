import { redirect } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Primitives";
import { getSessionProfile } from "@/lib/supabase/session";

const NAV = [
  { href: "/account", label: "Overview" },
  { href: "/account/articles", label: "My Articles" },
  { href: "/account/comments", label: "My Comments" },
  { href: "/account/settings", label: "Settings" },
] as const;

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionProfile();
  if (!session) redirect("/sign-in");

  return (
    <>
      <Header />
      <main className="pt-140 pb-140">
        <Container>
          <div className="grid gap-56 md:grid-cols-[200px_1fr]">
            <nav className="flex gap-16 overflow-x-auto md:flex-col md:gap-8">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.1em] text-muted hover:text-accent transition-colors duration-fast"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div>{children}</div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
