import { generateHTML } from "@tiptap/core";
import DOMPurify from "isomorphic-dompurify";
import { articleEditorExtensions } from "@/lib/articles";

/**
 * Renders the Tiptap JSON body to HTML server-side, then sanitizes it
 * before it ever reaches the client — spec §33's XSS requirement for
 * user-submitted rich text. Pull-quotes (blockquote) styled to match
 * the home page's four-line quote block, per §17.
 */
export function ArticleBody({ richtext }: { richtext: unknown }) {
  let html = "";
  try {
    html = generateHTML(richtext as never, articleEditorExtensions);
  } catch {
    html = "";
  }
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "em", "a", "blockquote", "h2", "h3", "ul", "ol", "li", "img", "code", "pre",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "target", "rel"],
  });

  return (
    <div
      className="article-body max-w-measure font-serif text-body text-ink [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:my-32 [&_blockquote]:border-l-2 [&_blockquote]:border-l-accent [&_blockquote]:pl-24 [&_blockquote]:font-serif [&_blockquote]:text-h2 [&_blockquote]:font-light [&_blockquote]:text-ink [&_h2]:mt-56 [&_h2]:font-serif [&_h2]:text-h2 [&_h2]:text-ink [&_h3]:mt-40 [&_h3]:font-serif [&_h3]:text-[20px] [&_h3]:text-ink [&_img]:my-32 [&_img]:w-full [&_li]:ml-24 [&_ol]:my-16 [&_ol]:list-decimal [&_p]:my-16 [&_ul]:my-16 [&_ul]:list-disc"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
