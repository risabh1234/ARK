"use client";

import { useTransition } from "react";
import { removeArticle, removeComment } from "@/app/control/actions";

export function RemoveArticleButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => confirm("Remove this article?") && startTransition(() => removeArticle(id))}
      className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent hover:text-accent-deep disabled:opacity-60"
    >
      {pending ? "Removing…" : "Remove"}
    </button>
  );
}

export function RemoveCommentButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => confirm("Remove this comment?") && startTransition(() => removeComment(id))}
      className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent hover:text-accent-deep disabled:opacity-60"
    >
      {pending ? "Removing…" : "Remove"}
    </button>
  );
}
