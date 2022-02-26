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
    match ? null : [];
  }

  for (let id of appointmentIDs) {
    id = id.toString();    
    appointmentsArray.push(state.appointments[id]);
  }

  return appointmentsArray;
}
