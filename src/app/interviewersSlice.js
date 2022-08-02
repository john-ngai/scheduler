import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchInterviewers = createAsyncThunk(
  'days/fetchInterviewers',
  async () => {
    const response = await axios.get('/api/interviewers');
    return response.data;
  }
);

const interviewersSlice = createSlice({
  name: 'interviewers',
  initialState: {},
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchInterviewers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default interviewersSlice.reducer;

// Refactor with params (state, interviewerIds)
export const selectInterviewersByDay = (state) => {
  const allInterviewers = state.interviewers;
  const selectedInterviewers = [];
  const daysList = state.days.daysList;
  const selectedDay = state.days.selectedDay;

  // If the daysList array is empty, return the empty selectedInterviewers array.
  if (daysList.length === 0) {
    return selectedInterviewers;
  }

  if (daysList.length > 0) {
    daysList.forEach((day) => {
      if (day.name === selectedDay) {
        // Store the array of interviewer ids for the selected day.
        const interviewerIds = day.interviewers;

        // Push each matching interviewer object into the selectedInterviewers array.
        interviewerIds.forEach((id) =>
          selectedInterviewers.push(allInterviewers[id])
        );
        return selectedInterviewers;
      }
    });
  }

  // Return an empty selectedInterviewers array if no day is selected.
  return selectedInterviewers;
};
