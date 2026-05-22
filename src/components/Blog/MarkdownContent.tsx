"use client";

import Markdown from "markdown-to-jsx";

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose-lab max-w-none">
      <Markdown>{content}</Markdown>
    </div>
  );
}
