// Navigation.tsx
"use client";

import { useState } from "react";
import { ArrowLeft, SendHorizontalIcon } from "lucide-react";
import BlogTitleEditor from "./BlogTitleEditor";
import Link from "next/link";
import dynamic from "next/dynamic";


// Dynamically import the ToastEditor component
const ToastEditor = dynamic(() => import("./ToastEditor"), {
  ssr: false, // Ensures it only runs in the client
});

const Navigation = () => {
  const [title, setTitle] = useState<string>("Blog Title");
  const [content, setContent] = useState<string>("");
  

  const handleCreatePost = async () => {
     alert('hi baby');
  };

  return (
    <div className="flex flex-col items-center max-w-4xl px-6 py-8 mx-auto bg-gray-50">
      {/* Back Button */}
      <div className="self-start mb-4">
        <Link href="/feed">
          <button className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-all duration-200">
            <ArrowLeft className="text-3xl" />
          </button>
        </Link>
      </div>

      {/* Auto-Expanding Input Section */}
      <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg w-full">
        {/* Blog Title Editor */}
        <BlogTitleEditor title={title} setTitle={setTitle} />

        {/* Content Editor */}
        <ToastEditor setContent={setContent} />

        {/* Post Button */}
        <button
          onClick={handleCreatePost}
          disabled={!title.trim() || !content.trim()} // Disable button if title or content is empty
          className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl mt-5 text-sm sm:text-base font-medium ${
            title.trim() && content.trim()
              ? "bg-green-700 hover:bg-green-800"
              : "bg-gray-400 cursor-not-allowed"
          } text-white transition-all duration-200`}
        >
          <SendHorizontalIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>Post</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
