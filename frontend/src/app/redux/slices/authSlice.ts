import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../../../constant/http';
import { urls } from '../../../../constant/api';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await http.post(urls.auth.register, userData);
      console.log('Response Data: ', response.data);
      console.log('Response: ', response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await http.post(urls.auth.login, userData);  // Making POST request to login API
      return response;  // Return user data (or token)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;  // Set user data after successful signup
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;  // Set error message
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;  // Set user data after successful login
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;  // Set error message
      });
  },
});

export default authSlice.reducer;
