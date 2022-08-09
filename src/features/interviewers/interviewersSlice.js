import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchInterviewers = createAsyncThunk(
  'interviewers/fetchInterviewers',
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

// Given the state & array of interviewer ids for the selected day,
// return an array of the complete interviewer objects.
export const selectInterviewersByDay = (state, interviewerIds) => {
  const allInterviewers = state.interviewers;
  const selectedInterviewers = [];
  interviewerIds.forEach((id) => {
    selectedInterviewers.push(allInterviewers[id]);
  });
  return selectedInterviewers;
};
