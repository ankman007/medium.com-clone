import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiBaseURL } from "../../../../constant/api";

interface Post {
  id: number;
  author_name: string;
  author_id: string;
  author_email: string;
  title: string;
  content: string;
  seo_description: string;
  created_at: string;
  updated_at: string;
  seo_slug: string;
  tags: number[];
  like_count: number;
  comment_count: number;
  thumbnail: string;
  author_avatar: string;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchAllPosts = createAsyncThunk<Post[], string>(
  "posts/fetchAllPosts",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiBaseURL}/articles/`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      if (!response.ok) throw new Error("Failed to fetch posts");
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Create slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
