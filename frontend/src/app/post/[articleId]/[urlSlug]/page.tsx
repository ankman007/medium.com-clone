"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PostPage from "../../../components/PostPage";
import { formatDate } from "../../../../../utils";
import { PostDetailProps } from "../../../../../constant/types";

const PostDetailPage = () => {
  const { urlSlug, articleId } = useParams();
  const [articleData, setArticleData] = useState<PostDetailProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticleData = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");

        if (urlSlug && typeof urlSlug === "string") {
          setLoading(true);

          try {
            const articlesResponse = await fetch(
              `http://localhost:8000/articles/${articleId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (!articlesResponse.ok) {
              const errorData = await articlesResponse.json();
              throw new Error(
                errorData.message ||
                  `HTTP error! status: ${articlesResponse.status}`
              );
            }

            const articlesData = await articlesResponse.json();
            
            const formattedArticle = {
              articleId: articlesData.id,
              authorId: articlesData.author_id,
              authorName: articlesData.author,
              title: articlesData.title,
              updatedAt: formatDate(articlesData.updated_at),
              description: articlesData.seo_description,
              likes: articlesData.like_count,
              comments: articlesData.comments_count,
              isBookmarked: false,
              content: articlesData.content,
              seoSlug: articlesData.slug,
              readTime: "3 min", 
              thumbnailImage: "/thumbnail-1.jpg",
              authorImage: "/dummy-profile-1.jpg",
            };

            setArticleData(formattedArticle);
          } catch {
            console.error("Error fetching article:");
          } finally {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      }
    };

    fetchArticleData();
  }, [urlSlug, articleId]);

  if (loading) {
    return <div>Loading article...</div>;
  }

  if (!articleData && !loading) {
    return <div>Article data not found.</div>;
  }

  return articleData ? <PostPage {...articleData} /> : <div>Article data not found.</div>;
};

export default PostDetailPage;
