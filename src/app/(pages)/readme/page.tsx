"use client";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug"; // 用于为标题添加 id
import rehypeAutolinkHeadings from "rehype-autolink-headings"; // 用于为标题添加跳转链接
import "highlight.js/styles/atom-one-dark.css";
import "./index.css";

export default function Page() {
  const [markdownContent, setMarkdownContent] = useState("");
  const [toc, setToc] = useState<{ level: number; text: string; id: string }[]>(
    []
  ); // 用于存储目录信息

  useEffect(() => {
    fetch("/content/readme.md")
      .then((response) => response.text())
      .then((data) => {
        setMarkdownContent(data);
        generateToc(data);
      });
  }, []);

  // 生成目录（从 Markdown 中提取标题）
  const generateToc = (content: string) => {
    const regex = /^(#{1,6})\s+(.*)$/gm;
    const headings: { level: number; text: string; id: string }[] = [];
    let match;

    // 提取 Markdown 中的所有标题
    while ((match = regex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2]; // 获取标题文本
      const id = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, ""); // 生成唯一的 ID
      headings.push({ level, text, id });
    }
    setToc(headings);
  };

  return (
    <div className="markdown-container">
      <aside className="toc">
        <h2>目录</h2>
        <ul>
          {toc.map(({ level, text, id }) => (
            <li key={id} style={{ marginLeft: `${(level - 1) * 10}px` }}>
              <a href={`#${id}`} className="toc-link">
                {text}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <main className="markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings]}
        >
          {markdownContent}
        </ReactMarkdown>
      </main>
    </div>
  );
}
