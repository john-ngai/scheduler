// Packages
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
// Redux
import {
  updateAppointment,
  deleteAppointment,
  updateVisualMode,
} from '../../features/appointments/appointmentsSlice';
import {
  selectDayListItemBySelectedDay,
  selectAppointmentIdsBySelectedDay,
} from '../../features/days/daysSlice';
// Helpher function
import { getSpotsRemaining } from '../../helpers/helpers';
// Stylesheet
import './Appointment.scss';

export default function Appointment(props) {
  const dispatch = useDispatch();
  const dayListItem = useSelector(selectDayListItemBySelectedDay);
  const appointments = useSelector((state) => state.appointments);
  const apppointmentIds = useSelector(selectAppointmentIdsBySelectedDay);
  const id = props.id;

  // Save a new appointment or update an existing one.
  const onSaveHandler = (name, interviewer) => {
    const appointment = {
      ...appointments[id],
      interview: {
        student: name,
        interviewer,
      },
    };
    const newAppointments = { ...appointments, [id]: { ...appointment } };
    const spots = getSpotsRemaining(newAppointments, apppointmentIds);
    const newDayListItem = { ...dayListItem, spots };
    dispatch(updateAppointment({ payload: { appointment, newDayListItem } }));
  };

  // Destroy an existing appointment.
  const onDestroyHandler = () => {
    const appointment = {
      ...appointments[id],
      interview: null,
    };
    const newAppointments = { ...appointments, [id]: { ...appointment } };
    const spots = getSpotsRemaining(newAppointments, apppointmentIds);
    const newDayListItem = { ...dayListItem, spots };
    dispatch(deleteAppointment({ payload: { appointment, newDayListItem } }));
  };

  let content = null;

  if (id !== 'last') {
    const visualMode = appointments[id].visualMode;
    switch (visualMode) {
      case 'EMPTY':
        content = (
          <Empty
            onAdd={() => {
              dispatch(updateVisualMode({ id, visualMode: 'CREATE' }));
            }}
          />
        );
        break;
      case 'SHOW':
        content = (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            onEdit={() => {
              dispatch(updateVisualMode({ id, visualMode: 'UPDATE' }));
            }}
            onDestroy={() => {
              dispatch(updateVisualMode({ id, visualMode: 'CONFIRM' }));
            }}
          />
        );
        break;
      case 'CREATE':
        content = (
          <Form
            interviewers={props.interviewers}
            onSave={onSaveHandler}
            onCancel={() => {
              dispatch(updateVisualMode({ id, visualMode: 'EMPTY' }));
            }}
          />
        );
        break;
      case 'UPDATE':
        content = (
          <Form
            interviewers={props.interviewers}
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            onSave={onSaveHandler}
            onCancel={() => {
              dispatch(updateVisualMode({ id, visualMode: 'SHOW' }));
            }}
          />
        );
        break;
      case 'SAVING':
        content = <Status message="Booking" />;
        break;
      case 'ERROR_SAVE':
        content = (
          <Error
            onClose={() => {
              dispatch(updateVisualMode({ id, visualMode: 'EMPTY' }));
            }}
            message="Could not book appointment. Please try again later."
          />
        );
        break;
      case 'CONFIRM':
        content = (
          <Confirm
            message="Are you sure you would like to cancel?"
            onCancel={() => {
              dispatch(updateVisualMode({ id, visualMode: 'SHOW' }));
            }}
            onConfirm={onDestroyHandler}
          />
        );
        break;
      case 'DELETING':
        content = <Status message="Canceling" />;
        break;
      case 'ERROR_DELETE':
        content = (
          <Error
            onClose={() => {
              dispatch(updateVisualMode({ id, visualMode: 'SHOW' }));
            }}
            message="Could not cancel appointment. Please try again later."
          />
        );
        break;
      default:
    }
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {content}
    </article>
  );
}
