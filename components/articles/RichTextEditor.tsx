"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { articleEditorExtensions } from "@/lib/articles";

const BUTTON =
  "border border-rule px-12 py-6 font-mono text-[11px] uppercase tracking-[0.08em] text-muted hover:text-ink hover:border-accent-deep transition-colors duration-fast";
const BUTTON_ACTIVE = "border-accent-deep text-accent";

export function RichTextEditor({
  initialContent,
  onChange,
}: {
  initialContent?: unknown;
  onChange: (json: unknown) => void;
}) {
  const editor = useEditor({
    extensions: articleEditorExtensions,
    content: (initialContent as never) ?? "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
    editorProps: {
      attributes: {
        class:
          "min-h-[320px] border border-rule border-t-0 p-24 font-serif text-body text-ink focus:outline-none [&_blockquote]:border-l-2 [&_blockquote]:border-l-accent [&_blockquote]:pl-16 [&_blockquote]:italic [&_h2]:mt-24 [&_h2]:font-serif [&_h2]:text-h2 [&_h3]:mt-16 [&_h3]:font-serif [&_h3]:text-[20px] [&_p]:my-8",
      },
    },
  });

  if (!editor) return <div className="border border-rule p-24 text-muted">Loading editor…</div>;

  return (
    <div>
      <div className="flex flex-wrap gap-8 border border-rule p-8">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${BUTTON} ${editor.isActive("bold") ? BUTTON_ACTIVE : ""}`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${BUTTON} ${editor.isActive("italic") ? BUTTON_ACTIVE : ""}`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${BUTTON} ${editor.isActive("heading", { level: 2 }) ? BUTTON_ACTIVE : ""}`}
        >
          Heading
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${BUTTON} ${editor.isActive("blockquote") ? BUTTON_ACTIVE : ""}`}
        >
          Quote
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${BUTTON} ${editor.isActive("bulletList") ? BUTTON_ACTIVE : ""}`}
        >
          List
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Link URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className={`${BUTTON} ${editor.isActive("link") ? BUTTON_ACTIVE : ""}`}
        >
          Link
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className={BUTTON}
        >
          Image
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
