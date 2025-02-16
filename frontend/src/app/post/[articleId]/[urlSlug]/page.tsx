"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PostPage from "../../../components/PostPage";
import { formatDate } from "../../../../../utils";

const PostDetailPage = () => {
  const { urlSlug, articleId } = useParams();
  const [articleData, setArticleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleData = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");

        if (urlSlug && typeof urlSlug === "string") {
          setLoading(true);
          setError(null);

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
              thumbnail: "/thumbnail-1.jpg",
              authorProfileImage: "/dummy-profile-1.jpg",
              title: articlesData.title,
              seoDescription: articlesData.seo_description,
              authorName: articlesData.author,
              uploadedAt: formatDate(articlesData.updated_at),
              readTime: "3 min", 
              likes: articlesData.like_count,
              comments: articlesData.comments_count,
              isBookmarked: false,
              content: articlesData.content,
            };

            setArticleData(formattedArticle);
          } catch (err) {
            console.error("Error fetching article:", err);
            setError(err);
          } finally {
            setLoading(false);
          }
        } else {
          setLoading(false);
          setError(new Error("Invalid or missing seoSlug"));
        }
      }
    };

    fetchArticleData();
  }, [urlSlug, articleId]);

  if (loading) {
    return <div>Loading article...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!articleData) {
    return <div>Article data not found.</div>;
  }

  return <PostPage {...articleData} />;
};

export default PostDetailPage;
