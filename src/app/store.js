import { configureStore } from '@reduxjs/toolkit';
import daysReducer from './daysSlice';
import appointmentsReducer from '../features/appointments/appointmentsSlice';
import interviewersReducer from './interviewersSlice';

export default configureStore({
  reducer: {
    days: daysReducer,
    appointments: appointmentsReducer,
    interviewers: interviewersReducer,
  },
});
