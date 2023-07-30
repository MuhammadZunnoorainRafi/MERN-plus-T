import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { commentType, initialCommentSliceT } from './commentSliceTypes';

const initialState: initialCommentSliceT = {
  comments: [],
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    getComments: (state, action: PayloadAction<commentType>) => {
      state.comments = action.payload;
    },
  },
});

export const { getComments } = commentSlice.actions;
export default commentSlice.reducer;
