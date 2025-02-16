"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { formatDate, getRandomimage, capitalize } from "../../../../../utils";
import { dummyProfileImages, thumbnailImages } from "../../../../../constant/images.";
import PostCard from "@/app/components/PostCard";

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

export default function TagsPages() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tagName, tagId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");

        const articlesResponse = await fetch(
          `http://localhost:8000/articles/tags/${tagId}`,
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

        setPosts(formattedArticles);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tagName, tagId]);

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
          {capitalize(tagName)} 
          {/* <span className="block text-lg font-normal text-gray-500 mt-2">
            Handpicked stories about {tagName} from DevFlow.
          </span> */}
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
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
        </div>
      </div>
    </div>
  );
}
