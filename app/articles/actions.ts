"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ArticleTag } from "@/lib/articles";

function slugify(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 60) || "article"
  );
}

export type ArticleFormState = { error: string | null };

export async function saveArticle(
  _prev: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You need to sign in first." };

  const title = String(formData.get("title") || "").trim();
  const bodyJson = String(formData.get("body_richtext") || "{}");
  const tag = (String(formData.get("tag") || "") || null) as ArticleTag | null;
  const coverImageUrl = String(formData.get("cover_image_url") || "") || null;
  const publish = formData.get("intent") === "publish";
  const articleId = String(formData.get("article_id") || "") || null;

  if (!title) return { error: "Title is required." };

  let body_richtext: unknown;
  try {
    body_richtext = JSON.parse(bodyJson);
  } catch {
    return { error: "Article body couldn't be read — try again." };
  }

  const payload = {
    title,
    body_richtext,
    tag,
    cover_image_url: coverImageUrl,
    status: publish ? "published" : "draft",
    published_at: publish ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  let slug: string;

  if (articleId) {
    const { data: existing } = await supabase
      .from("articles")
      .select("slug")
      .eq("id", articleId)
      .single();
    slug = existing?.slug ?? slugify(title);
    const { error } = await supabase.from("articles").update(payload).eq("id", articleId);
    if (error) return { error: error.message };
  } else {
    slug = `${slugify(title)}-${Date.now().toString(36)}`;
    const { error } = await supabase
      .from("articles")
      .insert({ ...payload, author_id: user.id, slug });
    if (error) return { error: error.message };
  }

  revalidatePath("/articles");
  redirect(`/articles/${slug}`);
}

export async function deleteArticle(articleId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", articleId);
  if (error) throw new Error(error.message);
  revalidatePath("/articles");
  redirect("/account/articles");
}

export type CommentFormState = { error: string | null };

export async function postComment(
  _prev: CommentFormState,
  formData: FormData
): Promise<CommentFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sign in to comment." };

  const articleId = String(formData.get("article_id") || "");
  const body = String(formData.get("body") || "").trim();
  const parentCommentId = String(formData.get("parent_comment_id") || "") || null;
  const slug = String(formData.get("slug") || "");

  if (!body) return { error: "Comment can't be empty." };
  if (!articleId) return { error: "Missing article." };

  const { error } = await supabase
    .from("comments")
    .insert({ article_id: articleId, author_id: user.id, body, parent_comment_id: parentCommentId });
  if (error) return { error: error.message };

  revalidatePath(`/articles/${slug}`);
  return { error: null };
}

export async function deleteComment(commentId: string, slug: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("comments").delete().eq("id", commentId);
  if (error) throw new Error(error.message);
  revalidatePath(`/articles/${slug}`);
}
