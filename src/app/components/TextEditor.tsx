"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Dynamically import Editor to prevent SSR issues
const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });

const RichTextEditor: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [previewMode, setPreviewMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  // Handle editor state change
  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
    const content = newState.getCurrentContent().getPlainText();
    setWordCount(content.split(/\s+/).filter((word) => word.length > 0).length);
    setCharCount(content.length);
  };

  // Autosave draft every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveDraft();
    }, 10000);
    return () => clearInterval(interval);
  }, [editorState, title, description]);

  // Save draft to localStorage or API
  const saveDraft = () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const blogData = { title, description, content: JSON.stringify(rawContent) };
    console.log("Draft Saved:", blogData);
    localStorage.setItem("draft", JSON.stringify(blogData)); // Simulate backend save
  };

  // Publish Blog (Send to Backend)
  const publishBlog = () => {
    saveDraft();
    console.log("Blog Published!");
    // Send blogData to FastAPI
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <button onClick={() => setPreviewMode(!previewMode)}>
          👁 {previewMode ? "Edit" : "Preview"}
        </button>
      </div>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
      />

      {previewMode ? (
        <div className="preview">
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="preview-content">
            {editorState.getCurrentContent().getPlainText()}
          </div>
        </div>
      ) : (
        <Editor
          editorState={editorState}
                      onEditorStateChange={onEditorStateChange}
            placeholder="Write your content here..." 
          toolbar={{
            options: ["inline", "blockType", "list", "textAlign", "colorPicker", "link", "emoji", "image", "history"],
            inline: { options: ["bold", "italic", "underline", "strikethrough", "monospace", "superscript", "subscript"] },
            blockType: { options: ["Normal", "H1", "H2", "H3", "Blockquote", "Code"] },
            list: { options: ["unordered", "ordered"] },
            textAlign: { options: ["left", "center", "right", "justify"] },
            image: {
              uploadCallback: (file) =>
                new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.onloadend = () => resolve({ data: { link: reader.result } });
                  reader.readAsDataURL(file);
                }),
              previewImage: true,
            },
          }}
          editorClassName="editor-content"
          wrapperClassName="editor-wrapper"
          toolbarClassName="toolbar"
        />
      )}

      <div className="footer">
        <p>Words: {wordCount} | Characters: {charCount}</p>
        <div className="buttons">
          <button onClick={saveDraft} className="save-btn">Save Draft</button>
          <button onClick={publishBlog} className="publish-btn">Publish</button>
        </div>
      </div>

      <style jsx>{`
        .editor-container {
          border: none;
          padding: 20px;
          background: white;
          max-width: 800px;
          margin: auto;
        }
        .editor-header {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 10px;
        }
        .editor-header button {
          background: none;
          border: none;
          font-size: 14px;
          cursor: pointer;
        }
        .title-input, .description-input {
          width: 100%;
          font-size: 18px;
          border: none;
          outline: none;
          padding: 10px;
          margin-bottom: 10px;
        }
        .title-input {
          font-size: 28px;
          font-weight: bold;
        }
        .description-input {
          resize: none;
          height: 50px;
        }
        .editor-wrapper {
          border: none;
          background: white;
        }
        .editor-content {
          min-height: 400px;
          padding: 10px;
          font-size: 18px;
          font-family: Georgia, serif;
        }
        .preview {
          background: #f5f5f5;
          padding: 20px;
          border-radius: 5px;
        }
        .preview-content {
          white-space: pre-wrap;
        }
        .toolbar {
          border: none;
          background: white;
        }
        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
        }
        .buttons {
          display: flex;
          gap: 10px;
        }
        .save-btn, .publish-btn {
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .save-btn {
          background: grey;
          color: white;
        }
        .publish-btn {
          background: black;
          color: white;
        }
        .save-btn:hover, .publish-btn:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
