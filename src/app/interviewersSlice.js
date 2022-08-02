import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchInterviewers = createAsyncThunk(
  'days/fetchInterviewers',
  async () => {
    const response = await axios.get('/api/interviewers');
    return response.data;
  }
);

const initialState = {
  1: {
    id: 1,
    name: 'Sylvia Palmer',
    avatar: 'https://i.imgur.com/LpaY82x.png',
  },
  2: {
    id: 2,
    name: 'Tori Malcolm',
    avatar: 'https://i.imgur.com/Nmx0Qxo.png',
  },
  3: {
    id: 3,
    name: 'Mildred Nazir',
    avatar: 'https://i.imgur.com/T2WwVfS.png',
  },
  4: {
    id: 4,
    name: 'Cohana Roy',
    avatar: 'https://i.imgur.com/FK8V841.jpg',
  },
  5: {
    id: 5,
    name: 'Sven Jones',
    avatar: 'https://i.imgur.com/twYrpay.jpg',
  },
  6: {
    id: 6,
    name: 'Susan Reynolds',
    avatar: 'https://i.imgur.com/TdOAdde.jpg',
  },
  7: {
    id: 7,
    name: 'Alec Quon',
    avatar: 'https://i.imgur.com/3tVgsra.jpg',
  },
  8: {
    id: 8,
    name: 'Viktor Jain',
    avatar: 'https://i.imgur.com/iHq8K8Z.jpg',
  },
  9: {
    id: 9,
    name: 'Lindsay Chu',
    avatar: 'https://i.imgur.com/nPywAp1.jpg',
  },
  10: {
    id: 10,
    name: 'Samantha Stanic',
    avatar: 'https://i.imgur.com/okB9WKC.jpg',
  },
};

const interviewersSlice = createSlice({
  name: 'interviewers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchInterviewers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default interviewersSlice.reducer;

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
