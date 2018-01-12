const FormatTime = (time) => {
  time = time.slice(11, 16);
  
  let hour = time.split(":")[0];
  let minutes = time.split(":")[1];
  let amPM = (hour > 11) ? " pm" : " am";
  if(hour > 12) {
      hour -= 12;
  } else if(hour === 0) {
      hour = "12";
  }
  return hour + ":" + minutes + amPM;
};

export default FormatTime;