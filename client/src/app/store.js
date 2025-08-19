### src/app/store.js

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {}, // We will add state "slices" here later
});