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

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const SAVING = 'SAVING';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_SAVE2 = 'ERROR_SAVE2';
const DELETING = 'DELETING';
const ERROR_DELETE = 'ERROR_D ELETE';
const CONFIRM = 'CONFIRM';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  // Create and book a new appointment.
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    if (!interview.student || !interview.interviewer) {
      return transition(ERROR_SAVE2);
    }
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  // Cancel a booked appointment.
  const destroy = () => {
    transition(DELETING, true);
    props.cancelInterview()
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onEdit={() => transition(UPDATE)}
          onDestroy={() => transition(CONFIRM)}
        />
      }

      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      }

      {mode === UPDATE &&
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onSave={save}
          onCancel={back}
        />
      }

      {mode === SAVING && <Status message="Saving" />}
      
      {mode === ERROR_SAVE &&
        <Error
          onClose={back}
          message="Could not save appointment. Please try again later."
        />
      }
      {mode === ERROR_SAVE2 &&
        <Error
          onClose={back}
          message="Please enter the student's name AND select an interviewer before saving."
        />
      }

      {mode === CONFIRM &&
        <Confirm
        message="Are you sure you would like to cancel?"
        onCancel={back}
        onConfirm={destroy}
        />
      }
      
      {mode === DELETING && <Status message="Deleting" />}
      
      {mode === ERROR_DELETE &&
        <Error
          onClose={back}
          message="Could not cancel appointment. Please try again later."
        />
      }
    </article>
  );
}