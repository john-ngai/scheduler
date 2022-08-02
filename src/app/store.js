import { configureStore } from '@reduxjs/toolkit';
import daysReducer from './daysSlice';

export default configureStore({
  reducer: {
    days: daysReducer,
  },
});
