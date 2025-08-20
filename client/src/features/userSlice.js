import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../api/apiService';

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
  message: '',
};

// Thunks for User CRUD
export const getUsers = createAsyncThunk('users/getAll', async (_, thunkAPI) => {
  try {
    const response = await apiService.get('/users');
    return response.data;
  } catch (error) { return thunkAPI.rejectWithValue('Failed to fetch users'); }
});

export const deleteUser = createAsyncThunk('users/delete', async (id, thunkAPI) => {
  try {
    await apiService.delete(`/users/${id}`);
    return id;
  } catch (error) { return thunkAPI.rejectWithValue('Failed to delete user'); }
});

// Keep the existing function for task assignment
export const getUsersForAssignment = createAsyncThunk('users/getForAssignment', async (_, thunkAPI) => {
    try {
        const response = await apiService.get('/users/list');
        return response.data;
    } catch (error) { return thunkAPI.rejectWithValue('Unable to fetch users'); }
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
      reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => { state.isLoading = true; })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;