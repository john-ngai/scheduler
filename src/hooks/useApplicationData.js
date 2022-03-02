import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const applicationData = {};

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      const [days, appointments, interviewers] = all;
      setState(prev => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);
  applicationData.state = state;

  const setDay = day => setState({ ...state, day });
  applicationData.setDay = setDay;

  const bookInterview = (id, interview) => {
    // Declare a new appointment with the updated interview key-value data.
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // Declare a new appointments objec with the updated appointment data.
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //// START - Updating Spots Remaining ////
    let index;
    let appointmentIDs;
    let spots = 0;

    // Declare a copy (not reference) of the days array from states.
    const days = [...state.days];
    const selectedDay = state.day;

    // Get the appointment IDs for the selected day.
    days.forEach(day => {
      if (day.name === selectedDay) {
        index = day.id - 1;
        appointmentIDs = day.appointments;
      }
    })

    // Increment spots when the interview key-value for the selected appointment id is falsey (null).
    appointmentIDs.forEach(id => !appointments[id].interview ? spots++ : null);

    // Update the remaining spots for the selected day.
    days[index] = { ...days[index], spots };
    //// END - Updating Spots Remaining ////

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => setState({ ...state, appointments, days }))
  }
  applicationData.bookInterview = bookInterview;

  const cancelInterview = id => {
    // Declare a new appointment with the updated interview key-value data.
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    // Declare a new appointments objec with the updated appointment data.
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //// START - Updating Spots Remaining ////
    let index;
    let appointmentIDs;
    let spots = 0;

    // Declare a copy (not reference) of the days array from states.
    const days = [...state.days];
    const selectedDay = state.day;

    // Get the appointment IDs for the selected day.
    days.forEach(day => {
      if (day.name === selectedDay) {
        index = day.id - 1;
        appointmentIDs = day.appointments;
      }
    })

    // Increment spots when the interview key-value for the selected appointment id is falsey (null).
    appointmentIDs.forEach(id => !appointments[id].interview ? spots++ : null);

    // Update the remaining spots for the selected day.
    days[index] = { ...days[index], spots };
    //// END - Updating Spots Remaining ////

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days });
      });
  }
  applicationData.cancelInterview = cancelInterview;

  return applicationData;
}
