import React from 'react';
import FormatTime from './FormatTime';

const OpenHours = ({open_hours_today}) => {
  const openTime = FormatTime(open_hours_today.open_at);
  const closeTime = FormatTime(open_hours_today.close_at);

  return (
    <div className="open-hours">
      <h3>Today's Hours:</h3>
      <p className="time">
          {openTime}
      </p>
      <p>to</p>
      <p className="time">
          {closeTime}
      </p>
    </div>
  );
};

export default OpenHours;