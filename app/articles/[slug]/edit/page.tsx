import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/Primitives";
import { ArticleComposer } from "@/components/articles/ArticleComposer";
import { createClient } from "@/lib/supabase/server";
import { getSessionProfile } from "@/lib/supabase/session";
import type { ArticleFull } from "@/lib/articles";

export const metadata: Metadata = { title: "Edit article" };

type Params = Promise<{ slug: string }>;

export default async function EditArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const session = await getSessionProfile();
  if (!session) redirect("/sign-in");

  const supabase = await createClient();
  const { data: article } = await supabase.from("articles").select("*").eq("slug", slug).single();
  if (!article) notFound();

  const isAuthor = session.profile.id === article.author_id;
  const canModerate = ["moderator", "admin", "owner"].includes(session.profile.role);
  if (!isAuthor && !canModerate) redirect(`/articles/${slug}`);

  return (
    <>
      <Header />
      <main className="pt-140 pb-140">
        <Container>
          <div className="mx-auto max-w-measure">
            <Eyebrow>Articles</Eyebrow>
            <h1 className="mt-16 font-serif text-h1 font-medium text-ink">Edit article</h1>
            <div className="mt-40">
              <ArticleComposer existing={article as ArticleFull} />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
