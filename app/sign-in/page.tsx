import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/Primitives";
import { AuthForm } from "@/components/auth/AuthForm";
import { signInWithPassword } from "@/app/auth/actions";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to ĀRK.",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  return (
    <>
      <Header />
      <main className="pt-140 pb-140">
        <Container>
          <div className="mx-auto max-w-[420px]">
            <Eyebrow>Account</Eyebrow>
            <h1 className="mt-16 font-serif text-h1 font-medium text-ink">Sign in</h1>

            {params["check-email"] && (
              <p className="mt-24 border border-accent-deep bg-accent/[0.06] p-16 font-serif text-[14px] text-ink">
                Check your email for a confirmation link before signing in.
              </p>
            )}
            {params["auth-error"] && (
              <p className="mt-24 border border-accent-deep bg-accent/[0.06] p-16 font-serif text-[14px] text-ink">
                That link didn&rsquo;t work — it may have expired. Try signing in directly.
              </p>
            )}
            {params["oauth-error"] && (
              <p className="mt-24 border border-accent-deep bg-accent/[0.06] p-16 font-serif text-[14px] text-ink">
                Google sign-in isn&rsquo;t configured yet — use email and password instead.
              </p>
            )}

            <div className="mt-32">
              <AuthForm mode="sign-in" action={signInWithPassword} />
            </div>

            <p className="mt-32 font-serif text-[15px] text-muted">
              No account yet?{" "}
              <Link href="/sign-up" className="text-accent underline underline-offset-4">
                Create one
              </Link>
            </p>
            <p className="mt-8 font-serif text-[15px] text-muted">
              <Link href="/forgot-password" className="text-accent underline underline-offset-4">
                Forgot your password?
              </Link>
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
