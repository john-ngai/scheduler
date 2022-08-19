// React
import React, { useEffect, useState } from 'react';
import DaysList from './features/days/DaysList';
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

  const [render, setRender] = useState(false);

  useEffect(() => {
    // Dispatch thunks to fetch & set the state from API.
    Promise.all([
      dispatch(fetchDays()),
      dispatch(fetchAppointments()),
      dispatch(fetchInterviewers()),
    ])
      // Render the components only when all the fetch calls are successfully.
      .then((response) => {
        if (!response[0].payload) return;
        if (!response[1].payload) return;
        if (!response[2].payload) return;
        setRender(true);
      });
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
        <nav className="sidebar__menu">{render && <DaysList />}</nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      {render && <AppointmentsList />}
    </main>
  );
}
