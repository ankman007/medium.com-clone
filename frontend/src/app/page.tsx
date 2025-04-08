"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "./components/PostCard";
import StaffPicksSection from "./components/StaffPicksSection";
import RecommendedTopics from "./components/RecommendedTopics";
import HomePage from "./components/HomePage";
import { formatDate } from "../../utils";
import { RootState } from "./redux/store";
import PostPageSkeleton from "@/app/skeletons/PostPageSkeleton"

export default function Home() {
  const [loading, setLoading] = useState(true);

  const posts = useSelector((state: RootState) => state.posts.posts);
  const recommendedTags = useSelector((state: RootState) => state.tags.tags);
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const isLoggedIn = !!token;

  useEffect(() => {
    if (posts.length === 0 || recommendedTags.length === 0) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [posts, recommendedTags]);

  if (loading) return <PostPageSkeleton />;

  const sortedPosts = posts
    .slice()
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  const sortedPostsByLikes = posts
    .slice()
    .sort((a, b) => b.like_count - a.like_count);

  const staffPicksArticles = sortedPostsByLikes.slice(0, 3).map((post) => ({
    articleId: post.id,
    authorId: post.author_id as unknown as number,
    authorName: post.author_name,
    authorImage: post.thumbnail || '/dummy-profile.jpg',
    title: post.title,
    updatedAt: formatDate(post.updated_at),
    seoSlug: post.seo_slug,
  }));

  return (
    <div>
      {isLoggedIn ? (
        <div className="flex flex-col lg:flex-row px-4 lg:px-8 py-8 gap-8">
          <div className="flex-grow space-y-6">
            {sortedPosts.map((post) => (
              <div key={post.id}>
                <PostCard
                  articleId={post.id}
                  authorName={post.author_name}
                  authorId={post.author_id as unknown as number}
                  description={post.seo_description}
                  seoSlug={post.seo_slug}
                  updatedAt={formatDate(post.updated_at)}
                  title={post.title}
                  likes={post.like_count}
                  authorImage={post.author_avatar || '/dummy-profile.jpg'}
                  thumbnailImage={post.thumbnail || '/thumbnail.jpg'}
                  comments={post.comment_count}
                  isBookmarked={false}
                />
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
