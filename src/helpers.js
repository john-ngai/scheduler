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
}