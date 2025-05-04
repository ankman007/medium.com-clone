"use client";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { formatDate } from "../../../utils";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { PostCardProps } from "../../../constant/types";
import { fetchWithAuth } from "../../../utils";
import withAuth from "../hoc/withAuth";
import PageListSkeleton from "@/app/skeletons/PostListSkeleton";

function RecommendedPostsPage() {
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const articlesResponse = await fetchWithAuth(
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

        const filteredAndSortedArticles = articlesData.filter(
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
            author_avatar: string;
            thumbnail: string;
          }) => article.like_count > 1
        );

        const formattedArticles: PostCardProps[] =
          filteredAndSortedArticles.map(
            (article: {
              id: number;
              author_id: number;
              author_name: string;
              author_email: string;
              title: string;
              seo_description: string;
              updated_at: string;
              like_count: number;
              comments_count: number;
              seo_slug: string;
              author_avatar: string;
              thumbnail: string;
            }) => ({
              articleId: article.id,
              authorId: Number(article.author_id),
              authorName: article.author_name,
              authorEmail: article.author_email,
              title: article.title,
              description: article.seo_description,
              updatedAt: formatDate(article.updated_at),
              likes: article.like_count,
              comments: article.comments_count,
              isBookmarked: false,
              authorImage: article.author_avatar || "/dummy-profile.jpg",
              image: article.thumbnail || "/thumbnail.jpg",
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

  if (loading) return <PageListSkeleton />;
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

export default withAuth(RecommendedPostsPage);
