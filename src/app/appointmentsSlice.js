import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

const appointmentsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.id.localeCompare(b.id),
});

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async () => {
    const response = await axios.get('/api/appointments');
    return response.data;
  }
);

export const addAppointment = createAsyncThunk(
  'appointments/addAppointment',
  async (action) => {
    const appointment = action.payload;
    const id = appointment.id;
    await axios.put(`/api/appointments/${id}`, appointment);
    return appointment;
  }
);

export const deleteAppointment = createAsyncThunk(
  'appointments/deleteAppointment',
  async (action) => {
    const { id } = action.payload;
    await axios.delete(`/api/appointments/${id}`);
    return action.payload;
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: appointmentsAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        return action.payload;
      })
      // addAppointment cases:
      .addCase(addAppointment.pending, () => {
        console.log('addAppointment pending...');
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        console.log('addAppointment fulfilled...');
        const { id, interview } = action.payload;
        state[id].interview = interview;
      })
      .addCase(addAppointment.rejected, () => {
        console.log('addAppointment rejected...');
      })
      // deleteAppointment cases:
      .addCase(deleteAppointment.pending, () => {
        console.log('deleteAppointment pending...');
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        console.log('deleteAppointment fulfilled...');
        const { id, interview } = action.payload;
        state[id].interview = interview;
      })
      .addCase(deleteAppointment.rejected, () => {
        console.log('deleteAppointment rejected...');
      });
  },
});

export const { interviewAdded } = appointmentsSlice.actions;

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
