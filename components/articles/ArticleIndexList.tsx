"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { ArticleListItem, ArticleTag } from "@/lib/articles";
import { ARTICLE_TAGS } from "@/lib/articles";

type Sort = "latest" | "discussed";

export function ArticleIndexList({ articles }: { articles: ArticleListItem[] }) {
  const [sort, setSort] = useState<Sort>("latest");
  const [tag, setTag] = useState<ArticleTag | "all">("all");

  const filtered = useMemo(() => {
    let list = tag === "all" ? articles : articles.filter((a) => a.tag === tag);
    list = [...list].sort((a, b) =>
      sort === "discussed"
        ? b.comment_count - a.comment_count
        : new Date(b.published_at ?? 0).getTime() - new Date(a.published_at ?? 0).getTime()
    );
    return list;
  }, [articles, sort, tag]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-16">
        <div className="flex flex-wrap gap-8">
          {(["all", ...ARTICLE_TAGS] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`border px-16 py-8 font-mono text-[12px] uppercase tracking-[0.1em] transition-colors duration-fast ${
                tag === t ? "border-accent-deep text-accent" : "border-rule text-muted hover:text-ink"
              }`}
            >
              {t === "all" ? "All" : t}
            </button>
          ))}
        </div>
        <div className="flex gap-8">
          <button
            onClick={() => setSort("latest")}
            className={`font-mono text-[12px] uppercase tracking-[0.1em] ${sort === "latest" ? "text-accent" : "text-muted hover:text-ink"}`}
          >
            Latest
          </button>
          <span className="text-muted">·</span>
          <button
            onClick={() => setSort("discussed")}
            className={`font-mono text-[12px] uppercase tracking-[0.1em] ${sort === "discussed" ? "text-accent" : "text-muted hover:text-ink"}`}
          >
            Most discussed
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-56 font-serif text-body text-muted">Nothing published under this tag yet.</p>
      ) : (
        <div className="mt-40 grid gap-0 border border-rule">
          {filtered.map((article, i) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className={`flex flex-col gap-8 p-24 transition-colors duration-fast hover:bg-bg-raised md:flex-row md:items-baseline md:justify-between ${
                i > 0 ? "border-t border-rule" : ""
              }`}
            >
              <div>
                {article.tag && (
                  <p className="font-mono text-eyebrow uppercase text-accent">{article.tag}</p>
                )}
                <h3 className="mt-8 font-serif text-[22px] leading-tight text-ink">{article.title}</h3>
                <p className="mt-8 font-sans text-[14px] text-muted">
                  {article.author?.display_name || article.author?.username || "ĀRK reader"}
                  {article.published_at &&
                    ` · ${new Date(article.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`}
                </p>
              </div>
              <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                {article.comment_count} {article.comment_count === 1 ? "comment" : "comments"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
