// Return true only when all of the state data is loaded.
export const isStateLoaded = (state) => {
  const daysList = state.days.daysList;
  const appointments = state.appointments;
  const interviewers = state.interviewers;

  if (daysList.length === 0) {
    return false;
  }

  if (Object.keys(appointments).length === 0) {
    return false;
  }

  if (Object.keys(interviewers).length === 0) {
    return false;
  }

  return true;
};

/**
 * Returns a formatted interview argument:
 *  from  { student: String, interviewer: Number }
 *  to    { student: String, interviewer: { id, name, avatar } }
 */
export const formatInterview = (state, interview) => {
  // If no interview is booked (null), return null.
  if (!interview) {
    return null;
  }

  const interviewers = state.interviewers;
  const selectedInterviewerId = interview.interviewer;

  return { ...interview, interviewer: interviewers[selectedInterviewerId] };
};
