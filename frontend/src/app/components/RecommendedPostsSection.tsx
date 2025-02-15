'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Article {
  authorName: string;
  authorProfileImage: string;
  postTitle: string;
  uploadedAt: string;
  seoSlug: string;
}

interface RecommendedPostsSectionProps {
  articles: Article[];
}

const RecommendedPostsSection: React.FC<RecommendedPostsSectionProps> = ({ articles }) => {
  return (
    <>
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Recommended Posts</h2>

      <div className="space-y-6">
        {articles.map((article, index) => (
          <div key={index} className="flex flex-col space-y-2">
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

            <Link href={`/post/${article.seoSlug}`}> 
              <h3 className="text-md font-semibold text-gray-900 hover:cursor-pointer">
                {article.postTitle}
              </h3>
            </Link>

            <span className="text-xs text-gray-500">{article.uploadedAt}</span>
          </div>
        ))}
        </div>
    </div>
    </>
  );
};

export default RecommendedPostsSection;
