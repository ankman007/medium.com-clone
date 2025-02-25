// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import userPostReducer from './slices/userPostSlice';
import postsReducer from './slices/postsSlice';
import tagsReducer from './slices/tagsSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    userPost: userPostReducer,
    posts: postsReducer,
    tags: tagsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
