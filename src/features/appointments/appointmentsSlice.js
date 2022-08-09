import axios from 'axios';
import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { selectAllDays } from '../days/daysSlice';

const appointmentsAdapter = createEntityAdapter();

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
  initialState: appointmentsAdapter.getInitialState(),
  reducers: {
    updateVisualMode(state, action) {
      const { id, visualMode } = action.payload;
      const update = { id, changes: { visualMode } };
      appointmentsAdapter.updateOne(state, update);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        appointmentsAdapter.upsertMany(state, action.payload);
      })
      .addCase(updateAppointment.pending, (state, action) => {
        const { appointment } = action.meta.arg.payload;
        const { id } = appointment;
        const update = { id, changes: { visualMode: 'SAVING' } };
        appointmentsAdapter.updateOne(state, update);
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        const { appointment } = action.payload;
        const { id, interview } = appointment;
        const update = { id, changes: { interview, visualMode: 'SHOW' } };
        appointmentsAdapter.updateOne(state, update);
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        const { appointment } = action.meta.arg.payload;
        const { id } = appointment;
        const update = { id, changes: { visualMode: 'ERROR_SAVE' } };
        appointmentsAdapter.updateOne(state, update);
      })
      .addCase(deleteAppointment.pending, (state, action) => {
        const { appointment } = action.meta.arg.payload;
        const { id } = appointment;
        const update = { id, changes: { visualMode: 'DELETING' } };
        appointmentsAdapter.updateOne(state, update);
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        const { appointment } = action.payload;
        const { id, interview } = appointment;
        const update = { id, changes: { interview, visualMode: 'EMPTY' } };
        appointmentsAdapter.updateOne(state, update);
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        const { appointment } = action.meta.arg.payload;
        const { id } = appointment;
        const update = { id, changes: { visualMode: 'ERROR_DELETE' } };
        appointmentsAdapter.updateOne(state, update);
      });
  },
});

export const { updateVisualMode } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;

/*
  selectIds: returns the state.ids array.
  selectEntities: returns the state.entities lookup table.
  selectAll: maps over the state.ids array, and returns an array of entities in the same order.
  selectTotal: returns the total number of entities being stored in this state.
  selectById: given the state and an entity ID, returns the entity with that ID or undefined.
*/

// Customized selectors for the appointmentsAdapter.
export const {
  selectAll: selectAllAppointments, // Returns an array of all the entities.
  selectById: selectAppointmentById, // Given (state, id), returns the entity with that id or undefined.
  selectIds: selectAppointmentIds, // Returns an array of all the ids.
  selectEntities: selectAppointmentEntities, // ** Used in appointmentsSlice.js & Appointment.js ** - Returns the state.entities lookup table.
} = appointmentsAdapter.getSelectors((state) => state.appointments);

export const selectAppointmentsBySelectedDay = (state) => {
  const allAppointments = selectAppointmentEntities(state);
  const selectedAppointments = [];
  const allDays = selectAllDays(state);
  const selectedDay = state.days.selectedDay;

  // If the allDays array is empty, return the empty selectedAppointments array.
  if (allDays.length === 0) {
    return selectedAppointments;
  }

  if (allDays.length > 0) {
    allDays.forEach((day) => {
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
