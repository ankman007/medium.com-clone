'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StaffPicksSectionProps } from "../../../constant/types";

const StaffPicksSection: React.FC<StaffPicksSectionProps> = ({ articles }) => {
  return (
    <>
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Staff Picks</h2>

      <div className="space-y-6">
        {articles.map((article, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
            <Link href={`/${article.authorId}/${article.authorName}`} className="flex items-center space-x-2">
              <div className="relative w-8 h-8">
                <Image
                  src={article.authorImage}
                  alt="Description of the image"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              </div>
              <span className="text-sm text-gray-700">{article.authorName}</span>
              </Link>
            </div>

            <Link href={`/post/${article.articleId}/${article.seoSlug}`}> 
              <h3 className="text-md font-semibold text-gray-900 hover:cursor-pointer">
                {article.title}
              </h3>
            </Link>

            <span className="text-xs text-gray-500">{article.updatedAt}</span>
          </div>
        ))}
        </div>
        <Link href={`/staff-picks`}> 
              <h3 className="pt-4 text-base font-semibold text-gray-600 hover:cursor-pointer">
                See the full list
              </h3>
        </Link>
    </div>
    </>
  );
};

export default StaffPicksSection;
