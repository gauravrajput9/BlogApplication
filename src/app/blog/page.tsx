"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Fetch blogs from API
const fetchBlogs = async () => {
  const res = await fetch("/api/blog");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.errors || "Failed to fetch blogs");
  }
  return data.blogs;
};

export default function BlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load blogs on mount
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogsData = await fetchBlogs();
        setBlogs(blogsData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-10 px-4">
      <button
        onClick={() => router.push("/blog/create")}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Create New Blog
      </button>

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

      {/* Loading/Error states */}
      {loading && <p className="text-center text-gray-500">Loading blogs...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Blog list */}
      <div className="max-w-4xl mx-auto grid gap-6">
        {!loading && !error && filteredBlogs.length > 0
          ? filteredBlogs.map((blog) => (
              <Link
                href={`/blog/${blog._id}`} // use _id from MongoDB
                key={blog._id}
                className="block p-6 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition"
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {blog.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {blog.content}
                </p>
                <span className="text-sm text-gray-500 dark:text-gray-500 block mt-2">
                  {new Date(
                    parseInt(blog._id.toString().substring(0, 8), 16) * 1000
                  ).toLocaleDateString()}
                </span>
                <button onClick={() =>{
                  router.push(`/blog/${blog._id}`)
                }} >View Blog</button>
              </Link>
            ))
          : !loading && (
              <p className="text-center text-gray-500">No blogs found.</p>
            )}
      </div>
    </div>
  );
}
