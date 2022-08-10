/**
 * Returns a formatted interview argument:
 *  from  { student: String, interviewer: Number }
 *  to    { student: String, interviewer: { id, name, avatar } }
 */
export const formatInterview = (allInterviewers, interview) => {
  // If no interview is booked (null), return null.
  if (!interview) {
    return null;
  }

  // const interviewers = state.interviewers;

  const selectedInterviewerId = interview.interviewer;

  return { ...interview, interviewer: allInterviewers[selectedInterviewerId] };
};
