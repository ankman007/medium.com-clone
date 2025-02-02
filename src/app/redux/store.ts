import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
// import articleReducer from './slices/articleSlice';
import postReducer from './slices/postSlice';

const store = configureStore({
  reducer: {
    // auth: authReducer,
    // articles: articleReducer,
    posts: postReducer,
  },
  // devTools: process.env.NODE_ENV !== 'production', 
});

export default store;
