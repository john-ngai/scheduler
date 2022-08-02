const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');
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
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchDays.fulfilled, (state, action) => {
      state.daysList = action.payload;
    });
  },
});

export default daysSlice.reducer;
