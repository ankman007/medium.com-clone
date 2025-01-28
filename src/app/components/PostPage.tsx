import React from 'react';
import Image from 'next/image';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentAlt, faBookmark } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(faHeart, faCommentAlt, faBookmark);

interface PostPageProps {
  thumbnail: string;
  title: string;
  seoDescription: string;
  authorName: string;
  authorProfileImage: string;
  uploadedAt: string;
  readTime: string;
  likes: number;
  comments: number;
  isBookmarked: boolean;
  content: string;
}

const PostPage: React.FC<PostPageProps> = ({
  thumbnail,
  title,
  seoDescription,
  authorName,
  authorProfileImage,
  uploadedAt,
  readTime,
  likes,
  comments,
  isBookmarked,
  content,
}) => {
  return (
    <div className="bg-white max-w-3xl mx-auto p-6">
      {/* Article Thumbnail */}
      <div className="relative w-full h-96 mb-6">
        <Image
          src={thumbnail}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Post Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>

      {/* SEO Description */}
      <p className="text-lg text-gray-600 mb-6">{seoDescription}</p>

      {/* Author Details */}
      <div className="flex items-center space-x-6 mb-6">
        <div className="relative w-12 h-12">
          <Image
            src={authorProfileImage}
            alt={authorName}
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
            <span>{uploadedAt}</span>
          </div>
        </div>
      </div>

      {/* Engagement Section */}
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

      {/* Post Content */}
      <div
        className="text-gray-800 text-lg leading-relaxed space-y-6"
        dangerouslySetInnerHTML={{ __html: content }} // Handle the article content (HTML or markdown)
          />
          
      </div>
      
  );
};

export default PostPage;
