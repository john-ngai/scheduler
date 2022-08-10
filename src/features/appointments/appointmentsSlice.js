import axios from 'axios';
import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

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
    return action.payload; // { appointment, day }
  }
);

export const deleteAppointment = createAsyncThunk(
  'appointments/deleteAppointment',
  async (action) => {
    const { appointment } = action.payload;
    const { id } = appointment;
    await axios.delete(`/api/appointments/${id}`);
    return action.payload; // { appointment, day }
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

export const {
  selectById: selectAppointmentById, // Given (state, id), return the entity.
} = appointmentsAdapter.getSelectors((state) => state.appointments);