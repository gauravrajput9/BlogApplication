"use client";

import { useState } from "react";
import Link from "next/link";

// Example dummy blogs (replace with API data)
const blogs = [
  {
    id: 1,
    title: "First Blog Post",
    excerpt: "This is a short preview of the first blog...",
    date: "2025-08-04",
  },
  {
    id: 2,
    title: "Next.js 15 + Tiptap Setup",
    excerpt: "Learn how to integrate Tiptap editor in Next.js...",
    date: "2025-08-02",
  },
  {
    id: 3,
    title: "Dark Mode UI for Blogs",
    excerpt: "Implementing clean dark mode UI using Tailwind CSS...",
    date: "2025-07-29",
  },
];

export default function BlogsPage() {
  const [search, setSearch] = useState("");

  // Filter blogs based on search
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        All Blogs
      </h1>

      {/* Search bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* Blog list */}
      <div className="max-w-4xl mx-auto grid gap-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Link
              href={`/blog/${blog.id}`}
              key={blog.id}
              className="block p-6 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {blog.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {blog.excerpt}
              </p>
              <span className="text-sm text-gray-500 dark:text-gray-500 block mt-2">
                {new Date(blog.date).toLocaleDateString()}
              </span>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No blogs found.</p>
        )}
      </div>
    </div>
  );
}
