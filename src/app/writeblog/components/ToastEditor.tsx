// ToastEditor.tsx
"use client";

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import React, { useRef, useEffect } from 'react';

interface ToastEditorProps {
  initialContent?: string;
  setContent: (content: string) => void; 
}

const ToastEditor: React.FC<ToastEditorProps> = ({ initialContent = "Write something amazing!", setContent }) => {
  const editorRef = useRef<Editor>(null);

  // Update content in the parent component whenever the editor content changes
  const handleSave = () => {
    if (editorRef.current) {
      const content = editorRef.current.getInstance().getMarkdown(); // You can also use getHTML() for HTML content
      setContent(content);
    }
  };

  // Update editor content when initialContent changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown(initialContent); // Update markdown content
    }
  }, [initialContent]);

  return (
    <div>
      <Editor
        initialValue={initialContent}
        height="600px"
        required
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={editorRef}
      />
      <button onClick={handleSave} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Save Content
      </button>
    </div>
  );
};

export default ToastEditor;
