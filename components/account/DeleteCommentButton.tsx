"use client";

import { useTransition } from "react";
import { deleteComment } from "@/app/articles/actions";
import { useRouter } from "next/navigation";

export function DeleteCommentButton({ commentId, slug }: { commentId: string; slug: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (confirm("Delete this comment?")) {
          startTransition(async () => {
            await deleteComment(commentId, slug);
            router.refresh();
          });
        }
      }}
      disabled={pending}
      className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted hover:text-accent disabled:opacity-60"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
