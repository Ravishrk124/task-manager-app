### src/features/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../api/apiService';

// Get user and token from localStorage for session persistence
const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');

const initialState = {
  user: user || null,
  token: token || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Async Thunk for user registration
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await apiService.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Unable to register';
    return thunkAPI.rejectWithValue(message);
  }
});

// Async Thunk for user login
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await apiService.post('/auth/login', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Unable to login';
    return thunkAPI.rejectWithValue(message);
  }
});

// Simple reducer for logout
export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        // No user set on register, force login
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.token = null;
      })
      .addCase(logout.fulfilled, (state) => {
          state.user = null;
          state.token = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;