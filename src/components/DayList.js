import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DayListItem from 'components/DayListItem';
import { daySelected } from '../app/daysSlice';

export default function DayList() {
  const dispatch = useDispatch();

  const reduxState = useSelector((state) => state);
  const reduxDays = reduxState.days.daysList;
  /** reduxDays =
   * [
   *   {
   *     id: Number,
   *     name: String,
   *     appointments: Array,
   *     interviewers: Array,
   *     spots: Number
   *   },
   *   {…}, {…}, {…}, {…}
   * ]
   */
  const reduxDay = reduxState.days.selectedDay;

  const listItems = reduxDays.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === reduxDay}
      setDay={() => dispatch(daySelected({ selectedDay: day.name }))}
    />
  ));

  return <ul>{listItems}</ul>;
}
