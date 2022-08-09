import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async () => {
    const response = await axios.get('/api/appointments');
    const appointments = response.data;

    // Add a conditional 'visualMode' property to each appointment object.
    for (const id in appointments) {
      if (appointments[id].interview) {
        appointments[id].visualMode = 'SHOW';
      } else {
        appointments[id].visualMode = 'EMPTY';
      }
    }

    return appointments;
  }
);

export const updateAppointment = createAsyncThunk(
  'appointments/updateAppointment',
  async (action) => {
    const { appointment } = action.payload;
    const { id } = appointment;
    await axios.put(`/api/appointments/${id}`, appointment);
    return action.payload; // { appointment, newDayListItem }
  }
);

export const deleteAppointment = createAsyncThunk(
  'appointments/deleteAppointment',
  async (action) => {
    const { appointment } = action.payload;
    const { id } = appointment;
    await axios.delete(`/api/appointments/${id}`);
    return action.payload; // { appointment, newDayListItem }
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {},
  reducers: {
    updateVisualMode(state, action) {
      const { id, visualMode } = action.payload;
      state[id].visualMode = visualMode;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateAppointment.pending, (state, action) => {
        const { appointment } = action.meta.arg.payload;
        const { id } = appointment;
        state[id].visualMode = 'SAVING';
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        const { appointment } = action.payload;
        const { id, interview } = appointment;
        state[id] = { ...appointment, interview, visualMode: 'SHOW' };
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        const { appointment } = action.meta.arg.payload;
        const { id } = appointment;
        state[id].visualMode = 'ERROR_SAVE';
      })
      .addCase(deleteAppointment.pending, (state, action) => {
        const { appointment } = action.meta.arg.payload;
        const { id } = appointment;
        state[id].visualMode = 'DELETING';
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        const { appointment } = action.payload;
        const { id, interview } = appointment;
        state[id] = { ...appointment, interview, visualMode: 'EMPTY' };
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        const { appointment } = action.meta.arg.payload;
        const { id } = appointment;
        state[id].visualMode = 'ERROR_DELETE';
      });
  },
});

export const { updateVisualMode } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;

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
