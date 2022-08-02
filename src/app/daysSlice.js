import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
    spotsIncremented(state, action) {
      const { selectedDay } = action.payload;
      const dayListItem = state.daysList.find(
        (day) => day.name === selectedDay
      );
      dayListItem.spots++;
    },
    spotsDecremented(state, action) {
      const { selectedDay } = action.payload;
      const dayListItem = state.daysList.find(
        (day) => day.name === selectedDay
      );
      dayListItem.spots--;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchDays.fulfilled, (state, action) => {
      return { ...state, daysList: action.payload };
    });
  },
});

export const { daySelected, spotsIncremented, spotsDecremented } =
  daysSlice.actions;

export default daysSlice.reducer;
