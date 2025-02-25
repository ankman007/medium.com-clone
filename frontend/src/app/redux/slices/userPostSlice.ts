import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface UserPostsState {
  posts: UserPost[];
}

const initialState: UserPostsState = {
  posts: [],
};

const userPostsSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    setUserPosts: (state, action: PayloadAction<UserPost[]>) => {
      state.posts = action.payload;
    },
    addUserPost: (state, action: PayloadAction<UserPost>) => {
      state.posts.push(action.payload);
    },
    removeUserPost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { setUserPosts, addUserPost, removeUserPost } = userPostsSlice.actions;
export default userPostsSlice.reducer;
