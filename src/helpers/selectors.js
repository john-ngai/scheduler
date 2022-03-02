// Receives two arguments, state and day, and return an array of appointments for the given day.
export const getAppointmentsForDay = (state, name) => {
  let appointmentIDs;
  let appointmentsArray = [];

  // Returns an empty array if the days data is empty.
  if (state.days.length === 0) {
    return [];
  } else {
    let match = false;
    for (const day of state.days) {
      if (day.name === name) {
        appointmentIDs = day.appointments;
        match = true;
      }
    }
    
    // Returns an empty array when the day is not found.
    if (!match) {
      return [];
    }
  }

  for (let id of appointmentIDs) {
    appointmentsArray.push(state.appointments[id]);
  }

  return appointmentsArray;
}

// Receives two arguments, state and day, and return an array of interviewers for the given day.
export const getInterviewersForDay = (state, name) => {
  let interviewerIDs;
  const interviewers = [];

  // Returns an empty array if the days data is empty.
  if (state.days.length === 0) {
    return interviewers;
  
  } else {
    let match = false;
    for (const day of state.days) {
      if (day.name === name) {
        interviewerIDs = day.interviewers;
        match = true;
      }
    }
    
    // Returns an empty array if the day is not found.
    if (!match) {
      return interviewers;
    }
  }

  if (interviewerIDs.length === 0) {
    return interviewers;
  } else {
    for (const id of interviewerIDs) {
      interviewers.push(state.interviewers[id]);
    }
  }

  return interviewers;
}

export const getInterview = (state, interview) => {
  
  // Returns null if no interview is booked.
  if (!interview) {
    return null;
  }
  const interviewers = state.interviewers;
  const id = interview.interviewer;
  
  // Returs the origin interview object if the interviewer's id doesn't match any of the existing interviewers.
  if (!interviewers[id]) {
    return interview;
  }
  interview.interviewer = interviewers[id];
  return interview;
}