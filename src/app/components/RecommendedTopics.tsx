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
      {/* Title */}
      <h2 className="text-lg font-bold text-gray-900 mb-4">Recommended Topics</h2>

      {/* List of Topic Bubbles */}
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

      {/* See More Topics Link */}
      <div className="mt-4">
        <a href="#" className="text-blue-500 hover:underline text-sm">
          See more topics
        </a>
      </div>
    </div>
  );
};

export default RecommendedTopics;
