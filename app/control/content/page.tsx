import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { RemoveArticleButton, RemoveCommentButton } from "@/components/control/ContentRow";

export const metadata: Metadata = { title: "Control · Content" };
export const revalidate = 0;

export default async function ControlContentPage() {
  const supabase = await createClient();

  const [{ data: articles }, { data: comments }] = await Promise.all([
    supabase
      .from("articles")
      .select("id, slug, title, status, created_at, author:profiles(username)")
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("comments")
      .select("id, body, created_at, article_id, author:profiles(username), article:articles(slug,title)")
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  return (
    <div className="space-y-56">
      <div>
        <p className="font-mono text-eyebrow uppercase text-bg/40">Moderation</p>
        <h1 className="mt-16 font-serif text-h1 font-medium text-bg">Content</h1>
        <p className="mt-8 max-w-measure font-serif text-[14px] text-bg/60">
          No report-flagging UI is built yet (spec §22 mentions it as an option, not a hard
          requirement) — this is direct search/browse across all content, newest first, with a
          remove action.
        </p>
      </div>

      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-bg/40">
          Recent articles ({articles?.length ?? 0})
        </p>
        <div className="mt-16">
          {(articles ?? []).map((a, i) => {
            const author = Array.isArray(a.author) ? a.author[0] : a.author;
            return (
              <div key={a.id} className={`flex items-center justify-between gap-16 py-12 ${i > 0 ? "border-t border-bg/10" : ""}`}>
                <div>
                  <Link href={`/articles/${a.slug}`} className="font-sans text-[14px] text-bg hover:text-accent">
                    {a.title}
                  </Link>
                  <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-bg/40">
                    {a.status} · @{author?.username}
                  </p>
                </div>
                <RemoveArticleButton id={a.id} />
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-bg/40">
          Recent comments ({comments?.length ?? 0})
        </p>
        <div className="mt-16">
          {(comments ?? []).map((c, i) => {
            const author = Array.isArray(c.author) ? c.author[0] : c.author;
            const article = Array.isArray(c.article) ? c.article[0] : c.article;
            return (
              <div key={c.id} className={`flex items-center justify-between gap-16 py-12 ${i > 0 ? "border-t border-bg/10" : ""}`}>
                <div>
                  <p className="font-sans text-[14px] text-bg">{c.body}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-bg/40">
                    @{author?.username} on{" "}
                    <Link href={`/articles/${article?.slug}`} className="hover:text-accent">
                      {article?.title}
                    </Link>
                  </p>
                </div>
                <RemoveCommentButton id={c.id} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
