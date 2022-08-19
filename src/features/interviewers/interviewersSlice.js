import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

export const selectAllInterviewers = state => state.interviewers;

// Returns an array of interviewer objects.
export const selectInterviewersById = (allInterviewers, interviewerIds) => {
  const selectedInterviewers = [];
  interviewerIds.forEach((id) => {
    selectedInterviewers.push(allInterviewers[id]);
  });
  return selectedInterviewers;
}