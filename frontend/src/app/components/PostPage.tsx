'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentAlt, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { PostDetailProps } from '../../../constant/types';
import { apiBaseURL } from '../../../constant/api';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import CommentSection from './CommentSection';
import { fetchWithAuth } from '../../../utils';

library.add(faHeart, faCommentAlt, faBookmark);

type Comment = {
  id: number;
  username: string;
  userId: number;
  commentContent: string;
  createdAt: string;
}

const postComment = async (token: string | null, newComment: string, articleId: number) => {
  try {
    const response = await fetchWithAuth(`${apiBaseURL}/articles/${articleId}/comment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ comment_content: newComment }),
    });

    if (!response.ok) {
      throw new Error("Failed to post comment");
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting comment:", error);
    return null;
  }
};

const toggleLike = async (token: string | null, articleId: number) => {
  try {
    const response = await fetchWithAuth(`${apiBaseURL}/articles/${articleId}/like/`, {
      method: 'POST',
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });

    if (!response.ok) {
      throw new Error("Failed to toggle like");
    }

    return await response.json();
  } catch (error) {
    console.error("Error toggling like:", error);
    return null;
  }
};

const listComments = async (articleId: number): Promise<Comment[]> => {
  try {
    const response = await fetchWithAuth(`${apiBaseURL}/articles/${articleId}/list-comments/`);
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

const PostPage: React.FC<PostDetailProps> = ({
  articleId,
  title,
  description,
  authorName,
  updatedAt,
  likes,
  comments,
  isBookmarked,
  content,
  thumbnailImage = "/thumbnail-1.jpg",
  authorImage = "/dummy-profile-1.jpg",
  readTime = "3 min",
}) => {
  const [newComment, setNewComment] = useState("");
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);
  const token = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await listComments(articleId);
      setCommentsList(fetchedComments);
    };

    fetchComments();
  }, [articleId]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const response = await postComment(token, newComment, articleId);
      if (response) {
        setCommentsList((prevComments) => [
          ...prevComments,
          {
            id: response.id,
            username: "You", // Placeholder, replace with actual user data
            userId: 0, // Placeholder, replace with actual user ID
            commentContent: newComment,
            createdAt: new Date().toISOString(),
          },
        ]);
        setNewComment("");
      }
    }
  };

  const handleToggleLike = async () => {
    const response = await toggleLike(token, articleId);
    if (response) {
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
      setIsLiked(!isLiked);
    }
  };

  return (
    <div className="bg-white max-w-3xl mx-auto p-6">
      <div className="relative w-full h-96 mb-6">
        <Image
          src={thumbnailImage}
          alt="Description of the image"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>

      <p className="text-lg text-gray-600 mb-6">{description}</p>

      <div className="flex items-center space-x-6 mb-6">
        <div className="relative w-12 h-12">
          <Image
            src={authorImage}
            alt="Description of the image"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <span className="text-lg font-semibold text-gray-900">{authorName}</span>
          <div className="text-sm text-gray-600">
            <span className="cursor-pointer text-blue-500 hover:underline">Follow</span> ·
            <span className="mx-2">{readTime} read</span> ·
            <span>{updatedAt}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6 mb-6">
        <button className="flex items-center space-x-2 cursor-pointer" onClick={handleToggleLike}>
          <FontAwesomeIcon icon={faHeart} className={isLiked ? "text-red-500" : "text-gray-500"} />
          <span>{likeCount}</span>
        </button>
        <div className="flex items-center space-x-2 cursor-pointer">
          <FontAwesomeIcon icon={faCommentAlt} className="text-gray-500" />
          <span>{commentsList.length}</span>
        </div>
        <div className="cursor-pointer">
          <FontAwesomeIcon icon={faBookmark} className={isBookmarked ? "text-yellow-500" : "text-gray-500"} />
        </div>
      </div>

      <div className="text-gray-800 text-lg leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: content }} />

      <div className="mt-8 border-t pt-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Comments</h2>
        <div className="space-y-4">
          {commentsList.map((comment) => (
            <CommentSection
              key={comment.id}
              profilePicture='/dummy-profile.jpg'
              name={comment.username}
              date={new Date(comment.createdAt).toLocaleDateString()}
              content={comment.commentContent}
            />
          ))}
        </div>

        <form onSubmit={handleCommentSubmit} className="mt-6">
          <input
            type="text"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="mt-3 w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostPage;
