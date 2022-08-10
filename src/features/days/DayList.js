import React from 'react';
import DayListItem from './DayListItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllDays, daySelected } from '../../features/days/daysSlice';

export default function DayList() {
  const dispatch = useDispatch();

  const allDays = useSelector(selectAllDays);
  const selectedDay = useSelector((state) => state.days.selectedDay);

  const listItems = allDays.map((day) => (
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
