// BlogTitleEditor.tsx
"use client";

import React, { useState } from "react";

interface BlogTitleEditorProps {
  title: string;
  setTitle: (title: string) => void;
}

const BlogTitleEditor = ({ title, setTitle }: BlogTitleEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setIsEditing(false); // Save title when Enter is pressed
    }
  };

  return (
    <div className="flex items-center justify-center h-8">
      {isEditing ? (
        <input
          type="text"
          value={title}
          required
          onChange={handleTitleChange}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          autoFocus
          className="text-2xl border-b-2 border-gray-500 focus:outline-none"
        />
      ) : (
        <h1 onClick={handleTitleClick} className="text-2xl cursor-pointer">
          {title}
        </h1>
      )}
    </div>
  );
};

export default BlogTitleEditor;
