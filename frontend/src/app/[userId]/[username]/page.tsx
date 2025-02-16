"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { dummyProfileImages, thumbnailImages } from "../../../../constant/images.";
import { formatDate, getRandomimage, capitalize } from "../../../../utils";
import PostCard from "@/app/components/PostCard";

interface Post {
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

export default function TagsPages() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId, username } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");

        const articlesResponse = await fetch(
          `http://localhost:8000/articles/users/${userId}`,
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
          authorId: article.author_id,
          authorName: article.author_name,
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

        setPosts(formattedArticles);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {capitalize(username)} 
          <span className="block text-lg font-normal text-gray-500 mt-2">
            All posts from {capitalize(username)}.
          </span>
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow space-y-6">
            {posts.map((post, index) => (
              <div key={post.title + index}>
                <PostCard
                  authorId={post.authorId}
                  authorName={post.authorName}
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
        </div>
      </div>
    </div>
  );
}
