"use client";

import { useState } from "react";
import { ArrowLeft, SendHorizontalIcon } from "lucide-react";
import BlogTitleEditor from "./BlogTitleEditor";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useAuth } from "@clerk/nextjs";

// Dynamically import the ToastEditor component
const ToastEditor = dynamic(() => import("./ToastEditor"), {
  ssr: false, // Ensures it only runs in the client
});

const Navigation = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
 const { getToken } = useAuth();
 // Handle post creation
  const handleCreatePost = async () => {
    const token = await getToken();
    console.log(token)
    try {
      const response = await fetch("http://localhost:3000/api/post/create-a-post/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      // Check if the response is OK
      if (!response.ok) {
        // If the response does not have content, handle it accordingly
        const errorData = await response.text(); // Use .text() for non-JSON responses
        console.error("Error creating post:", errorData);
        return;
      }
      // Attempt to parse the JSON if it exists
      const postData = await response.json();
      console.log("Post created successfully:", postData);
      // Redirect or handle post creation success
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-4xl px-6 py-8 mx-auto bg-gray-50">
      {/* Back Button */}
      <div className="self-start mb-4">
        <Link href="/">
          <button className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-all duration-200">
            <ArrowLeft className="text-3xl" />
          </button>
        </Link>
      </div>

      {/* Auto-Expanding Input Section */}
      <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg w-full">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
          <BlogTitleEditor title={title} setTitle={setTitle} />
        </h1>

        {/* Editor - Now dynamically imported */}
        <ToastEditor setContent={setContent} />

        {/* Post Button */}
        <button
          onClick={handleCreatePost}
          className="flex items-center gap-2 bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl mt-5 text-sm sm:text-base font-medium hover:bg-green-800 transition-all duration-200"
        >
          <SendHorizontalIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>Post</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
