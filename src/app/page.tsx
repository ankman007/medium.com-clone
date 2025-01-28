import PostCard from "./components/PostCard";
import Navbar from "./components/Navbar";
import EditorsPick from "./components/EditorsPick";
import RecommendedTopics from "./components/RecommendedTopics";

export default function Home() {
  const editorsPickArticles = [
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

  return (
    <div>
      {/* Navbar */}
      <Navbar />
      <hr />

      {/* Main Container for Content */}
      <div className="flex flex-col lg:flex-row px-4 lg:px-8 py-8 gap-8">
        {/* Main Post Cards Section */}
        <div className="flex-grow space-y-6">
          <PostCard
            author="John Doe"
            authorImage="/dummy-profile-2.jpg"
            title="Building a Modern Web Application"
            description="Learn how to create a modern web application using React and Tailwind CSS."
            image="/thumbnail-1.jpg"
            updatedAt="3 hours ago"
            likes={120}
            comments={15}
            isBookmarked={false}
          />
          <hr />

          <PostCard
            author="Jane Smith"
            authorImage="/dummy-profile-1.jpg"
            title="SEO Best Practices for 2025"
            description="Discover the latest SEO trends and best practices to rank higher in search engines."
            image="/thumbnail-2.jpg"
            updatedAt="2 days ago"
            likes={230}
            comments={45}
            isBookmarked={true}
          />
          <hr />

          <PostCard
            author="John Doe"
            authorImage="/dummy-profile-3.jpg"
            title="Building a Modern Web Application"
            description="Learn how to create a modern web application using React and Tailwind CSS."
            image="/thumbnail-3.jpg"
            updatedAt="3 hours ago"
            likes={120}
            comments={15}
            isBookmarked={false}
          />
          <hr />

          <PostCard
            author="Jane Smith"
            authorImage="/dummy-profile-4.jpg"
            title="SEO Best Practices for 2025"
            description="Discover the latest SEO trends and best practices to rank higher in search engines."
            image="/thumbnail-4.jpg"
            updatedAt="2 days ago"
            likes={230}
            comments={45}
            isBookmarked={true}
          />

          <hr />
        </div>

        {/* Sidebar Section */}
        <div className="w-full lg:w-1/3 space-y-8">
          {/* Editors Pick Section */}
          <EditorsPick articles={editorsPickArticles} />

          {/* Recommended Topics Section */}
          <RecommendedTopics topics={recommendedTopics} />
        </div>
      </div>
    </div>
  );
}
