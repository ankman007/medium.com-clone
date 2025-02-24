export type BasePostProps = {
  articleId: number;
  authorId: number;
  authorName: string;
  authorImage: string;
  title: string;
  updatedAt: string;
  seoSlug: string;
}

export type PostCardProps = BasePostProps & {   
  description: string;
  thumbnailImage: string;
  likes?: number;
  comments?: number;
  isBookmarked?: boolean;
}

export type PostDetailProps = PostCardProps & {
  readTime?: string;
  content: string;
  // tags: string[];
}

export type StaffPicksSectionProps = {
  articles: BasePostProps[];
};

export type Tag = {
  id: number;
  name: string;
};

export type Tags = {
  tags: Tag[];
};

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
};

export type LayoutProps = {
  children: React.ReactNode;
}