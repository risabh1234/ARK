import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/Primitives";
import { AuthForm } from "@/components/auth/AuthForm";
import { signUpWithPassword } from "@/app/auth/actions";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create an ĀRK account to write articles and comment.",
};

export default function SignUpPage() {
  return (
    <>
      <Header />
      <main className="pt-140 pb-140">
        <Container>
          <div className="mx-auto max-w-[420px]">
            <Eyebrow>Account</Eyebrow>
            <h1 className="mt-16 font-serif text-h1 font-medium text-ink">Create an account</h1>
            <p className="mt-16 font-serif text-body text-muted">
              For writing articles and commenting. Reading the site — briefs, Primer, Docs — never
              requires one.
            </p>

            <div className="mt-32">
              <AuthForm mode="sign-up" action={signUpWithPassword} />
            </div>

            <p className="mt-32 font-serif text-[15px] text-muted">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-accent underline underline-offset-4">
                Sign in
              </Link>
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
