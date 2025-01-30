"use client";

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import React, { useRef } from 'react';

interface ToastEditorProps {
  initialContent?: string;
}

const ToastEditor: React.FC<ToastEditorProps> = ({ initialContent = "Write something amazing!" }) => {
  const editorRef = useRef<Editor>(null);

  return (
    <Editor
      initialValue={initialContent}
      height="600px"
      initialEditType="markdown"
      useCommandShortcut={true}
      ref={editorRef}
    />
  );
};

export default ToastEditor;
