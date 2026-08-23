import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

/** Shared between the composer (client) and the server-side HTML renderer. */
export const articleEditorExtensions = [
  StarterKit,
  Link.configure({ openOnClick: false, autolink: true }),
  Image,
];

export const ARTICLE_TAGS = ["Sanskrit", "Method", "Field Notes"] as const;
export type ArticleTag = (typeof ARTICLE_TAGS)[number];

export type ArticleListItem = {
  id: string;
  slug: string;
  title: string;
  cover_image_url: string | null;
  tag: ArticleTag | null;
  published_at: string | null;
  author: { username: string; display_name: string | null } | null;
  comment_count: number;
};

export type ArticleFull = {
  id: string;
  slug: string;
  title: string;
  cover_image_url: string | null;
  body_richtext: unknown;
  tag: ArticleTag | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  author_id: string;
  author: { username: string; display_name: string | null; bio: string | null } | null;
};

export type CommentItem = {
  id: string;
  article_id: string;
  author_id: string;
  parent_comment_id: string | null;
  body: string;
  created_at: string;
  edited_at: string | null;
  author: { username: string; display_name: string | null } | null;
};

function extractText(node: unknown, out: string[]): void {
  if (!node || typeof node !== "object") return;
  const n = node as { text?: string; content?: unknown[] };
  if (typeof n.text === "string") out.push(n.text);
  if (Array.isArray(n.content)) n.content.forEach((child) => extractText(child, out));
}

export function readTimeMinutes(richtext: unknown): number {
  const words: string[] = [];
  extractText(richtext, words);
  const wordCount = words.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / 200));
}
