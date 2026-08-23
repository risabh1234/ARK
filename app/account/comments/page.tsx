import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/Primitives";
import { createClient } from "@/lib/supabase/server";
import { getSessionProfile } from "@/lib/supabase/session";
import { DeleteCommentButton } from "@/components/account/DeleteCommentButton";

export const metadata: Metadata = { title: "My Comments" };

export default async function MyCommentsPage() {
  const session = await getSessionProfile();
  if (!session) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("comments")
    .select("id, body, created_at, article:articles(slug, title)")
    .eq("author_id", session.profile.id)
    .order("created_at", { ascending: false });

  const comments = data ?? [];

  return (
    <div>
      <Eyebrow>My Comments</Eyebrow>
      <h1 className="mt-16 font-serif text-h1 font-light text-ink">My Comments</h1>

      {comments.length === 0 ? (
        <p className="mt-32 font-serif text-body text-muted">No comments yet.</p>
      ) : (
        <div className="mt-32 border border-rule">
          {comments.map((comment, i) => {
            const article = Array.isArray(comment.article) ? comment.article[0] : comment.article;
            return (
              <div key={comment.id} className={`p-24 ${i > 0 ? "border-t border-rule" : ""}`}>
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                  on{" "}
                  <Link href={`/articles/${article?.slug}`} className="text-accent underline underline-offset-4">
                    {article?.title}
                  </Link>{" "}
                  · {new Date(comment.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
                <p className="mt-8 font-serif text-body text-ink">{comment.body}</p>
                <div className="mt-8">
                  <DeleteCommentButton commentId={comment.id} slug={article?.slug ?? ""} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
