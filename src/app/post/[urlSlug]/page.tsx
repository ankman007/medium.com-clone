import PostPage from "../../components/PostPage";

const post = {
    thumbnail: "/thumbnail-1.jpg",
    title: "A Deep Dive into TypeScript",
    seoDescription: "Learn the ins and outs of TypeScript, its features, and how it improves JavaScript development.",
    authorName: "John Doe",
    authorProfileImage: "/dummy-profile-3.jpg",
    uploadedAt: "3 days ago",
    readTime: "13 min",
    likes: 150,
    comments: 30,
    isBookmarked: false,
    content: "<p>This is the article content with <strong>HTML</strong> formatting.</p>",
  };
  
  const PostDetailPage = () => {
    return (
      <PostPage
        thumbnail={post.thumbnail}
        title={post.title}
        seoDescription={post.seoDescription}
        authorName={post.authorName}
        authorProfileImage={post.authorProfileImage}
        uploadedAt={post.uploadedAt}
        readTime={post.readTime}
        likes={post.likes}
        comments={post.comments}
        isBookmarked={post.isBookmarked}
        content={post.content}
      />
    );
  };
  
  export default PostDetailPage;
  