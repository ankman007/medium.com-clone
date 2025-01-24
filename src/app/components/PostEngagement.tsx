import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentAlt, faBookmark, faFlag } from '@fortawesome/free-solid-svg-icons';

interface PostEngagementProps {
  updatedAt: string;
  likes: number;
  comments: number;
  isBookmarked: boolean;
}

const PostEngagement: React.FC<PostEngagementProps> = ({ updatedAt, likes, comments, isBookmarked }) => {
  return (
    <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
      {/* Left section - Date/Time, Likes, Comments */}
      <div className="flex items-center space-x-4">
        {/* Date/Time */}
        <span>{updatedAt}</span>

        {/* Likes */}
        <div className="flex items-center space-x-1 cursor-pointer">
          <FontAwesomeIcon icon={faHeart} className="text-red-500" />
          <span>{likes}</span>
        </div>

        {/* Comments */}
        <div className="flex items-center space-x-1 cursor-pointer">
          <FontAwesomeIcon icon={faCommentAlt} className="text-gray-500" />
          <span>{comments}</span>
        </div>
      </div>

      {/* Right section - Bookmark, Report */}
      <div className="flex items-center space-x-4">
        {/* Bookmark */}
        <div className="cursor-pointer">
          <FontAwesomeIcon icon={faBookmark} className={isBookmarked ? "text-yellow-500" : "text-gray-500"} />
        </div>

        {/* Report */}
        <div className="cursor-pointer">
          <FontAwesomeIcon icon={faFlag} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default PostEngagement;
