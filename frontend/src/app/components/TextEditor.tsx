import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import CodeBlock from "@tiptap/extension-code-block";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlogPublishSkeleton from "../skeletons/BlogPublishSkeleton";
import {
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faHeading,
  faQuoteLeft,
  faListUl,
  faListOl,
  faCode,
  faLink,
  faImage,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faUndo,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchWithAuth } from "../../../utils";
import { apiBaseURL } from "../../../constant/api";
import { AppDispatch, RootState } from "../redux/store";
import { setUserPosts } from "../redux/slices/userPostSlice";

const fetchUserPosts = async (token: string, userId: string) => {
  try {
    const response = await fetchWithAuth(`${apiBaseURL}/articles/users/${userId}/`, {
      method: "GET",
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
    if (!response.ok) throw new Error("Failed to get user's articles.");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return null;
  }
};

export default function BlogEditor() {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const userId = useSelector((state: RootState) => state.user.id);

  const [title, setTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null); 
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null); 
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      Heading.configure({ levels: [1, 2, 3] }),
      Blockquote,
      BulletList,
      OrderedList,
      ListItem,
      CodeBlock,
      Link.configure({ openOnClick: true }),
      Image.configure({ allowBase64: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
  });

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      console.log("Selected file:", file);
      console.log("File type:", file.type);
  
      setThumbnail(file);
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!editor) return; 
    const tags = 1;
  
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("seo_description", seoDescription);
      formData.append("content", editor.getHTML());
      formData.append("tags", JSON.stringify(tags));
  
      if (thumbnail) {
        console.log("Appending file to FormData:", thumbnail);
        formData.append("thumbnail", thumbnail);
      }
  
      const response = await fetchWithAuth(`${apiBaseURL}articles/create/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error:", errorText);
        return;
      }
  
      const data = await response.json();
      console.log("Server Response:", data);
      
      if (token && userId) {
        const updatedPosts = await fetchUserPosts(token, userId);
        if (updatedPosts) {
          dispatch(setUserPosts(updatedPosts));
        }
      }

      const { id, seo_slug } = data;
      const newPath = `/post/${id}/${seo_slug}/`;
      window.location.href = newPath;
  
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };
  

  if (!editor) return <BlogPublishSkeleton />;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white text-black rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create a New Blog Post</h2>
      <input
        type="text"
        placeholder="Enter blog title"
        className="w-full p-2 mb-4 border border-gray-700 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter SEO description for the blog"
        className="w-full p-2 mb-4 border border-gray-700 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
        value={seoDescription}
        onChange={(e) => setSeoDescription(e.target.value)}
      />
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="mb-2"
        />
        {thumbnailPreview && (
          <img src={thumbnailPreview} alt="Thumbnail Preview" className="w-32 h-32 object-cover" />
        )}
      </div>
      <div className="mb-2 flex flex-wrap gap-2 bg-gray-300 p-2 rounded">
        {[faBold, faItalic, faUnderline, faStrikethrough, faHeading, faQuoteLeft, faListUl, faListOl, faCode, faImage, faLink, faAlignLeft, faAlignCenter, faAlignRight, faUndo, faRedo].map((icon, index) => (
          <button
            key={index}
            onClick={() => {
              switch (icon) {
                case faBold:
                  editor.chain().focus().toggleBold().run();
                  break;
                case faItalic:
                  editor.chain().focus().toggleItalic().run();
                  break;
                case faUnderline:
                  editor.chain().focus().toggleUnderline().run();
                  break;
                case faStrikethrough:
                  editor.chain().focus().toggleStrike().run();
                  break;
                case faHeading:
                  editor.chain().focus().toggleHeading({ level: index < 5 ? (index === 4 ? 1 : 2) : 1 }).run();
                  break;
                case faQuoteLeft:
                  editor.chain().focus().toggleBlockquote().run();
                  break;
                case faListUl:
                  editor.chain().focus().toggleBulletList().run();
                  break;
                case faListOl:
                  editor.chain().focus().toggleOrderedList().run();
                  break;
                case faCode:
                  editor.chain().focus().toggleCodeBlock().run();
                  break;
                case faImage:
                  const url = prompt("Enter image URL:");
                  if (url) editor.chain().focus().setImage({ src: url }).run();
                  break;
                case faLink:
                  const linkUrl = prompt("Enter link URL:");
                  if (linkUrl) editor.chain().focus().setLink({ href: linkUrl }).run();
                  break;
                case faAlignLeft:
                  editor.chain().focus().setTextAlign("left").run();
                  break;
                case faAlignCenter:
                  editor.chain().focus().setTextAlign("center").run();
                  break;
                case faAlignRight:
                  editor.chain().focus().setTextAlign("right").run();
                  break;
                case faUndo:
                  editor.chain().focus().undo().run();
                  break;
                case faRedo:
                  editor.chain().focus().redo().run();
                  break;
              }
            }}
            className="editor-btn bg-gray-700 hover:bg-gray-600 text-white rounded p-2"
          >
            <FontAwesomeIcon icon={icon} />
            {icon === faHeading && index < 2 ? index + 1 : ""}
          </button>
        ))}
      </div>
      <div className="border border-gray-700 rounded p-2 bg-white text-black min-h-[200px] focus:outline-none">
        <EditorContent editor={editor} />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full mt-4 bg-black text-white rounded-full py-2 px-4 hover:bg-gray-800"
      >
        Publish Blog
      </button>
    </div>
  );
}
