"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {TextStyle} from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";

export default function BlogEditor({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [title, setTitle] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Highlight,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "<p>Write your blog content...</p>",
    immediatelyRender: false,
  });

  const handleSubmit = () => {
    onSubmit({
      title,
      content: editor?.getHTML() || "",
    });
  };

  if (!editor) return null;

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 space-y-4">
      {/* Title */}
      <input
        type="text"
        placeholder="Blog title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-2xl font-bold bg-transparent border-b border-gray-300 dark:border-gray-700 focus:outline-none py-2 mb-4"
      />

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b border-gray-300 dark:border-gray-700 pb-2 mb-4">
        {/* Headings */}
        <select
          onChange={(e) =>
            editor.chain().focus().setHeading({ level: parseInt(e.target.value) }).run()
          }
          className="border rounded px-2"
        >
          <option value="1" className="text-black">H1</option>
          <option value="2" className="text-black">H2</option>
          <option value="3" className="text-black">H3</option>
        </select>

        {/* Font Family */}
        <select
          onChange={(e) =>
            editor.chain().focus().setFontFamily(e.target.value).run()
          }
          className="border rounded px-2"
        >
          <option value="Arial" className="text-black">Arial</option>
          <option value="Times New Roman" className="text-black">Times New Roman</option>
          <option value="Courier New" className="text-black">Courier New</option>
        </select>

        {/* Colors */}
        <input
          type="color"
          onInput={(e) => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
          className="w-8 h-8 border rounded"
        />

        {/* Bold / Italic / Highlight */}
        <button onClick={() => editor.chain().focus().toggleBold().run()} className="px-2 border rounded">B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className="px-2 border rounded italic">I</button>
        <button onClick={() => editor.chain().focus().toggleHighlight().run()} className="px-2 border rounded bg-yellow-300">HL</button>

        {/* Undo / Redo */}
        <button onClick={() => editor.chain().focus().undo().run()} className="px-2 border rounded">Undo</button>
        <button onClick={() => editor.chain().focus().redo().run()} className="px-2 border rounded">Redo</button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="min-h-[250px] p-3 border rounded-lg dark:border-gray-700"
      />

      {/* Submit */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
