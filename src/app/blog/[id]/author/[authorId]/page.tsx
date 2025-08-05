"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const fetchAuthor = async (authorId: string) => {
  const res = await fetch(`/api/authors/${authorId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.errors || "Failed to fetch Author");
  return data;
};

export default function AuthorViewPage() {
  const { authorId } = useParams();
  const [author, setAuthor] = useState<any>(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authorId) return;
    fetchAuthor(authorId as string)
      .then((data) => {
        setAuthor(data?.author);
        setBlogs(data?.blogs);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [authorId]);

  if (loading) return <div className="text-center mt-10">Loading author...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Author Profile Card */}
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl shadow-md bg-white dark:bg-gray-900">
        <img
          src={author?.image || "/default-avatar.png"}
          alt={author?.name}
          className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {author?.name}
          </h1>
          {author?.bio && (
            <p className="mt-2 text-gray-600 dark:text-gray-300">{author.bio}</p>
          )}
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {author?.email}
          </p>
        </div>
      </div>

      {/* Blogs Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Blogs by {author?.name}
        </h2>

        {blogs.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No blogs found for this author.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog: any) => (
              <div
                key={blog._id}
                className="p-5 rounded-xl shadow hover:shadow-lg transition bg-white dark:bg-gray-800 cursor-pointer"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                  {blog.content}
                </p>
                <button className="mt-3 text-blue-600 hover:underline">
                  Read More →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
