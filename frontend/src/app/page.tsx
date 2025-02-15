'use client';
import { useEffect, useState } from 'react';
import PostCard from './components/PostCard';
import RecommendedPostsSection from './components/RecommendedPostsSection';
import RecommendedTopics from './components/RecommendedTopics';
import { dummyProfileImages, thumbnailImages } from '../../constant/images.';
import { getRandomimage, formatDate } from '../../utils';

interface Post {
  author: string;
  title: string;
  description: string;
  updatedAt: string;
  likes: number;
  comments: number;
  isBookmarked: boolean;
  authorImage: string;
  thumbnailImage: string;
  seoSlug: string;
}

interface Topic {
  name: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [recommendedTopics, setRecommendedTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken');

        const articlesResponse = await fetch('http://localhost:8000/articles/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!articlesResponse.ok) {
          throw new Error('Failed to fetch articles');
        }

        const articlesData = await articlesResponse.json();
        const formattedArticles = (articlesData || []).map((article: any) => ({
          author: article.author,
          title: article.title,
          description: article.seo_description,
          updatedAt: formatDate(article.updated_at),
          likes: article.like_count,
          comments: 0, 
          isBookmarked: false,
          authorImage: getRandomimage(dummyProfileImages),
          thumbnailImage: getRandomimage(thumbnailImages),
          seoSlug: article.seo_slug,
        }));

        const tagsResponse = await fetch('http://localhost:8000/articles/tags', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!tagsResponse.ok) {
          throw new Error('Failed to fetch tags');
        }

        const tagsData = await tagsResponse.json();
        const formattedTopics = (tagsData || []).map((tag: any) => ({
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

  const recommendedArticles = posts.slice(-3).map((post) => ({
    authorName: post.author,
    authorProfileImage: getRandomimage(dummyProfileImages),
    postTitle: post.title,
    uploadedAt: post.updatedAt,
    seoSlug: post.seoSlug,
  }));

  return (
    <div>
      <div className="flex flex-col lg:flex-row px-4 lg:px-8 py-8 gap-8">
        <div className="flex-grow space-y-6">
          {posts.map((post, index) => (
            <div key={post.title + index}>
              <PostCard
                author={post.author}
                authorImage={post.authorImage}
                title={post.title}
                description={post.description}
                image={post.thumbnailImage}
                updatedAt={post.updatedAt}
                likes={post.likes}
                comments={post.comments}
                isBookmarked={post.isBookmarked}
                seoSlug={post.seoSlug}
              />
              <hr />
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/3 space-y-8">
          <RecommendedPostsSection articles={recommendedArticles} />
          <RecommendedTopics topics={recommendedTopics} />
        </div>
      </div>
    </div>
  );
}
