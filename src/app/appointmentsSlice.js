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
      .addCase(addAppointment.pending, (state, action) => {
        console.log('addAppointment pending...'); // Temporary
        const appointment = action.meta.arg.payload;
        const { id } = appointment;
        state[id].visualMode = 'SAVING';
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        console.log('addAppointment fulfilled...'); // Temporary
        const { id, interview } = action.payload;
        state[id].interview = interview;
        state[id].visualMode = 'SHOW';
      })
      .addCase(addAppointment.rejected, () => {
        console.log('addAppointment rejected...'); // Temporary
      })

      .addCase(deleteAppointment.pending, (state) => {
        console.log('deleteAppointment pending...'); // Temporary
        state.status = 'pending';
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        console.log('deleteAppointment fulfilled...'); // Temporary
        const { id, interview } = action.payload;
        state[id].interview = interview;
        state.status = 'fulfilled';
      })
      .addCase(deleteAppointment.rejected, () => {
        console.log('deleteAppointment rejected...'); // Temporary
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
