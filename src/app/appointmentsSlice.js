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
  reducers: {
    interviewAdded(state, action) {
      const { appointmentId, interview } = action.payload;
      state[appointmentId].interview = interview;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAppointments.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { interviewAdded } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;

// **REMINDER**: Refactor with params (state, appointmentIds)
export const selectAppointmentsByDay = (state) => {
  const allAppointments = state.appointments;
  const selectedAppointments = [];
  const daysList = state.days.daysList;
  const selectedDay = state.days.selectedDay;

  // If the daysList array is empty, return the empty selectedAppointments array.
  if (daysList.length === 0) {
    return selectedAppointments;
  }

  if (daysList.length > 0) {
    daysList.forEach((day) => {
      if (day.name === selectedDay) {
        // Store the array of appointment ids for the selected day.
        const appointmentIds = day.appointments;

        // Push each matching appointment object into the selectedAppointments array.
        appointmentIds.forEach((id) =>
          selectedAppointments.push(allAppointments[id])
        );
        return selectedAppointments;
      }
    });
  }

  // Return an empty selectedAppointments array if no day is selected.
  return selectedAppointments;
};
