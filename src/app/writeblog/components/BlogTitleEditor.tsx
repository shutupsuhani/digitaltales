"use client"


import React, { useState } from "react";

const BlogTitleEditor = () => {
  const [isEditing, setIsEditing] = useState(false); // state to track whether the title is being edited
  const [title, setTitle] = useState("Blog Title"); // initial title of the blog

  // Handle title click to switch to edit mode
  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false); // Save title when Enter is pressed
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          autoFocus
          className="text-2xl border-b-2 border-gray-500 focus:outline-none"
        />
      ) : (
        <h1
          onClick={handleTitleClick}
          className="text-2xl cursor-pointer"
        >
          {title}
        </h1>
      )}
    </div>
  );
};

export default BlogTitleEditor;
