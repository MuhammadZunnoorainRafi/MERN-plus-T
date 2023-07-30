import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import blogReducer from './features/blogSlice';
import commentReducer from './features/commentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
    comment: commentReducer,
  },
  // devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
