import React from "react";
import Image from "next/image";
import PostEngagement from "./PostEngagement";

interface PostCardProps {
  author: string;
  title: string;
  description: string;
  image: string;
  updatedAt: string;
  likes: number;
  comments: number;
  isBookmarked: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  author,
  title,
  description,
  image,
  updatedAt,
  likes,
  comments,
  isBookmarked,
}) => {
  return (
    <div className="bg-white rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center">
        {/* Left Section - Post Details */}
        <div className="flex flex-col space-y-2 max-w-md">
          <span className="text-gray-600 text-sm">{author}</span>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <p className="text-gray-700 text-sm">{description}</p>
          <PostEngagement
            updatedAt={updatedAt}
            likes={likes}
            comments={comments}
            isBookmarked={isBookmarked}
          />
        </div>

        {/* Right Section - Post Image */}
        <div className="w-24 h-24 ml-4 flex-shrink-0 relative">
          <Image
            src={image}
            alt="Post"
            width={96} // 24 * 4 (tailwind units converted to pixels)
            height={96}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
