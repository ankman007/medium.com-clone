'use client';
import React from 'react';
import Image from 'next/image';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentAlt, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { PostDetailProps } from '../../../constant/types';

library.add(faHeart, faCommentAlt, faBookmark);
const PostPage: React.FC<PostDetailProps> = ({
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
        
        <div className="flex items-center space-x-2 cursor-pointer">
          <FontAwesomeIcon icon={faHeart} className="text-red-500" />
          <span>{likes}</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <FontAwesomeIcon icon={faCommentAlt} className="text-gray-500" />
          <span>{comments}</span>
        </div>
        <div className="cursor-pointer">
          <FontAwesomeIcon icon={faBookmark} className={isBookmarked ? "text-yellow-500" : "text-gray-500"} />
        </div>
      </div>

      <div
        className="text-gray-800 text-lg leading-relaxed space-y-6"
        dangerouslySetInnerHTML={{ __html: content }}
          />
          
      </div>
      
  );
};

export default PostPage;
