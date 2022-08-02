// Packages
import React, { useEffect } from 'react';
// Components
import DayList from 'components/DayList.js';
import Appointment from 'components/Appointment';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchDays } from '../app/daysSlice';
import {
  fetchAppointments,
  selectAppointmentsByDay,
} from '../app/appointmentsSlice';
import {
  fetchInterviewers,
  selectInterviewersByDay,
} from '../app/interviewersSlice';
// Helper(s)
import { formatInterview } from '../helpers/selectors.js';
// Stylesheet
import 'components/Application.scss';

export default function Application() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDays());
    dispatch(fetchAppointments());
    dispatch(fetchInterviewers());
  }, [dispatch]);

  const reduxState = useSelector((state) => state); // Temporary
  const appointments = selectAppointmentsByDay(reduxState);
  let schedule = null;

  if (
    Object.keys(reduxState.appointments.appointmentsList).length !== 0 &&
    Object.keys(reduxState.interviewers).length !== 0
  ) {
    schedule = appointments.map((appointment) => {
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={formatInterview(reduxState, appointment.interview)}
          interviewers={selectInterviewersByDay(reduxState)}
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
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
