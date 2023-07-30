import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userType } from '../types/user';

type initialType = {
  user: userType | null;
};

const initialState: initialType = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    regUser: (state, action: PayloadAction<userType>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    login: (state, action: PayloadAction<userType>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    updateUser: (state, action: PayloadAction<userType>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    deleteUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { regUser, logout, login, updateUser, deleteUser } =
  authSlice.actions;

export default authSlice.reducer;
