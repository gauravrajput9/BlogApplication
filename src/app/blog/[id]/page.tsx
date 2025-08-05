"use client";

import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";

const fetchSingleBlog = async (id: string) => {
  const res = await fetch(`/api/blog/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.errors || "Failed to fetch Blog");
  return data.blog;
};

export default function BlogDetailPage() {
  const router = useRouter()
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const getBlog = async () => {
      try {
        const data = await fetchSingleBlog(id as string);
        setBlog(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getBlog();
  }, [id]);

  if (loading) return <h1 className="text-center">Loading Blog...</h1>;
  if (error) return <h1 className="text-center text-red-500">{error}</h1>;
  if (!blog) return <h1 className="text-center">{notFound()}</h1>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight mb-3">
          {blog.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <span>
            {new Date(parseInt(blog._id.toString().substring(0, 8), 16) * 1000).toLocaleDateString()}
          </span>
          <button
            className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={() => {
              alert(`Author: ${blog.author?.name || "Unknown"} (${blog.author?.email || "N/A"})`)
              router.push(`/blog/${blog._id}/author/${blog?.author?._id}`)
            }}
          >
            View Author
          </button>
        </div>

        {/* Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
}
