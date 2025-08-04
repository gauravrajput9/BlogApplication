"use client";

import BlogEditor from "@/components/RichTextEditor";

export default function CreateBlogPage() {
  const handleBlogSubmit = (data: { title: string; content: string }) => {
    console.log("Blog Submitted:", data);
    // Call API to save blog post here
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        Create New Blog
      </h1>
      <BlogEditor onSubmit={handleBlogSubmit} />
    </div>
  );
}
