'use client';
import { useEffect, useState } from 'react';
import PostCard from './components/PostCard';
import RecommendedPostsSection from './components/RecommendedPostsSection';
import RecommendedTopics from './components/RecommendedTopics';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [recommendedTopics, setRecommendedTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken');

        // Fetch articles
        const articlesResponse = await fetch('http://localhost:8000/articles/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const articlesData = await articlesResponse.json();
        const formattedArticles = articlesData.map(article => ({
          author: article.author,
          title: article.title,
          description: article.seo_description,
          image: '/dummy-image.jpg', // Use dummy image for now
          updatedAt: article.updated_at,
          likes: article.like_count,
          comments: 0, // You can update this when the comment count API is ready
          isBookmarked: false,
        }));

        // Fetch tags for recommended topics
        const tagsResponse = await fetch('http://localhost:8000/articles/tags', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const tagsData = await tagsResponse.json();
        const formattedTopics = tagsData.map(tag => ({
          name: tag.name,
        }));

        setPosts(formattedArticles);
        setRecommendedTopics(formattedTopics);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row px-4 lg:px-8 py-8 gap-8">
        <div className="flex-grow space-y-6">
          {posts.map((post, index) => (
            <div key={index}>
              <PostCard
                author={post.author}
                authorImage="/dummy-profile.jpg" // Dummy profile image for now
                title={post.title}
                description={post.description}
                image={post.image}
                updatedAt={post.updatedAt}
                likes={post.likes}
                comments={post.comments}
                isBookmarked={post.isBookmarked}
              />
              <hr />
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/3 space-y-8">
          {/* Recommended Posts Section: Display the top 3 articles */}
          <RecommendedPostsSection articles={posts.slice(0, 3)} />

          {/* Recommended Topics Section */}
          <RecommendedTopics topics={recommendedTopics} />
        </div>
      </div>
    </div>
  );
}
