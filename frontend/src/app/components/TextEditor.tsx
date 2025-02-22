'use client';
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    const blogData = { title, content };
    console.log("Blog Submitted:", blogData);
    // You can send this data to your backend API
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a New Blog Post</h2>
      
      <input
        type="text"
        placeholder="Enter Blog Title"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        className="mb-4"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Publish Blog
      </button>
    </div>
  );
}
