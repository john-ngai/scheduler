import { configureStore } from '@reduxjs/toolkit';
import appointmentsReducer from '../features/appointments/appointmentsSlice';
import daysReducer from '../features/days/daysSlice';
import interviewersReducer from '../features/interviewers/interviewersSlice';

export default configureStore({
  reducer: {
    appointments: appointmentsReducer,
    days: daysReducer,
    interviewers: interviewersReducer,
  },
});
