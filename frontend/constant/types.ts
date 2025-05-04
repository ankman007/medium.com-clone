export type BasePostProps = {
  articleId: number;
  authorId: number | string;
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
  isOwnPost?: boolean;
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

export type RawArticle = {
  id: number;
  author_name: string;
  author_id: number | string;
  author_email: string;
  title: string;
  content: string;
  seo_description: string;
  created_at: string;
  updated_at: string;
  seo_slug: string;
  tags: number[];
  like_count: number;
  comments_count: number;
  thumbnail: string;
  author_avatar: string | null;
};

export type UserDetailsProps = {
  id: number;
  email: string;
  name: string;
  avatar: string;
};

export interface UserPostProps {
  id: number;
  author_name: string;
  author_id: string | number;
  author_email: string;
  title: string;
  content: string;
  seo_description: string;
  created_at: string;
  updated_at: string;
  seo_slug: string;
  tags?: number[]; 
  like_count: number;
  comments_count?: number; 
  thumbnail: string;
  author_avatar: string;
}

export type UserPostPropsArray = UserPostProps[];

