import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/Primitives";
import { ArticleComposer } from "@/components/articles/ArticleComposer";
import { getSessionProfile } from "@/lib/supabase/session";

export const metadata: Metadata = {
  title: "Write an article",
};

export default async function NewArticlePage() {
  const session = await getSessionProfile();
  if (!session) redirect("/sign-in");

  return (
    <>
      <Header />
      <main className="pt-140 pb-140">
        <Container>
          <div className="mx-auto max-w-measure">
            <Eyebrow>Articles</Eyebrow>
            <h1 className="mt-16 font-serif text-h1 font-medium text-ink">Write an article</h1>
            <p className="mt-16 font-serif text-body text-muted">
              Drafts are private to you until you publish. Sourcing discipline still applies —
              this isn&rsquo;t a separate, looser register.
            </p>
            <div className="mt-40">
              <ArticleComposer />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
