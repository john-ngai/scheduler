import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAppointments = createAsyncThunk(
  'days/fetchAppointments',
  async () => {
    const response = await axios.get('/api/appointments');
    return response.data;
  }
);

const initialState = {
  1: {
    id: 1,
    time: '12pm',
    interview: {
      student: 'Archie Cohen',
      interviewer: 8,
    },
  },
  2: {
    id: 2,
    time: '1pm',
    interview: {
      student: 'Chad Takahashi',
      interviewer: 6,
    },
  },
  3: {
    id: 3,
    time: '2pm',
    interview: null,
  },
  4: {
    id: 4,
    time: '3pm',
    interview: null,
  },
  5: {
    id: 5,
    time: '4pm',
    interview: {
      student: 'Jamal Jordan',
      interviewer: 6,
    },
  },
  6: {
    id: 6,
    time: '12pm',
    interview: null,
  },
  7: {
    id: 7,
    time: '1pm',
    interview: null,
  },
  8: {
    id: 8,
    time: '2pm',
    interview: {
      student: 'Leopold Silvers',
      interviewer: 7,
    },
  },
  9: {
    id: 9,
    time: '3pm',
    interview: null,
  },
  10: {
    id: 10,
    time: '4pm',
    interview: null,
  },
  11: {
    id: 11,
    time: '12pm',
    interview: null,
  },
  12: {
    id: 12,
    time: '1pm',
    interview: {
      student: 'Liam Martinez',
      interviewer: 10,
    },
  },
  13: {
    id: 13,
    time: '2pm',
    interview: null,
  },
  14: {
    id: 14,
    time: '3pm',
    interview: null,
  },
  15: {
    id: 15,
    time: '4pm',
    interview: {
      student: 'Lydia Miller-Jones',
      interviewer: 7,
    },
  },
  16: {
    id: 16,
    time: '12pm',
    interview: {
      student: 'Maria Boucher',
      interviewer: 10,
    },
  },
  17: {
    id: 17,
    time: '1pm',
    interview: {
      student: 'Michael Chan-Montoya',
      interviewer: 4,
    },
  },
  18: {
    id: 18,
    time: '2pm',
    interview: {
      student: 'Richard Wong',
      interviewer: 4,
    },
  },
  19: {
    id: 19,
    time: '3pm',
    interview: null,
  },
  20: {
    id: 20,
    time: '4pm',
    interview: null,
  },
  21: {
    id: 21,
    time: '12pm',
    interview: null,
  },
  22: {
    id: 22,
    time: '1pm',
    interview: null,
  },
  23: {
    id: 23,
    time: '2pm',
    interview: null,
  },
  24: {
    id: 24,
    time: '3pm',
    interview: null,
  },
  25: {
    id: 25,
    time: '4pm',
    interview: {
      student: 'Yuko Smith',
      interviewer: 10,
    },
  },
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAppointments.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default appointmentsSlice.reducer;
