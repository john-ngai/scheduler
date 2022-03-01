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
    // Update the interview data for the appointment id.
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // Update the local state for the appointment id.
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
    .then( () => setState({...state, appointments}) );
  }
  applicationData.bookInterview = bookInterview;

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
    .then( () => setState({...state, appointments}) );
  }
  applicationData.cancelInterview = cancelInterview;

  return applicationData;
}
