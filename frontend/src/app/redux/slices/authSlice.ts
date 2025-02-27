import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../../../constant/types';

// Helper function to safely access localStorage
const getInitialToken = (key: string): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key) || "";
  }
  return "";
};

const initialState: AuthState = {
  accessToken: getInitialToken('accessToken'),
  refreshToken: getInitialToken('refreshToken'),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      }
    },
    clearTokens: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    },
  },
});

export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;
