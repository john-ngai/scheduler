// React
import React from 'react';
import AppointmentListItem from './AppointmentListItem';
// Redux
import { useSelector } from 'react-redux';
import {
  selectAllDays,
  selectSelectedDay,
  selectAppointmentIdsBySelectedDay,
} from 'features/days/daysSlice';

export default function AppointmentsList() {
  const allDays = useSelector(selectAllDays);
  const selectedDay = useSelector(selectSelectedDay);
  const appointmentIds = selectAppointmentIdsBySelectedDay(
    allDays,
    selectedDay
  );

  const renderedAppointments = appointmentIds.map((id) => (
    <AppointmentListItem key={id} appointmentId={id} />
  ));

  return (
    <section className="schedule">
      {renderedAppointments}
      <AppointmentListItem key="last" appointmentId="last" time="5pm" />
    </section>
  );
}
