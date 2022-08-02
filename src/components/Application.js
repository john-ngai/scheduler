// Packages
import React from 'react';
import { useSelector } from 'react-redux';
// Components
import DayList from 'components/DayList.js';
import Appointment from 'components/Appointment';
// Hook
import useApplicationData from 'hooks/useApplicationData.js';
// Redux
import { selectInterviewersByDay } from '../app/interviewersSlice';
import { selectAppointmentsByDay } from '../app/appointmentsSlice';
// Selectors
import { formatInterview } from '../helpers/selectors.js';
// Stylesheet
import 'components/Application.scss';

export default function Application() {
  const reduxState = useSelector((state) => state); // Temporary

  const { bookInterview, cancelInterview } = useApplicationData();

  const appointments = selectAppointmentsByDay(reduxState);

  const schedule = appointments.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={formatInterview(reduxState, appointment.interview)} // Bugged
        interviewers={selectInterviewersByDay(reduxState)}
        // bookInterview={bookInterview}
        // cancelInterview={() => cancelInterview(appointment.id)}
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
