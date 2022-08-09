// React
import React, { useEffect } from 'react';
import DayList from './features/days/DayList';
import Appointment from './features/appointments/Appointment';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDays,
  selectInterviewerIdsBySelectedDay,
} from './features/days/daysSlice';
import {
  fetchAppointments,
  selectAppointmentsBySelectedDay,
} from './features/appointments/appointmentsSlice';
import {
  fetchInterviewers,
  selectInterviewersByDay,
} from './features/interviewers/interviewersSlice';
// Helper functions
import { isStateLoaded, formatInterview } from './helpers/helpers';
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

  // Render an empty schedule before the state is set.
  let schedule = null;

  const state = useSelector((state) => state);

  // Create the schedule after successfully setting the entire state.
  if (isStateLoaded(state)) {
    const appointments = selectAppointmentsBySelectedDay(state);
    schedule = appointments.map((appointment) => (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={formatInterview(state, appointment.interview)}
        interviewers={selectInterviewersByDay(
          state,
          selectInterviewerIdsBySelectedDay(state)
        )}
      />
    ));
  }

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
      <section className="schedule">
        {schedule}
        {isStateLoaded(state) ? (
          <Appointment key="last" id="last" time="5pm" />
        ) : null}
      </section>
    </main>
  );
}
