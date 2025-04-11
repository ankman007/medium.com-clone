"use client";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCommentAlt,
  faBookmark,
  faFlag,
  faPenToSquare,
  faTrash,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { PostCardProps } from "../../../constant/types";

const PostCard: React.FC<PostCardProps> = ({
  authorId,
  authorName,
  authorImage,
  title,
  description,
  thumbnailImage,
  updatedAt,
  likes = 0,
  comments = 0,
  seoSlug,
  articleId,
  isBookmarked = false,
  isOwnPost = false,
}) => {
  return (
    <div className="bg-white border rounded-lg p-4 mb-6 relative">
      {isOwnPost && (
        <div className="flex space-x-2 mb-3 justify-end gap-2">
          <button onClick={() => console.log("Link share logic here")}>
          <FontAwesomeIcon
              icon={faLink}
              className="text-green-600 hover:text-green-700 cursor-pointer"
              title="Edit"
            />
          </button>
          <Link href={`/edit/${articleId}`}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-blue-500 hover:text-blue-600 cursor-pointer"
              title="Edit"
            />
          </Link>
          <button onClick={() => console.log("Delete logic here")}>
            <FontAwesomeIcon
              icon={faTrash}
              className="text-red-600 hover:text-red-700 cursor-pointer"
              title="Delete"
            />
          </button>
        </div>
      )}
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col justify-between flex-1">
          <div className="flex items-center space-x-3">
            <Link
              href={`/${authorId}/${authorName}`}
              className="flex items-center space-x-2"
            >
              <div
                style={{ position: "relative", width: "40px", height: "40px" }}
              >
                <Image
                  src={authorImage}
                  alt="3"
                  style={{ objectFit: "cover" }}
                  className="rounded-full object-cover"
                  unoptimized
                  fill
                />
              </div>
              <span className="text-gray-600 text-sm font-medium">
                {authorName}
              </span>
            </Link>
          </div>
          <Link href={`/post/${articleId}/${seoSlug}`}>
            <h2 className="text-xl font-bold text-gray-900 mt-2 hover:cursor-pointer">
              {title}
            </h2>
          </Link>
          <p className="text-gray-700 text-sm line-clamp-3">{description}</p>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>{updatedAt}</span>

              <div className="flex items-center space-x-1 cursor-pointer">
                <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                <span>{likes}</span>
              </div>

              <div className="flex items-center space-x-1 cursor-pointer">
                <FontAwesomeIcon
                  icon={faCommentAlt}
                  className="text-gray-500"
                />
                <span>{comments}</span>
              </div>
            </div>
            {!isOwnPost && (
              <div className="flex items-center space-x-4">
                <div className="cursor-pointer">
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className={
                      isBookmarked ? "text-yellow-500" : "text-gray-500"
                    }
                  />
                </div>
                <div className="cursor-pointer">
                  <FontAwesomeIcon icon={faFlag} className="text-gray-500" />
                </div>
              </div>
            )}
          </div>
        </div>

        {thumbnailImage && (
          <div className="w-full md:w-48 h-48 ml-0 md:ml-6 mt-4 md:mt-0 flex-shrink-0 relative">
            <Image
              src={thumbnailImage}
              alt="4"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              fill
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
