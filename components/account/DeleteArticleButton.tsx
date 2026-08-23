"use client";

import { useTransition } from "react";
import { deleteArticle } from "@/app/articles/actions";

export function DeleteArticleButton({ articleId }: { articleId: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm("Delete this article? This can't be undone.")) {
          startTransition(() => deleteArticle(articleId));
        }
      }}
      disabled={pending}
      className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted hover:text-accent disabled:opacity-60"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
