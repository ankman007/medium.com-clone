"use client";
import { useEffect, useState } from "react";
import PostCard from "./components/PostCard";
import StaffPicksSection from "./components/StaffPicksSection";
import RecommendedTopics from "./components/RecommendedTopics";
import { dummyProfileImages, thumbnailImages } from "../../constant/images.";
import { getRandomimage, formatDate } from "../../utils";

interface Post {
  articleId: number;
  authorId: number;
  authorName: string;
  authorEmail: string;
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
        const token = localStorage.getItem("accessToken");

        const articlesResponse = await fetch(
          "http://localhost:8000/articles/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!articlesResponse.ok) {
          throw new Error("Failed to fetch articles");
        }

        const articlesData = await articlesResponse.json();
        const formattedArticles = (articlesData || []).map((article: any) => ({
          articleId: article.id,
          authorName: article.author_name,
          authorId: article.author_id,
          authorEmail: article.author_email,
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

        const tagsResponse = await fetch(
          "http://localhost:8000/articles/tags",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!tagsResponse.ok) {
          throw new Error("Failed to fetch tags");
        }

        const tagsData = await tagsResponse.json();
        console.log("tagData", tagsData);
        const formattedTopics = (tagsData || []).map((tag: any) => ({
          name: tag.name,
          id: tag.id,
        }));

        setPosts(formattedArticles);
        setRecommendedTopics(formattedTopics);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
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

  const staffPicksArticles = posts.slice(-3).map((post) => ({
    articleId: post.articleId,
    authorId: post.authorId,
    authorEmail: post.authorEmail,
    authorName: post.authorName,
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
                articleId={post.articleId}
                authorName={post.authorName}
                authorId={post.authorId}
                authorEmail={post.authorEmail}
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

        <div className="w-full lg:w-1/3 space-y-4">
          <StaffPicksSection articles={staffPicksArticles} />
          <RecommendedTopics tags={recommendedTopics} />
        </div>
      </div>
    </div>
  );
}
