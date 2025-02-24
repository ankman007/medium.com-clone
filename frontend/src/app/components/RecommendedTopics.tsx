'use client';
import Link from 'next/link';
import React from 'react';
import { Tags } from '../../../constant/types';

const RecommendedTopics: React.FC<Tags> = ({ tags }) => {

  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Recommended Topics</h2>

      <div className="flex flex-wrap gap-3 mb-4">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="px-4 py-2 bg-gray-200 rounded-full text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-300 transition"
          >
            <Link
              href={`/tags/${tag.id}/${tag.name}`}
              className="text-inherit no-underline flex items-center gap-2 hover:text-black focus:text-black hover:no-underline focus:no-underline space-x-2" >
              {tag.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedTopics;
