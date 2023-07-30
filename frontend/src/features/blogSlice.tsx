import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getBlogsType, initialStateType } from './blogSliceTypes';

const initialState: initialStateType = {
  blogs: [],
  blog: null,
};

const blogSlice = createSlice({
  name: 'blogSlice',
  initialState,
  reducers: {
    getAllBlogs: (state, action: PayloadAction<getBlogsType[]>) => {
      state.blogs = action.payload;
    },
    getSinglePost: (state, action: PayloadAction<getBlogsType>) => {
      state.blog = action.payload;
    },
  },
});

export const { getAllBlogs, getSinglePost } = blogSlice.actions;

export default blogSlice.reducer;
