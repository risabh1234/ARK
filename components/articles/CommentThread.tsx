"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteComment } from "@/app/articles/actions";
import { CommentForm } from "./CommentForm";
import type { CommentItem } from "@/lib/articles";

export function CommentThread({
  articleId,
  slug,
  comments,
  currentUserId,
  canModerate,
  signedIn,
}: {
  articleId: string;
  slug: string;
  comments: CommentItem[];
  currentUserId: string | null;
  canModerate: boolean;
  signedIn: boolean;
}) {
  const topLevel = comments.filter((c) => !c.parent_comment_id);
  const repliesOf = (id: string) => comments.filter((c) => c.parent_comment_id === id);

  return (
    <div>
      {signedIn ? (
        <CommentForm articleId={articleId} slug={slug} />
      ) : (
        <p className="border border-rule p-24 font-serif text-body text-muted">
          <a href="/sign-in" className="text-accent underline underline-offset-4">
            Sign in
          </a>{" "}
          to comment.
        </p>
      )}

      <div className="mt-40 space-y-32">
        {topLevel.length === 0 && (
          <p className="font-serif text-body text-muted">No comments yet — be first.</p>
        )}
        {topLevel.map((comment) => (
          <CommentRow
            key={comment.id}
            comment={comment}
            replies={repliesOf(comment.id)}
            articleId={articleId}
            slug={slug}
            currentUserId={currentUserId}
            canModerate={canModerate}
            signedIn={signedIn}
          />
        ))}
      </div>
    </div>
  );
}

function CommentRow({
  comment,
  replies,
  articleId,
  slug,
  currentUserId,
  canModerate,
  signedIn,
}: {
  comment: CommentItem;
  replies: CommentItem[];
  articleId: string;
  slug: string;
  currentUserId: string | null;
  canModerate: boolean;
  signedIn: boolean;
}) {
  const router = useRouter();
  const [replying, setReplying] = useState(false);
  const canDelete = canModerate || currentUserId === comment.author_id;

  return (
    <div className="border-t border-rule pt-24">
      <p className="font-sans text-[14px] font-medium text-ink">
        {comment.author?.display_name || comment.author?.username || "reader"}
        <span className="ml-8 font-mono text-[11px] font-normal uppercase tracking-[0.1em] text-muted">
          {new Date(comment.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
        </span>
      </p>
      <p className="mt-8 font-serif text-body text-ink">{comment.body}</p>
      <div className="mt-8 flex gap-16">
        {signedIn && (
          <button
            onClick={() => setReplying((v) => !v)}
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted hover:text-accent"
          >
            Reply
          </button>
        )}
        {canDelete && (
          <button
            onClick={async () => {
              if (confirm("Delete this comment?")) {
                await deleteComment(comment.id, slug);
                router.refresh();
              }
            }}
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted hover:text-accent"
          >
            Delete
          </button>
        )}
      </div>

      {replying && (
        <div className="mt-16 pl-24">
          <CommentForm
            articleId={articleId}
            slug={slug}
            parentCommentId={comment.id}
            onPosted={() => setReplying(false)}
            autoFocus
          />
        </div>
      )}

      {replies.length > 0 && (
        <div className="mt-24 space-y-24 border-l border-rule pl-24">
          {replies.map((reply) => (
            <div key={reply.id}>
              <p className="font-sans text-[14px] font-medium text-ink">
                {reply.author?.display_name || reply.author?.username || "reader"}
                <span className="ml-8 font-mono text-[11px] font-normal uppercase tracking-[0.1em] text-muted">
                  {new Date(reply.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </span>
              </p>
              <p className="mt-8 font-serif text-body text-ink">{reply.body}</p>
              {(canModerate || currentUserId === reply.author_id) && (
                <button
                  onClick={async () => {
                    if (confirm("Delete this reply?")) {
                      await deleteComment(reply.id, slug);
                      router.refresh();
                    }
                  }}
                  className="mt-8 font-mono text-[11px] uppercase tracking-[0.1em] text-muted hover:text-accent"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
