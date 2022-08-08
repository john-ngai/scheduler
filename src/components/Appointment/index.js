// Packages
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';
// Redux
import {
  addAppointment,
  deleteAppointment,
  updateVisualMode,
} from '../../app/appointmentsSlice';
// Stylesheet
import 'components/Appointment/styles.scss';

export default function Appointment(props) {
  const dispatch = useDispatch();
  const selectedDay = useSelector((state) => state.days.selectedDay);
  const allAppointments = useSelector((state) => state.appointments);
  const appointmentId = props.id;

  // Create and book a new appointment.
  const save = (name, interviewer) => {
    const appointment = {
      ...allAppointments[appointmentId],
      interview: {
        student: name,
        interviewer,
      },
    };
    dispatch(addAppointment({ payload: { appointment, selectedDay } }));
  };

  // Cancel a booked appointment.
  const destroy = () => {
    const appointment = {
      ...allAppointments[appointmentId],
      interview: null,
    };

    dispatch(deleteAppointment({ payload: { appointment, selectedDay } }));
  };

  const appointment = allAppointments[appointmentId];

  let content = null;
  if (appointmentId !== 'last') {
    const visualMode = appointment.visualMode;
    switch (visualMode) {
      case 'EMPTY':
        content = (
          <Empty
            onAdd={() => {
              dispatch(
                updateVisualMode({ id: appointmentId, visualMode: 'CREATE' })
              );
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
              dispatch(
                updateVisualMode({ id: appointmentId, visualMode: 'UPDATE' })
              );
            }}
            onDestroy={() => {
              dispatch(
                updateVisualMode({ id: appointmentId, visualMode: 'CONFIRM' })
              );
            }}
          />
        );
        break;
      case 'CREATE':
        content = (
          <Form
            interviewers={props.interviewers}
            onSave={save}
            onCancel={() => {
              dispatch(
                updateVisualMode({ id: appointmentId, visualMode: 'EMPTY' })
              );
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
            onSave={save}
            onCancel={() => {
              dispatch(
                updateVisualMode({ id: appointmentId, visualMode: 'SHOW' })
              );
            }}
          />
        );
        break;
      case 'SAVING':
        content = <Status message="Saving" />;
        break;
      case 'ERROR_SAVE':
        content = (
          <Error
            onClose={() => {
              dispatch(
                updateVisualMode({ id: appointmentId, visualMode: 'SHOW' })
              );
            }}
            message="Could not save appointment. Please try again later."
          />
        );
        break;
      case 'CONFIRM':
        content = (
          <Confirm
            message="Are you sure you would like to cancel?"
            onCancel={() => {
              dispatch(
                updateVisualMode({ id: appointmentId, visualMode: 'SHOW' })
              );
            }}
            onConfirm={destroy}
          />
        );
        break;
      case 'DELETING':
        content = <Status message="Deleting" />;
        break;
      case 'ERROR_DELETE':
        content = (
          <Error
            onClose={() => {
              dispatch(
                updateVisualMode({ id: appointmentId, visualMode: 'SHOW' })
              );
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
