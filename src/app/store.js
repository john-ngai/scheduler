import { configureStore } from '@reduxjs/toolkit';
import daysReducer from '../features/days/daysSlice';
import appointmentsReducer from '../features/appointments/appointmentsSlice';
import interviewersReducer from '../features/interviewers/interviewersSlice';

export default configureStore({
  reducer: {
    days: daysReducer,
    appointments: appointmentsReducer,
    interviewers: interviewersReducer,
  },
});
