// src/Redux/Slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, logoutApi } from '../../Services/api'; // Import your login and logout functions

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, thunkAPI) => {
  const response = await login(email, password);
  return { originalResponse: response, meta: { requestStatus: 'fulfilled' } };
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  const response = await logoutApi();
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: false,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = false;
      state.status = 'idle';
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // clearUser: (state) => {
    //   state.user = null;
    // },
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
