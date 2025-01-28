import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCommentAlt, faBookmark, faFlag } from "@fortawesome/free-solid-svg-icons";

interface PostCardProps {
  author: string;
  authorImage: string;
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
  authorImage,
  title,
  description,
  image,
  updatedAt,
  likes,
  comments,
  isBookmarked,
}) => {
  return (
    <div className="bg-white border rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col justify-between flex-1">
          <div className="flex items-center space-x-3">
            <Image
              src={authorImage}
              alt={author}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="text-gray-600 text-sm font-medium">{author}</span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-2">{title}</h2>
          <p className="text-gray-700 text-sm line-clamp-3">{description}</p>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>{updatedAt}</span>

              <div className="flex items-center space-x-1 cursor-pointer">
                <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                <span>{likes}</span>
              </div>

              <div className="flex items-center space-x-1 cursor-pointer">
                <FontAwesomeIcon icon={faCommentAlt} className="text-gray-500" />
                <span>{comments}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="cursor-pointer">
                <FontAwesomeIcon icon={faBookmark} className={isBookmarked ? "text-yellow-500" : "text-gray-500"} />
              </div>
              <div className="cursor-pointer">
                <FontAwesomeIcon icon={faFlag} className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {image && (
          <div className="w-full md:w-48 h-48 ml-0 md:ml-6 mt-4 md:mt-0 flex-shrink-0 relative">
            <Image
              src={image}
              alt="Post"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
