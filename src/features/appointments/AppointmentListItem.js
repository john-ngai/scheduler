// React
import React from 'react';
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Form from './Form';
import Status from './Status';
import Error from './Error';
import Confirm from './Confirm';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAppointmentEntities,
  updateVisualMode,
  updateAppointment,
  deleteAppointment,
  selectAppointmentById,
} from '../../features/appointments/appointmentsSlice';
import {
  selectDayListItemBySelectedDay,
  selectAppointmentIdsBySelectedDay,
  selectInterviewerIdsBySelectedDay,
} from '../../features/days/daysSlice';
import { selectInterviewersByDay } from 'features/interviewers/interviewersSlice';
// Helper function
import { formatInterview, getSpotsRemaining } from '../../helpers/helpers';
// Stylesheet
import './AppointmentListItem.scss';

export default function AppointmentListItem(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const appointments = selectAppointmentEntities(state);
  const dayListItem = useSelector(selectDayListItemBySelectedDay);
  const apppointmentIds = useSelector(selectAppointmentIdsBySelectedDay);
  const id = props.appointmentId;

  const selectedAppointment = selectAppointmentById(state, id);
  const interviewers = selectInterviewersByDay(
    state,
    selectInterviewerIdsBySelectedDay(state)
  );

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
    const transition = (visualMode) => {
      dispatch(updateVisualMode({ id, visualMode }));
    };
    switch (visualMode) {
      case 'EMPTY':
        content = <Empty onAdd={() => transition('CREATE')} />;
        break;
      case 'SHOW': // Changed
        content = (
          <Show
            student={selectedAppointment.interview.student} // Changed
            interviewer={
              formatInterview(state, selectedAppointment.interview).interviewer
                .name
            } // Changed
            onEdit={() => transition('UPDATE')}
            onDestroy={() => transition('CONFIRM')}
          />
        );
        break;
      case 'CREATE': // Changed
        content = (
          <Form
            interviewers={interviewers} // Changed
            onSave={onSaveHandler}
            onCancel={() => transition('EMPTY')}
          />
        );
        break;
      case 'UPDATE': // Changed
        content = (
          <Form
            interviewers={interviewers} // Changed
            student={selectedAppointment.interview.student}
            interviewer={
              formatInterview(state, selectedAppointment.interview).interviewer
                .name
            } // Changed
            onSave={onSaveHandler}
            onCancel={() => transition('SHOW')}
          />
        );
        break;
      case 'SAVING':
        content = <Status message="Booking" />;
        break;
      case 'ERROR_SAVE':
        content = (
          <Error
            onClose={() => transition('EMPTY')}
            message="Could not book appointment. Please try again later."
          />
        );
        break;
      case 'CONFIRM':
        content = (
          <Confirm
            message="Are you sure you would like to cancel?"
            onCancel={() => transition('SHOW')}
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
            onClose={() => transition('SHOW')}
            message="Could not cancel appointment. Please try again later."
          />
        );
        break;
      default:
    }
  }

  return (
    <article className="appointment">
      {id !== 'last' && <Header time={selectedAppointment.time} />}
      {id === 'last' && <Header time={props.time} />}
      {content}
    </article>
  );
}
