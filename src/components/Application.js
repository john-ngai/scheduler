// Packages
import React, { useEffect } from 'react';
// Components
import DayList from 'components/DayList.js';
import Appointment from 'components/Appointment';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchDays, selectInterviewerIdsByDay } from '../app/daysSlice';
import {
  fetchAppointments,
  selectAppointmentsByDay,
} from '../app/appointmentsSlice';
import {
  fetchInterviewers,
  selectInterviewersByDay,
} from '../app/interviewersSlice';
// Helper functions
import { isStateLoaded, formatInterview } from '../helpers';
// Stylesheet
import 'components/Application.scss';

export default function Application() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDays());
    dispatch(fetchAppointments());
    dispatch(fetchInterviewers());
  }, [dispatch]);

  const state = useSelector((state) => state);
  let schedule = null;

  if (isStateLoaded(state)) {
    const appointments = selectAppointmentsByDay(state);
    schedule = appointments.map((appointment) => {
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={formatInterview(state, appointment.interview)}
          interviewers={selectInterviewersByDay(
            state,
            selectInterviewerIdsByDay(state)
          )}
        />
      );
    });
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
