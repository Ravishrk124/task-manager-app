### src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  }, // We will add state "slices" here later
});