import React from 'react';
import FormatTime from './FormatTime';

const SystemTime = ({system_time, is_open_for_business}) => {
  const systemTime = FormatTime(system_time);
  const openClosed = (is_open_for_business ? "We're Open" : "We're Closed");
  const colourClass = (openClosed === "We're Open" ? "green" : "red");
  
  return (
    <div className="system-time">
      <div>
        <h2 id="open-closed" className={colourClass} >{openClosed}</h2>
      </div>
      <div>
        <h1>{systemTime}</h1>
      </div>
    </div>
  );
};
  
  

export default SystemTime;