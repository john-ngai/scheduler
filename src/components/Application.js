// Packages
import React, { useEffect } from 'react';
// Components
import DayList from '../features/days/DayList';
import Appointment from '../features/appointments/Appointment';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchDays, selectInterviewerIdsBySelectedDay } from '../app/daysSlice';
import {
  fetchAppointments,
  selectAppointmentsBySelectedDay,
} from '../features/appointments/appointmentsSlice';
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

  // Dispatch thunks to fetch the API data & set the intial state.
  useEffect(() => {
    dispatch(fetchDays());
    dispatch(fetchAppointments());
    dispatch(fetchInterviewers());
  }, [dispatch]);
  
  // Initial value before fetching the API data.
  let schedule = null;
  
  const state = useSelector((state) => state);

  // Proceed only when the entire initial state has been loaded
  // (i.e., days, appointments, interviewers)
  if (isStateLoaded(state)) {
    const appointments = selectAppointmentsBySelectedDay(state);
    schedule = appointments.map((appointment) => {
      return (
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
