"use client";
import { useEffect, useState } from "react";
import PostCard from "@/app/components/PostCard";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import withAuth from "@/app/hoc/withAuth";
import { formatDate, capitalize } from "../../../utils";
import { UserPostPropsArray, UserDetailsProps } from "../../../constant/types";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import PageListSkeleton from "@/app/skeletons/PostListSkeleton"

function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<UserPostPropsArray | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetailsProps | null>(null);

  const token = useSelector((state: RootState) => state.auth.accessToken);
  const userInfo = useSelector((state: RootState) => state.user);
  const userPosts = useSelector((state: RootState) => state.userPosts.posts);

  useEffect(() => {
    if (token) {
      setUserDetails({
        ...userInfo,
        id: Number(userInfo.id),
      });

      setPosts(userPosts);
      setLoading(false);
    }
  }, [token, userPosts, userInfo]);

  if (loading) {
    return <PageListSkeleton/>;
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
        <div
                style={{ position: "relative", width: "40px", height: "40px" }}
              >
          <Image
            src={userDetails?.avatar || '/dummy-profile.jpg'}
            alt="10"
            className="w-12 h-12 rounded-full"
            style={{ objectFit: 'cover' }}

            unoptimized
            fill

            />
            </div>

          <h1 className="text-3xl font-bold">
            {userDetails?.name ? capitalize(userDetails?.name as string) : ""}
            <span className="block text-lg font-normal text-gray-500">
              {userDetails?.email}
            </span>
          </h1>

          <div className="flex items-center cursor-pointer">
            <FontAwesomeIcon icon={faEdit} className="text-black" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow space-y-6">
            {posts?.map((post) => (
              <div key={post.id}>
                <PostCard
                  authorId={post.author_id}
                  articleId={post.id}
                  authorName={post.author_name}
                  authorImage={post.author_avatar || '/dummy-profile.jpg'}
                  thumbnailImage={post.thumbnail || '/thumbnail.jpg'}
                  title={post.title}
                  description={post.seo_description}
                  updatedAt={formatDate(post.updated_at)}
                  likes={0}
                  comments={0}
                  isBookmarked={false}
                  seoSlug={post.seo_slug}
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

export default withAuth(UserProfile);
