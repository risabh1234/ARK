import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container, Eyebrow } from "@/components/Primitives";
import { ArticleIndexList } from "@/components/articles/ArticleIndexList";
import { createClient } from "@/lib/supabase/server";
import type { ArticleListItem } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles",
  description: "Reader-written pieces, tagged and discussed under the same method.",
};

export const revalidate = 60;

export default async function ArticlesIndexPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("id, slug, title, cover_image_url, tag, published_at, author:profiles(username, display_name), comments(count)")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const articles: ArticleListItem[] = (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    cover_image_url: row.cover_image_url,
    tag: row.tag,
    published_at: row.published_at,
    author: Array.isArray(row.author) ? row.author[0] ?? null : row.author,
    comment_count: Array.isArray(row.comments) ? (row.comments[0]?.count ?? 0) : 0,
  }));

  return (
    <>
      <Header />
      <main className="pt-140 pb-140">
        <Container>
          <div className="flex flex-wrap items-start justify-between gap-24">
            <div>
              <Eyebrow>Articles</Eyebrow>
              <h1 className="mt-16 max-w-[16ch] font-serif text-h1 font-medium text-ink">
                Written by readers, held to the same method.
              </h1>
              <p className="mt-24 max-w-lead font-serif text-lead font-light text-muted">
                Anyone with an account can write one. Anyone can comment. Every piece is tagged
                against the same pillars the briefs use.
              </p>
            </div>
            <Link
              href="/articles/new"
              className="shrink-0 bg-accent px-24 py-16 font-sans text-ui font-medium text-bg hover:bg-accent-deep transition-colors duration-fast"
            >
              Write an article
            </Link>
          </div>

          <div className="mt-56">
            <ArticleIndexList articles={articles} />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
