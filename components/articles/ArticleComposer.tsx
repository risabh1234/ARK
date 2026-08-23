"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { saveArticle, type ArticleFormState } from "@/app/articles/actions";
import { RichTextEditor } from "./RichTextEditor";
import { ARTICLE_TAGS } from "@/lib/articles";
import type { ArticleFull } from "@/lib/articles";

const inputClass =
  "mt-8 w-full border border-rule bg-transparent px-16 py-16 font-sans text-[15px] text-ink placeholder:text-muted focus:border-accent focus:outline-none transition-colors duration-fast";

export function ArticleComposer({ existing }: { existing?: ArticleFull }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<ArticleFormState, FormData>(saveArticle, {
    error: null,
  });
  const [body, setBody] = useState<unknown>(existing?.body_richtext ?? "");
  const [coverUrl, setCoverUrl] = useState(existing?.cover_image_url ?? "");
  const [uploading, setUploading] = useState(false);

  async function handleCoverUpload(file: File) {
    setUploading(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const path = `${user.id}/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("article-covers").upload(path, file);
      if (error) {
        alert(`Upload failed: ${error.message}`);
        return;
      }
      const { data } = supabase.storage.from("article-covers").getPublicUrl(path);
      setCoverUrl(data.publicUrl);
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} className="space-y-32">
      {existing && <input type="hidden" name="article_id" value={existing.id} />}
      <input type="hidden" name="body_richtext" value={JSON.stringify(body)} />
      <input type="hidden" name="cover_image_url" value={coverUrl} />

      <div>
        <label htmlFor="title" className="font-mono text-eyebrow uppercase text-muted">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={existing?.title}
          placeholder="A title worth arguing with"
          className={inputClass}
        />
      </div>

      <div>
        <label className="font-mono text-eyebrow uppercase text-muted">Cover image</label>
        <div className="mt-8 flex items-center gap-16">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleCoverUpload(e.target.files[0])}
            className="font-sans text-[14px] text-muted"
          />
          {uploading && <span className="font-mono text-[11px] text-muted">Uploading…</span>}
        </div>
        {coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={coverUrl} alt="Cover preview" className="mt-16 h-[160px] w-full object-cover" />
        )}
      </div>

      <div>
        <label htmlFor="tag" className="font-mono text-eyebrow uppercase text-muted">
          Tag
        </label>
        <select id="tag" name="tag" defaultValue={existing?.tag ?? ""} className={inputClass}>
          <option value="">No tag</option>
          {ARTICLE_TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="font-mono text-eyebrow uppercase text-muted">Body</label>
        <div className="mt-8">
          <RichTextEditor initialContent={existing?.body_richtext} onChange={setBody} />
        </div>
      </div>

      {state.error && (
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">{state.error}</p>
      )}

      <div className="flex flex-wrap gap-16">
        <button
          type="submit"
          name="intent"
          value="draft"
          disabled={pending}
          className="border border-rule px-24 py-16 font-sans text-ui font-medium text-ink hover:border-accent-deep hover:bg-bg-raised transition-colors duration-fast disabled:opacity-60"
        >
          Save draft
        </button>
        <button
          type="submit"
          name="intent"
          value="publish"
          disabled={pending}
          className="bg-accent px-24 py-16 font-sans text-ui font-medium text-bg hover:bg-accent-deep transition-colors duration-fast disabled:opacity-60"
        >
          {pending ? "Publishing…" : "Publish"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-24 py-16 font-sans text-ui font-medium text-muted hover:text-ink transition-colors duration-fast"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
