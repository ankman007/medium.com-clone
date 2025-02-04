import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define types
interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null, 
  loading: false,
  error: null,
};

// Async Thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login/`, { email, password });
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error: any) {
      console.error('Login Error:', error);
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token || localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error: any) {
      console.error('Fetch Profile Error:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch profile');
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
