"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { formatDate, getRandomImage, capitalize } from "../../../../../utils";
import { dummyProfileImages, thumbnailImages } from "../../../../../constant/images.";
import PostCard from "@/app/components/PostCard";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { PostCardProps } from "../../../../../constant/types";
import withAuth from "@/app/hoc/withAuth";
import { fetchWithAuth } from "../../../../../utils";

function TagsPages() {
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tagName, tagId } = useParams();
  const token = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const articlesResponse = await fetchWithAuth(
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
        const formattedArticles = (articlesData || []).map((article: { id: number, author_id: number; author_name: string; author_email: string; title: string; seo_description: string; updated_at: string; like_count: number; seo_slug: string; }) => ({
          authorId: article.author_id,
          articleId: article.id,
          authorName: article.author_name,
          authorEmail: article.author_email,
          title: article.title,
          description: article.seo_description,
          updatedAt: formatDate(article.updated_at),
          likes: article.like_count,
          comments: 0,
          isBookmarked: false,
          authorImage: getRandomImage(dummyProfileImages),
          thumbnailImage: getRandomImage(thumbnailImages),
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
  }, [tagName, tagId, token]);

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
          {tagName ? capitalize(tagName as string) : ""} 
          {/* <span className="block text-lg font-normal text-gray-500 mt-2">
            Handpicked stories about {tagName} from DevFlow.
          </span> */}
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow space-y-6">
            {posts.map((post, index) => (
              <div key={post.title + index}>
                <PostCard
                  authorId={post.authorId}
                  articleId={post.articleId}
                  authorName={post.authorName}
                  authorImage={post.authorImage}
                  title={post.title}
                  description={post.description}
                  thumbnailImage={post.thumbnailImage}
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

export default withAuth(TagsPages); 
