'use client';
import React from 'react';

interface Topic {
  name: string;
}

interface RecommendedTopicsProps {
  topics: Topic[];
}

const RecommendedTopics: React.FC<RecommendedTopicsProps> = ({ topics }) => {
  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Recommended Topics</h2>

      <div className="flex flex-wrap gap-3 mb-4">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="px-4 py-2 bg-gray-200 rounded-full text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-300 transition"
          >
            {topic.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedTopics;
