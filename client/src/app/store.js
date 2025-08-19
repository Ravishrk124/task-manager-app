### src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import taskReducer from '../features/taskSlice'; // <-- Import task reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer, // <-- Add task reducer
  },
});