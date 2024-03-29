import React from 'react';
import classNames from 'classnames';
import './DayListItem.scss';

// Describes the number of interview slots remaining for a given day.
export default function DayListItem(props) {
  let dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots,
  });

  const formatSpots = (spots) => {
    if (spots === 0) {
      return 'no spots remaining';
    }

    if (spots === 1) {
      return '1 spot remaining';
    }

    if (spots > 1) {
      return `${spots} spots remaining`;
    }
  };

  return (
    <li className={dayClass} onClick={props.setDay} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
