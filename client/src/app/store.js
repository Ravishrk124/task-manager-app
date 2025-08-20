import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import taskReducer from '../features/taskSlice';
import userReducer from '../features/userSlice'; // <-- Import user reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    users: userReducer, // <-- Add user reducer
  },
});