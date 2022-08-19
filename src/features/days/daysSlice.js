import axios from 'axios';
import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {
  updateAppointment,
  deleteAppointment,
} from '../appointments/appointmentsSlice';

const daysAdapter = createEntityAdapter();

export const fetchDays = createAsyncThunk('days/fetchDays', async () => {
  const response = await axios.get('/api/days');
  return response.data;
});

const daysSlice = createSlice({
  name: 'days',
  initialState: daysAdapter.getInitialState({
    selectedDay: 'Monday',
  }),
  reducers: {
    daySelected(state, action) {
      const { selectedDay } = action.payload;
      state.selectedDay = selectedDay;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDays.fulfilled, (state, action) => {
        daysAdapter.upsertMany(state, action.payload);
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        const { day } = action.payload;
        const { id, spots } = day;
        const update = { id, changes: { spots } };
        daysAdapter.updateOne(state, update);
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        const { day } = action.payload;
        const { id, spots } = day;
        const update = { id, changes: { spots } };
        daysAdapter.updateOne(state, update);
      });
  },
});

export const { daySelected, spotsIncremented, spotsDecremented } =
  daysSlice.actions;

export default daysSlice.reducer;

export const {
  selectAll: selectAllDays, // Returns an array of all the day entities.
} = daysAdapter.getSelectors((state) => state.days);

export const selectSelectedDay = (state) => state.days.selectedDay;

export const selectDayEntityBySelectedDay = (allDays, selectedDay) => {
  const day = allDays.find((day) => day.name === selectedDay);
  return day;
};

// Returns the array of appointment ids for the selectedDay.
export const selectAppointmentIdsBySelectedDay = (allDays, selectedDay) => {
  const day = allDays.find((day) => day.name === selectedDay);
  return day.appointments;
};

// Returns the array of interviewer ids for the selectedDay.
export const selectInterviewerIdsBySelectedDay = (allDays, selectedDay) => {
  const day = allDays.find((day) => day.name === selectedDay);
  return day.interviewers;
};

// Return the number of spots remaining for the selectedDay.
export const selectSpotsBySelectedDay = (allDays, selectedDay) => {
  const day = allDays.find((day) => day.name === selectedDay);
  return day.spots;
};
