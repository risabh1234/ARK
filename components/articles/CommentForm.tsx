"use client";

import { useActionState, useRef, useEffect } from "react";
import { postComment, type CommentFormState } from "@/app/articles/actions";

export function CommentForm({
  articleId,
  slug,
  parentCommentId,
  onPosted,
  autoFocus = false,
}: {
  articleId: string;
  slug: string;
  parentCommentId?: string;
  onPosted?: () => void;
  autoFocus?: boolean;
}) {
  const [state, formAction, pending] = useActionState<CommentFormState, FormData>(postComment, {
    error: null,
  });
  const formRef = useRef<HTMLFormElement>(null);
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !pending && !state.error) {
      formRef.current?.reset();
      onPosted?.();
    }
    wasPending.current = pending;
  }, [pending, state.error, onPosted]);

  return (
    <form ref={formRef} action={formAction} className="space-y-12">
      <input type="hidden" name="article_id" value={articleId} />
      <input type="hidden" name="slug" value={slug} />
      {parentCommentId && <input type="hidden" name="parent_comment_id" value={parentCommentId} />}
      <textarea
        name="body"
        required
        rows={parentCommentId ? 2 : 3}
        autoFocus={autoFocus}
        placeholder={parentCommentId ? "Reply…" : "Add to the thread…"}
        className="w-full border border-rule bg-transparent px-16 py-16 font-sans text-[15px] text-ink placeholder:text-muted focus:border-accent focus:outline-none transition-colors duration-fast"
      />
      {state.error && (
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="bg-accent px-16 py-8 font-sans text-[14px] font-medium text-bg hover:bg-accent-deep transition-colors duration-fast disabled:opacity-60"
      >
        {pending ? "Posting…" : parentCommentId ? "Reply" : "Comment"}
      </button>
    </form>
  );
}
