// Packages
import React from 'react';
import { useSelector } from 'react-redux';
// Components
import DayList from 'components/DayList.js';
import Appointment from 'components/Appointment';
// Hook
import useApplicationData from 'hooks/useApplicationData.js';
// Selectors
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  formatInterview
} from '../helpers/selectors.js';
// Stylesheet
import 'components/Application.scss';

export default function Application() {
  const reduxState = useSelector((state) => state); // Temporary

  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={formatInterview(reduxState, appointment.interview)}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={() => cancelInterview(appointment.id)}
      />
    );
  });

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
          <DayList days={state.days} value={state.day} onChange={setDay} />
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
