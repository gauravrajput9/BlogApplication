"use client";

import { useParams } from "next/navigation";

// Dummy blogs (replace with API or DB fetch)
const blogs = [
  {
    id: 1,
    title: "First Blog Post",
    content: "<p>This is the detailed content of the first blog post.</p>",
    date: "2025-08-04",
  },
  {
    id: 2,
    title: "Next.js 15 + Tiptap Setup",
    content: "<p>Guide to integrate Tiptap editor with Next.js 15...</p>",
    date: "2025-08-02",
  },
  {
    id: 3,
    title: "Dark Mode UI for Blogs",
    content: "<p>Learn how to enable dark mode UI using Tailwind CSS...</p>",
    date: "2025-07-29",
  },
];

export default function BlogDetailPage() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return <p className="text-center mt-10 text-gray-500">Blog not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {blog.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          {new Date(blog.date).toLocaleDateString()}
        </p>

        <div
          className="prose dark:prose-invert max-w-none mt-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
}
