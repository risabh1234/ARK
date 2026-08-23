import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/Primitives";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = { title: "Reset your password" };

export default function ForgotPasswordPage() {
  return (
    <>
      <Header />
      <main className="pt-140 pb-140">
        <Container>
          <div className="mx-auto max-w-[420px]">
            <Eyebrow>Account</Eyebrow>
            <h1 className="mt-16 font-serif text-h1 font-medium text-ink">Reset your password</h1>
            <p className="mt-16 font-serif text-body text-muted">
              We&rsquo;ll email a link to set a new one.
            </p>
            <div className="mt-32">
              <ForgotPasswordForm />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
