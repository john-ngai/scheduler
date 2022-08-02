import React from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';
import useVisualMode from 'hooks/useVisualMode';

import { interviewAdded } from '../../app/appointmentsSlice';
import { useDispatch } from 'react-redux';

// Displays the add symbol for an empty/available timeslot.
const EMPTY = 'EMPTY';

// Displays the appoint details (student & interviewer).
const SHOW = 'SHOW';

// Displays a form to create an existing appointment.
const CREATE = 'CREATE';

// Displays a form to edit an appointment with the
// existing data already filled as placeholders.
const UPDATE = 'UPDATE';

// Temporarily displays an animated status message.
const SAVING = 'SAVING';
const DELETING = 'DELETING';

// Displays an appropriate error message and button to close it.
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

// Displays a confirm page with an option to proceed or cancel.
const CONFIRM = 'CONFIRM';

export default function Appointment(props) {
  const dispatch = useDispatch();

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Create and book a new appointment.
  const save = (name, interviewer) => {
    const appointmentId = props.id;
    const interview = {
      student: name,
      interviewer,
    };

    dispatch(interviewAdded({ appointmentId, interview })); // Temporary
    transition(SAVING); // Temporary
    setTimeout(() => transition(SHOW), 1000); // Temporary

    /*transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));/**/
  };

  // Cancel a booked appointment.
  const destroy = () => {
    transition(DELETING, true);
    props
      .cancelInterview()
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onEdit={() => transition(UPDATE)}
          onDestroy={() => transition(CONFIRM)}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}

      {mode === UPDATE && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={back}
        />
      )}

      {mode === SAVING && <Status message="Saving" />}

      {mode === ERROR_SAVE && (
        <Error
          onClose={back}
          message="Could not save appointment. Please try again later."
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to cancel?"
          onCancel={back}
          onConfirm={destroy}
        />
      )}

      {mode === DELETING && <Status message="Deleting" />}

      {mode === ERROR_DELETE && (
        <Error
          onClose={back}
          message="Could not cancel appointment. Please try again later."
        />
      )}
    </article>
  );
}
