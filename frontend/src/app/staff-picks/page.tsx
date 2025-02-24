"use client";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { formatDate, getRandomImage } from "../../../utils";
import { dummyProfileImages, thumbnailImages } from "../../../constant/images.";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { PostCardProps } from "../../../constant/types"; 

export default function RecommendedPostsPage() {
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

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

        const formattedArticles: PostCardProps[] = articlesData.map(
          (article: {
            id: number;
            author_id: number;
            author_name: string;
            author_email: string;
            title: string;
            seo_description: string;
            updated_at: string;
            like_count: number;
            seo_slug: string;
          }) => ({
            articleId: article.id,
            authorId: Number(article.author_id),
            authorName: article.author_name,
            authorEmail: article.author_email,
            title: article.title,
            description: article.seo_description,
            updatedAt: formatDate(article.updated_at),
            likes: article.like_count,
            comments: 0,
            isBookmarked: false,
            authorImage: getRandomImage(dummyProfileImages),
            image: getRandomImage(thumbnailImages),
            seoSlug: article.seo_slug,
          })
        );

        setPosts(formattedArticles);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Staff picks
          <span className="block text-lg font-normal text-gray-500 mt-2">
            Stories from across DevFlow, hand-selected by our team.
          </span>
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow space-y-6">
            {posts.map((post) => (
              <div key={post.articleId}>
                <PostCard {...post} />
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
