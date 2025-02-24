"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "./components/PostCard";
import StaffPicksSection from "./components/StaffPicksSection";
import RecommendedTopics from "./components/RecommendedTopics";
import HomePage from "./components/HomePage";
import { dummyProfileImages, thumbnailImages } from "../../constant/images.";
import { getRandomImage, formatDate } from "../../utils";
import { RootState } from "./redux/store";
import { PostCardProps, Tag } from "../../constant/types";

const fetchArticles = async (
  token: string | null
): Promise<PostCardProps[]> => {
  const response = await fetch("http://localhost:8000/articles/", {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });
  if (!response.ok) throw new Error("Failed to fetch articles");

  const data = await response.json();
  return data.map(mapArticleData);
};

const fetchTags = async (token: string | null): Promise<Tag[]> => {
  const response = await fetch("http://localhost:8000/articles/tags", {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });
  if (!response.ok) throw new Error("Failed to fetch tags");

  const data = await response.json();
  return data.map(mapTagData);
};

const mapArticleData = (article: {
  id: number;
  author_name: string;
  author_id: number;
  author_email: string;
  title: string;
  seo_description: string;
  updated_at: string;
  like_count: number;
  seo_slug: string;
}): PostCardProps => ({
  articleId: article.id,
  authorName: article.author_name,
  authorId: article.author_id,
  title: article.title,
  description: article.seo_description,
  updatedAt: formatDate(article.updated_at),
  likes: article.like_count,
  comments: 0,
  isBookmarked: false,
  authorImage: getRandomImage(dummyProfileImages),
  thumbnailImage: getRandomImage(thumbnailImages),
  seoSlug: article.seo_slug,
});

const mapTagData = (tag: { id: number; name: string }): Tag => ({
  id: tag.id,
  name: tag.name,
});

export default function Home() {
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [recommendedTags, setRecommendedTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = useSelector((state: RootState) => state.auth.accessToken);
  const isLoggedIn = !!token;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [articles, tags] = await Promise.all([
          fetchArticles(token),
          fetchTags(token),
        ]);
        setPosts(articles);
        setRecommendedTags(tags);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const staffPicksArticles = posts.slice(-3).map((post) => ({
    articleId: post.articleId,
    authorId: post.authorId,
    authorName: post.authorName,
    authorImage: getRandomImage(dummyProfileImages),
    title: post.title,
    updatedAt: post.updatedAt,
    seoSlug: post.seoSlug,
  }));

  return (
    <div>
      {isLoggedIn ? (
        <div className="flex flex-col lg:flex-row px-4 lg:px-8 py-8 gap-8">
          <div className="flex-grow space-y-6">
            {posts.map((post) => (
              <div key={post.articleId}>
                <PostCard {...post} />
                <hr />
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/3 space-y-4">
            <StaffPicksSection articles={staffPicksArticles} />
            <RecommendedTopics tags={recommendedTags} />
          </div>
        </div>
      ) : (
        <HomePage />
      )}
    </div>
  );
}
