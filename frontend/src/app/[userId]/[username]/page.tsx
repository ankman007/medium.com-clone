"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { formatDate, capitalize } from "../../../../utils";
import { PostCardProps } from "../../../../constant/types";
import PostCard from "@/app/components/PostCard";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { fetchWithAuth } from "../../../../utils";
import withAuth from "@/app/hoc/withAuth";
import PageListSkeleton from "@/app/skeletons/PostListSkeleton"

function UserPostPages() {
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId, username } = useParams();
  const token = useSelector((state: RootState) => state.auth.accessToken);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const articlesResponse = await fetchWithAuth(
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
          authorImage: '/dummy-profile.jpg',
          thumbnailImage: '/thumbnail.jpg',
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
  }, [username, userId, token]);

  if (loading) {
    return <PageListSkeleton/>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {username && typeof username === 'string' ? capitalize(username) : ''} 
          <span className="block text-lg font-normal text-gray-500 mt-2">
            All posts from {username && typeof username === 'string' ? capitalize(username) : ''}.
          </span>
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

export default withAuth(UserPostPages);