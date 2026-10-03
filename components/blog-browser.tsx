"use client";
import { useState } from "react";
import { articles } from "@/lib/content";
import { BlogCard } from "./shared";
export function BlogBrowser() {
  const [category, setCategory] = useState("All Resources");
  const categories = [
    "All Resources",
    ...new Set(articles.map((a) => a.category)),
  ];
  return (
    <>
      <div className="blog-filters" aria-label="Filter articles">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="blog-grid">
        {articles
          .filter(
            (a) => category === "All Resources" || a.category === category,
          )
          .map((a, i) => (
            <BlogCard key={a.slug} article={a} index={i} />
          ))}
      </div>
    </>
  );
}
