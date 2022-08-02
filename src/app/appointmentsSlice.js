import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async () => {
    const response = await axios.get('/api/appointments');
    return response.data;
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {},
  reducers: {
    interviewAdded(state, action) {
      const { appointmentId, interview } = action.payload;
      state[appointmentId].interview = interview;
    },
    interviewRemoved(state, action) {
      const { appointmentId } = action.payload;
      state[appointmentId].interview = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAppointments.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { interviewAdded, interviewRemoved } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;

// **REMINDER**: Refactor with params (state, appointmentIds)
export const selectAppointmentsByDay = (state) => {
  const allAppointments = state.appointments;
  const selectedAppointments = [];
  const daysList = state.days.daysList;
  const selectedDay = state.days.selectedDay;

  // If the daysList array is empty, return the empty selectedAppointments array.
  if (daysList.length === 0) {
    return selectedAppointments;
  }

  if (daysList.length > 0) {
    daysList.forEach((day) => {
      if (day.name === selectedDay) {
        // Store the array of appointment ids for the selected day.
        const appointmentIds = day.appointments;

        // Push each matching appointment object into the selectedAppointments array.
        appointmentIds.forEach((id) =>
          selectedAppointments.push(allAppointments[id])
        );
        return selectedAppointments;
      }
    });
  }

  // Return an empty selectedAppointments array if no day is selected.
  return selectedAppointments;
};
