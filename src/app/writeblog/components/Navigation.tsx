// Navigation.tsx
"use client";

import { useState } from "react";
import { ArrowLeft, SendHorizontalIcon } from "lucide-react";
import BlogTitleEditor from "./BlogTitleEditor";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../utils/db"; 
import { Blogs } from "../../../utils/schema"; 

// Dynamically import the ToastEditor component
const ToastEditor = dynamic(() => import("./ToastEditor"), {
  ssr: false, // Ensures it only runs in the client
});

const Navigation = () => {
  const [title, setTitle] = useState<string>("Blog Title");
  const [content, setContent] = useState<string>("");
  const { isLoaded, user } = useUser();

  const handleCreatePost = async () => {
    if (!isLoaded || !user) {
      alert("You must be logged in to post.");
      return;
    }

    // Ensure both title and content are not empty
    if (!title.trim() || !content.trim()) {
      alert("Both title and content are required.");
      return;
    }

    // Prepare post data
    const postData = {
      title,
      content,
      createdBy: user.primaryEmailAddress?.emailAddress || "Anonymous",
      createdAt: new Date().toISOString(),
    };

    try {
      // Insert post into the database
      await db.insert(Blogs).values(postData);
      alert("Post created successfully!");
      setTitle(""); // Clear the title
      setContent(""); // Clear the content
    } catch (error) {
      console.error("Error saving the post:", error);
      alert("Error saving the post. Please try again.");
    }
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
