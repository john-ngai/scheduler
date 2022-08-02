import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDays = createAsyncThunk('days/fetchDays', async () => {
  const response = await axios.get('/api/days');
  return response.data;
});

const daysList = [
  {
    id: 1,
    name: 'Monday',
    appointments: [1, 2, 3, 4, 5],
    interviewers: [1, 2, 3, 6, 8],
    spots: 2,
  },
  {
    id: 2,
    name: 'Tuesday',
    appointments: [6, 7, 8, 9, 10],
    interviewers: [1, 3, 7, 8, 10],
    spots: 4,
  },
  {
    id: 3,
    name: 'Wednesday',
    appointments: [11, 12, 13, 14, 15],
    interviewers: [1, 6, 7, 9, 10],
    spots: 3,
  },
  {
    id: 4,
    name: 'Thursday',
    appointments: [16, 17, 18, 19, 20],
    interviewers: [4, 6, 7, 8, 10],
    spots: 2,
  },
  {
    id: 5,
    name: 'Friday',
    appointments: [21, 22, 23, 24, 25],
    interviewers: [1, 2, 4, 7, 10],
    spots: 4,
  },
];

const daysSlice = createSlice({
  name: 'days',
  initialState: {
    daysList,
    selectedDay: 'Monday',
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchDays.fulfilled, (state, action) => {
      state.daysList = action.payload;
    });
  },
});

export default daysSlice.reducer;
