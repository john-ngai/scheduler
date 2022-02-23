import React from 'react';
import "components/DayListItem";
import DayListItem from 'components/DayListItem';

export default function DayList(props) {
  const listItems = props.days.map(day =>
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={() => props.onChange(day.name)}
    />
  );

  return (
    <ul>{listItems}</ul>
  );
}