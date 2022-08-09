import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DayListItem from './DayListItem';
import { daySelected } from '../../features/days/daysSlice';

export default function DayList() {
  const dispatch = useDispatch();

  const daysList = useSelector((state) => state.days.daysList);
  const selectedDay = useSelector((state) => state.days.selectedDay);

  const listItems = daysList.map((day) => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === selectedDay}
      setDay={() => dispatch(daySelected({ selectedDay: day.name }))}
    />
  ));

  return <ul>{listItems}</ul>;
}
