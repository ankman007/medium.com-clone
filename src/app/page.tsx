'use client';
import PostCard from "./components/PostCard";
import RecommendedPostsSection from "./components/RecommendedPostsSection";
import RecommendedTopics from "./components/RecommendedTopics";

export default function Home() {
  const RecommendedPostsSectionArticles = [
    {
      authorName: "John Doe",
      authorProfileImage: "/dummy-profile-2.jpg",
      postTitle: "How to Build Scalable Web Applications",
      uploadedAt: "2 hours ago",
    },
    {
      authorName: "Jane Smith",
      authorProfileImage: "/dummy-profile-3.jpg",
      postTitle: "Mastering React Hooks in 2025",
      uploadedAt: "5 hours ago",
    },
    {
      authorName: "Emily Johnson",
      authorProfileImage: "/dummy-profile-4.jpg",
      postTitle: "SEO Best Practices for Modern Websites",
      uploadedAt: "1 day ago",
    },
  ];

  const recommendedTopics = [
    { name: "Web Development" },
    { name: "Artificial Intelligence" },
    { name: "Data Science" },
    { name: "Machine Learning" },
    { name: "Cloud Computing" },
    { name: "Cybersecurity" },
  ];

  const posts = [
    {
      author: "John Doe",
      authorImage: "/dummy-profile-2.jpg",
      title: "Building a Modern Web Application",
      description: "Learn how to create a modern web application using React and Tailwind CSS.",
      image: "/thumbnail-1.jpg",
      updatedAt: "3 hours ago",
      likes: 120,
      comments: 15,
      isBookmarked: false,
    },
    {
      author: "Jane Smith",
      authorImage: "/dummy-profile-4.jpg",
      title: "SEO Best Practices for 2025",
      description: "Discover the latest SEO trends and best practices to rank higher in search engines.",
      image: "/thumbnail-3.jpg",
      updatedAt: "2 days ago",
      likes: 230,
      comments: 45,
      isBookmarked: true,
    },
    {
      author: "Emily Johnson",
      authorImage: "/dummy-profile-3.jpg",
      title: "The Future of Artificial Intelligence",
      description: "Explore the advancements and ethical considerations of AI in 2025.",
      image: "/thumbnail-2.jpg",
      updatedAt: "1 week ago",
      likes: 310,
      comments: 60,
      isBookmarked: false,
    },
    {
      author: "Michael Brown",
      authorImage: "/dummy-profile-2.jpg",
      title: "A Guide to Cloud Computing",
      description: "Learn the fundamentals of cloud computing and how businesses are leveraging it.",
      image: "/thumbnail-1.jpg",
      updatedAt: "4 days ago",
      likes: 145,
      comments: 23,
      isBookmarked: true,
    },
    {
      author: "Sophia Davis",
      authorImage: "/dummy-profile-1.jpg",
      title: "Cybersecurity in the Age of AI",
      description: "Discover how AI is transforming cybersecurity and what you can do to stay safe.",
      image: "/thumbnail-3.jpg",
      updatedAt: "3 hours ago",
      likes: 200,
      comments: 30,
      isBookmarked: false,
    },
  ];

  return (
    <div>
      <div className="flex flex-col lg:flex-row px-4 lg:px-8 py-8 gap-8">
        <div className="flex-grow space-y-6">
          {posts.map((post, index) => (
            <div key={index}>
              <PostCard
                author={post.author}
                authorImage={post.authorImage}
                title={post.title}
                description={post.description}
                image={post.image}
                updatedAt={post.updatedAt}
                likes={post.likes}
                comments={post.comments}
                isBookmarked={post.isBookmarked}
              />
              <hr />
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/3 space-y-8">
          <RecommendedPostsSection articles={RecommendedPostsSectionArticles} />

          <RecommendedTopics topics={recommendedTopics} />
        </div>
      </div>
    </div>
  );
}