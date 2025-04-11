import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserPostProps = {
  id: number;
  author_name: string;
  author_id: number | string;
  author_email: string;
  title: string;
  content: string;
  seo_description: string;
  updated_at: string;
  created_at: string;
  seo_slug: string;
  like_count: number;
  author_avatar: string;
  thumbnail: string;
};

export interface UserPostState {
  posts: UserPostProps[];
}

const initialState: UserPostState = {
  posts: [],
};

const userPostsSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    setUserPosts: (state, action: PayloadAction<UserPostProps[]>) => {
      state.posts = action.payload;
    },
    addUserPost: (state, action: PayloadAction<UserPostProps>) => {
      state.posts.push(action.payload);
    },
    removeUserPost: (state, action: PayloadAction<number | string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    clearUserPosts: (state) => {
      state.posts = [];
    },
  },
});

export const { setUserPosts, addUserPost, removeUserPost, clearUserPosts } = userPostsSlice.actions;
export default userPostsSlice.reducer;
