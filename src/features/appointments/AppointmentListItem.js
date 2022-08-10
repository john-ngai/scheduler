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
  selectAllDays,
  selectSelectedDay,
  selectDayEntityBySelectedDay,
  selectInterviewerIdsBySelectedDay,
  selectSpotsBySelectedDay,
} from '../../features/days/daysSlice';
import {
  selectAppointmentById,
  updateAppointment,
  deleteAppointment,
  updateVisualMode,
} from '../../features/appointments/appointmentsSlice';
import {
  selectAllInterviewers,
  selectInterviewersById,
} from 'features/interviewers/interviewersSlice';
// Stylesheet
import './AppointmentListItem.scss';

export default function AppointmentListItem(props) {
  const dispatch = useDispatch();

  const allDays = useSelector(selectAllDays);
  const selectedDay = useSelector(selectSelectedDay);
  const day = selectDayEntityBySelectedDay(allDays, selectedDay);
  const dayId = day.id;

  const appointmentId = props.appointmentId;
  const appointment = useSelector((state) =>
    selectAppointmentById(state, appointmentId)
  );

  const allInterviewers = useSelector(selectAllInterviewers);
  const interviewerIds = selectInterviewerIdsBySelectedDay(
    allDays,
    selectedDay
  );
  const interviewers = selectInterviewersById(allInterviewers, interviewerIds);

  let spots = selectSpotsBySelectedDay(allDays, selectedDay);

  // Save (book) a new interview or update an existing one.
  const onSaveHandler = (name, interviewer) => {
    const newAppointment = {
      ...appointment,
      interview: {
        student: name,
        interviewer,
      },
    };
    
    // Decrement the number of spots only if the original appointment
    // interview property is null (i.e. not updating an existing interview).
    if (!appointment.interview) {
      spots--;
    }
    const day = { id: dayId, spots };

    dispatch(
      updateAppointment({ payload: { appointment: newAppointment, day } })
    );
  };

  // Destroy (cancel) an existing interview.
  const onDestroyHandler = () => {
    const newAppointment = {
      ...appointment,
      interview: null,
    };

    // Removing an existing interview will free up a slot,
    // so the number of spots remaining should be incremented.
    spots++;
    const day = { id: dayId, spots };

    dispatch(
      deleteAppointment({ payload: { appointment: newAppointment, day } })
    );
  };

  let content = null;

  if (appointmentId !== 'last') {
    const visualMode = appointment.visualMode;
    const transition = (visualMode) => {
      dispatch(updateVisualMode({ id: appointmentId, visualMode }));
    };
    
    /*
    Formats the interviewer property from
      { ..., interviewer: Number }
    to
      { ..., interviewer: { id, name, avatar } }
    */
    const formatInterview = (allInterviewers, interview) => {
      if (!interview) {
        return null;
      }
      const interviewerId = interview.interviewer;
      return { ...interview, interviewer: allInterviewers[interviewerId] };
    };
    const interview = formatInterview(allInterviewers, appointment.interview);

    switch (visualMode) {
      case 'EMPTY':
        content = <Empty onAdd={() => transition('CREATE')} />;
        break;
      case 'SHOW':
        content = (
          <Show
            student={interview.student}
            interviewer={interview.interviewer.name}
            onEdit={() => transition('UPDATE')}
            onDestroy={() => transition('CONFIRM')}
          />
        );
        break;
      case 'CREATE':
        content = (
          <Form
            interviewers={interviewers}
            onSave={onSaveHandler}
            onCancel={() => transition('EMPTY')}
          />
        );
        break;
      case 'UPDATE':
        content = (
          <Form
            interviewers={interviewers}
            student={interview.student}
            interviewer={interview.interviewer.id}
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
      {appointmentId !== 'last' && <Header time={appointment.time} />}
      {appointmentId === 'last' && <Header time={props.time} />}
      {content}
    </article>
  );
}
