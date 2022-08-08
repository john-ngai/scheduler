import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addAppointment, deleteAppointment } from './appointmentsSlice';

export const fetchDays = createAsyncThunk('days/fetchDays', async () => {
  const response = await axios.get('/api/days');
  return response.data;
});

const daysSlice = createSlice({
  name: 'days',
  initialState: {
    daysList: [],
    selectedDay: 'Monday',
  },
  reducers: {
    daySelected(state, action) {
      const { selectedDay } = action.payload;
      state.selectedDay = selectedDay;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDays.fulfilled, (state, action) => {
        return { ...state, daysList: action.payload };
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        const { selectedDay } = action.payload;
        const dayListItem = state.daysList.find(
          (day) => day.name === selectedDay
        );
        // Decrement the spots value for the matching day upon successfully adding an appointment.
        dayListItem.spots--;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        const { selectedDay } = action.payload;
        const dayListItem = state.daysList.find(
          (day) => day.name === selectedDay
        );
        // Increment the spots value for the matching day upon successfully removing an appointment.
        dayListItem.spots++;
      });
  },
});

export const { daySelected, spotsIncremented, spotsDecremented } =
  daysSlice.actions;

export default daysSlice.reducer;

export const selectAppointmentIdsByDay = (state) => {
  const daysList = state.days.daysList;
  const selectedDay = state.days.selectedDay;
  const selectedDayList = daysList.find((day) => day.name === selectedDay);
  const appointmentIds = selectedDayList.appointments;
  return appointmentIds;
};

export const selectInterviewerIdsByDay = (state) => {
  const daysList = state.days.daysList;
  const selectedDay = state.days.selectedDay;
  const selectedDayList = daysList.find((day) => day.name === selectedDay);
  const interviewerIds = selectedDayList.interviewers;
  return interviewerIds;
};
