import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/Primitives";
import { ArticleBody } from "@/components/articles/ArticleBody";
import { CommentThread } from "@/components/articles/CommentThread";
import { createClient } from "@/lib/supabase/server";
import { getSessionProfile } from "@/lib/supabase/session";
import { readTimeMinutes } from "@/lib/articles";
import type { ArticleFull, CommentItem } from "@/lib/articles";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("articles").select("title").eq("slug", slug).single();
  return data ? { title: data.title } : {};
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const supabase = await createClient();
  const session = await getSessionProfile();

  const { data: article } = await supabase
    .from("articles")
    .select("*, author:profiles(username, display_name, bio)")
    .eq("slug", slug)
    .single();

  if (!article) notFound();

  const typedArticle = { ...article, author: article.author } as ArticleFull;

  const { data: commentsData } = await supabase
    .from("comments")
    .select("*, author:profiles(username, display_name)")
    .eq("article_id", typedArticle.id)
    .order("created_at", { ascending: true });

  const comments = (commentsData ?? []) as unknown as CommentItem[];

  const isAuthor = session?.profile.id === typedArticle.author_id;
  const canModerate =
    !!session && ["moderator", "admin", "owner"].includes(session.profile.role);

  return (
    <>
      <Header />
      <main className="pt-140 pb-140">
        <Container>
          <div className="mx-auto max-w-measure">
            {typedArticle.tag && <Eyebrow>{typedArticle.tag}</Eyebrow>}
            <h1 className="mt-16 font-serif text-h1 font-light text-ink">{typedArticle.title}</h1>
            <div className="mt-24 flex flex-wrap items-center gap-16">
              <p className="font-sans text-[15px] text-muted">
                {typedArticle.author?.display_name || typedArticle.author?.username || "ĀRK reader"}
                {typedArticle.published_at &&
                  ` · ${new Date(typedArticle.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`}
                {` · ${readTimeMinutes(typedArticle.body_richtext)} min read`}
              </p>
              {typedArticle.status === "draft" && (
                <span className="border border-accent-deep px-8 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                  Draft
                </span>
              )}
              {(isAuthor || canModerate) && (
                <div className="flex gap-16">
                  <Link
                    href={`/articles/${slug}/edit`}
                    className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent underline underline-offset-4"
                  >
                    Edit
                  </Link>
                </div>
              )}
            </div>

            {typedArticle.cover_image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={typedArticle.cover_image_url}
                alt=""
                className="mt-40 h-auto w-full max-h-[420px] object-cover"
              />
            )}

            <div className="mt-40">
              <ArticleBody richtext={typedArticle.body_richtext} />
            </div>

            <div className="mt-88 border-t border-rule pt-56">
              <Eyebrow>
                {comments.length} {comments.length === 1 ? "comment" : "comments"}
              </Eyebrow>
              <div className="mt-24">
                <CommentThread
                  articleId={typedArticle.id}
                  slug={slug}
                  comments={comments}
                  currentUserId={session?.profile.id ?? null}
                  canModerate={canModerate}
                  signedIn={!!session}
                />
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
