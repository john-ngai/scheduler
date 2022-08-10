// React
import React from 'react'
import AppointmentListItem from './AppointmentListItem';
// Helper functions
import { formatInterview, isStateLoaded } from 'helpers/helpers';
// Redux
import { useSelector } from 'react-redux';
import { selectAppointmentsBySelectedDay } from './appointmentsSlice';
import { selectInterviewersByDay } from 'features/interviewers/interviewersSlice';
import { selectInterviewerIdsBySelectedDay } from 'features/days/daysSlice';

export default function AppointmentsList() {
  const state = useSelector((state) => state);

  let renderedAppointments = null;

  // Create the renderedAppointments after successfully
  // fetching & setting the state from the API.
  if (isStateLoaded(state)) {
    const appointments = selectAppointmentsBySelectedDay(state);
    renderedAppointments = appointments.map((appointment) => (
      <AppointmentListItem
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
    <section className="schedule">
      {renderedAppointments}
      {isStateLoaded(state) ? (
        <AppointmentListItem key="last" id="last" time="5pm" />
      ) : null}
    </section>
  );
}
