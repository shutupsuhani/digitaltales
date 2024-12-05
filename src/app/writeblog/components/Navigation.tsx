"use client";

import { ArrowLeft,SendHorizontalIcon } from "lucide-react";
import React, { useRef } from "react";
import BlogTitleEditor from "./BlogTitleEditor";
import Link from "next/link";

const Navigation = () => {
    const textareaRef = useRef(null);

    const handleInput = () => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto"; // Reset height to recalculate
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl px-6 py-8 mx-auto bg-gray-50">
            {/* Back Button */}
            <div className="self-start mb-4">
              <Link href='/'> <button className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-all duration-200">
                    <ArrowLeft className="text-3xl" />
                    
                </button></Link> 
            </div>

        

            {/* Auto-Expanding Input Section */}
            <div className="w-full flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 ">
                    <BlogTitleEditor />
                </h1>
                
                <textarea
                    ref={textareaRef}
                    onInput={handleInput}
                    placeholder="Write here..."
                    className="w-full min-h-[120px] p-4 text-lg text-gray-700 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />

                <button className="flex bg-green-700 text-white w-36 h-10 text-center justify-center rounded-xl items-center mt-5">
                    <SendHorizontalIcon/>
                    <span>Post</span>
                </button>
            </div>
        </div>
    );
};

export default Navigation;
