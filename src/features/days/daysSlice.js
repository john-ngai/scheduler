import axios from 'axios';
import {
  createEntityAdapter,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import {
  updateAppointment,
  deleteAppointment,
} from '../appointments/appointmentsSlice';

const daysAdapter = createEntityAdapter();

export const fetchDays = createAsyncThunk('days/fetchDays', async () => {
  const response = await axios.get('/api/days');
  return response.data;
});

const daysSlice = createSlice({
  name: 'days',
  initialState: daysAdapter.getInitialState({
    selectedDay: 'Monday',
  }),
  /*
  {
    ids: [],
    entities: {},
    selectedDay: '',
  }
  */
  reducers: {
    daySelected(state, action) {
      const { selectedDay } = action.payload;
      state.selectedDay = selectedDay;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDays.fulfilled, (state, action) => {
        daysAdapter.upsertMany(state, action.payload);
        // return { ...state, daysList: action.payload };
        // postsAdapter.upsertMany(state, action.payload)
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        const { newDayListItem } = action.payload;
        const { id, spots } = newDayListItem;
        const oldDayListItem = state.daysList.find((day) => day.id === id);
        oldDayListItem.spots = spots;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        const { newDayListItem } = action.payload;
        const { id, spots } = newDayListItem;
        const oldDayListItem = state.daysList.find((day) => day.id === id);
        oldDayListItem.spots = spots;
      });
  },
});

export const { daySelected, spotsIncremented, spotsDecremented } =
  daysSlice.actions;

export default daysSlice.reducer;

/*
  selectIds: returns the state.ids array.
  selectEntities: returns the state.entities lookup table.
  selectAll: maps over the state.ids array, and returns an array of entities in the same order.
  selectTotal: returns the total number of entities being stored in this state.
  selectById: given the state and an entity ID, returns the entity with that ID or undefined.
*/

// Customized selectors for the daysAdapter.
export const {
  selectAll: selectAllDays, // ** Used in DayList.js ** - Returns an array of all the entities.
  selectById: selectDayById, // Given (state, id), returns entity with that id or undefined.
  selectIds: selectDayIds // Returns an array of all the ids.
} = daysAdapter.getSelectors(state => state.days)

export const selectDayListItemBySelectedDay = (state) => {
  const daysList = state.days.daysList;
  const selectedDay = state.days.selectedDay;
  const dayListItem = daysList.find((day) => day.name === selectedDay);
  return dayListItem;
};

export const selectAppointmentIdsBySelectedDay = (state) => {
  const daysList = state.days.daysList;
  const selectedDay = state.days.selectedDay;
  const selectedDayList = daysList.find((day) => day.name === selectedDay);
  const appointmentIds = selectedDayList.appointments;
  return appointmentIds;
};

export const selectInterviewerIdsBySelectedDay = (state) => {
  const daysList = state.days.daysList;
  const selectedDay = state.days.selectedDay;
  const selectedDayList = daysList.find((day) => day.name === selectedDay);
  const interviewerIds = selectedDayList.interviewers;
  return interviewerIds;
};
