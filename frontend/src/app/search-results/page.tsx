"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PostCard from "@/app/components/PostCard";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import withAuth from "@/app/hoc/withAuth";
import { fetchWithAuth, capitalize, formatDate } from "../../../utils";
import { PostCardProps, RawArticle } from "../../../constant/types";
import PageListSkeleton from "@/app/skeletons/PostListSkeleton";
import { apiBaseURL } from "../../../constant/api";

const getSearchResult = async (query: string, accessToken: string) => {
  if (query.trim() === "") return [];

  try {
    const response = await fetchWithAuth(
      `${apiBaseURL}/articles/search/?q=${query}`,
      {
        method: "GET",
        headers: { Authorization: accessToken ? `Bearer ${accessToken}` : "" },
      }
    );
    if (!response.ok) throw new Error("Search failed.");
    return await response.json();
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};

function SearchResultsPage() {
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const token = useSelector((state: RootState) => state.auth.accessToken) || "";

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      setLoading(true);
      setError(null);

      try {
        const searchData = await getSearchResult(query, token);
        const formattedPosts = (searchData || [])
          .map((article: RawArticle) => ({
            authorId: article.author_id,
            articleId: article.id,
            authorName: article.author_name,
            authorEmail: article.author_email,
            title: article.title,
            description: article.seo_description,
            updatedAt: formatDate(article.updated_at),
            likes: article.like_count,
            comments: article.comments_count,
            isBookmarked: false,
            authorImage: article.author_avatar || "/dummy-profile.jpg",
            thumbnailImage: article.thumbnail || "/thumbnail.jpg",
            seoSlug: article.seo_slug,
          }))
          .sort((a, b) => {
            if (b.likes !== a.likes) return b.likes - a.likes;
            return (b.comments ?? 0) - (a.comments ?? 0);
          });

        setPosts(formattedPosts);
      } catch (err) {
        setError(`Failed to load search results. ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, token]);

  if (loading) return <PageListSkeleton />;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Search results for:{" "}
          <span className="italic">{capitalize(query)}</span>
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow space-y-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.articleId}>
                  <PostCard {...post} />
                  <hr />
                </div>
              ))
            ) : (
              <div className="text-gray-600 text-lg text-center py-8">
                No results found for <strong>{capitalize(query)}</strong>.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(SearchResultsPage);
