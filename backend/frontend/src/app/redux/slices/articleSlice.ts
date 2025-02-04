import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define types
interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
}

interface ArticleState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ArticleState = {
  articles: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchArticles = createAsyncThunk(
  'articles/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles/`);
      return response.data;
    } catch (error: any) {
      console.error('Fetch Articles Error:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch articles');
    }
  }
);

export const createArticle = createAsyncThunk(
  'articles/create',
  async ({ title, content }: { title: string; content: string }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: { token: string | null } };
      const token = state.auth.token || localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/create/`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error: any) {
      console.error('Create Article Error:', error);
      return rejectWithValue(error.response?.data || 'Failed to create article');
    }
  }
);

// Article Slice
const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createArticle.fulfilled, (state, action: PayloadAction<Article>) => {
        state.articles.push(action.payload);
      });
  },
});

export default articleSlice.reducer;
