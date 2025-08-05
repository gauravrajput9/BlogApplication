'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const createBlog = async ({ title, content }: { title: string; content: string }) => {
  const res = await fetch('/api/blog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.errors || 'Failed to create blog');
  return data;
};

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      alert('Blog created successfully!');
      setTitle('');
      setContent('');
      router.push('/blog'); // Redirect to home or blog list page
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required');
      return;
    }
    mutation.mutate({ title, content });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded h-40"
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {mutation.isPending ? 'Creating...' : 'Create Blog'}
        </button>
        {mutation.isError && (
          <p className="text-red-600 mt-2">{(mutation.error as Error).message}</p>
        )}
      </form>
    </div>
  );
}
