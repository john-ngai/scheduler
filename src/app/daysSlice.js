import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateAppointment, deleteAppointment } from './appointmentsSlice';

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
      .addCase(updateAppointment.fulfilled, (state, action) => {
        const { newDayListItem } = action.payload;
        const { id, spots } = newDayListItem;
        const oldDayListItem = state.daysList.find(day => day.id === id);
        oldDayListItem.spots = spots;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        const { newDayListItem } = action.payload;
        const { id, spots } = newDayListItem;
        const oldDayListItem = state.daysList.find(day => day.id === id);
        oldDayListItem.spots = spots;
      });
  },
});

export const { daySelected, spotsIncremented, spotsDecremented } =
  daysSlice.actions;

export default daysSlice.reducer;

export const selectDayListItemBySelectedDay = (state) => {
  const daysList = state.days.daysList;
  const selectedDay = state.days.selectedDay;
  const dayListItem = daysList.find(day => day.name === selectedDay);
  return dayListItem;
}

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
