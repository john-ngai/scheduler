// React
import React, { useEffect } from 'react';
import DayList from './features/days/DayList';
import AppointmentsList from 'features/appointments/AppointmentsList';
// Redux
import { useDispatch } from 'react-redux';
import { fetchDays } from './features/days/daysSlice';
import { fetchAppointments } from './features/appointments/appointmentsSlice';
import { fetchInterviewers } from './features/interviewers/interviewersSlice';
// Stylesheet
import './App.scss';

export default function App() {
  const dispatch = useDispatch();

  // Dispatch thunks to fetch & set the state from API.
  useEffect(() => {
    dispatch(fetchDays());
    dispatch(fetchAppointments());
    dispatch(fetchInterviewers());
  }, [dispatch]);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <AppointmentsList />
    </main>
  );
}
