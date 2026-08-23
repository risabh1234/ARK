import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/Primitives";
import { createClient } from "@/lib/supabase/server";
import { getSessionProfile } from "@/lib/supabase/session";
import { DeleteArticleButton } from "@/components/account/DeleteArticleButton";

export const metadata: Metadata = { title: "My Articles" };

export default async function MyArticlesPage() {
  const session = await getSessionProfile();
  if (!session) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("id, slug, title, status, published_at, created_at, comments(count)")
    .eq("author_id", session.profile.id)
    .order("created_at", { ascending: false });

  const articles = data ?? [];

  return (
    <div>
      <Eyebrow>My Articles</Eyebrow>
      <h1 className="mt-16 font-serif text-h1 font-medium text-ink">My Articles</h1>

      {articles.length === 0 ? (
        <p className="mt-32 font-serif text-body text-muted">
          Nothing yet.{" "}
          <Link href="/articles/new" className="text-accent underline underline-offset-4">
            Write one
          </Link>
          .
        </p>
      ) : (
        <div className="mt-32 border border-rule">
          {articles.map((article, i) => (
            <div
              key={article.id}
              className={`flex flex-wrap items-center justify-between gap-16 p-24 ${i > 0 ? "border-t border-rule" : ""}`}
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  {article.status === "draft" ? "Draft" : "Published"}
                  {Array.isArray(article.comments) &&
                    ` · ${article.comments[0]?.count ?? 0} comments`}
                </p>
                <h3 className="mt-4 font-serif text-[18px] text-ink">{article.title}</h3>
              </div>
              <div className="flex gap-16">
                <Link
                  href={`/articles/${article.slug}`}
                  className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted hover:text-accent"
                >
                  View
                </Link>
                <Link
                  href={`/articles/${article.slug}/edit`}
                  className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent underline underline-offset-4"
                >
                  Edit
                </Link>
                <DeleteArticleButton articleId={article.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
