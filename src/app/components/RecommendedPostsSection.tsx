import React from "react";
import Image from "next/image";

interface Article {
  authorName: string;
  authorProfileImage: string;
  postTitle: string;
  uploadedAt: string;
}

interface RecommendedPostsSectionProps {
  articles: Article[];
}

const RecommendedPostsSection: React.FC<RecommendedPostsSectionProps> = ({ articles }) => {
  return (
    <div className="bg-white rounded-lg p-4">
      {/* Title */}
      <h2 className="text-lg font-bold text-gray-900 mb-4">Recommended Posts</h2>

      {/* List of Articles */}
      <div className="space-y-6">
        {articles.map((article, index) => (
          <div key={index} className="flex flex-col space-y-2">
            {/* Author Section */}
            <div className="flex items-center space-x-2">
              <div className="relative w-8 h-8">
                <Image
                  src={article.authorProfileImage}
                  alt={article.authorName}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              </div>
              <span className="text-sm text-gray-700">{article.authorName}</span>
            </div>

            {/* Post Title */}
            <h3 className="text-md font-semibold text-gray-900">{article.postTitle}</h3>

            {/* Uploaded Time */}
            <span className="text-xs text-gray-500">{article.uploadedAt}</span>
          </div>
        ))}
      </div>

      {/* See Full List Link */}
      {/* <div className="mt-4">
        <a href="#" className="text-blue-500 hover:underline text-sm">
          See full list
        </a>
      </div> */}
    </div>
  );
};

export default RecommendedPostsSection;
