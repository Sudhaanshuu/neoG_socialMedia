var moment = require("moment");

export const getPostedTime = (date1, date2) => {
  let timeDifference = (date1.getTime() - date2.getTime()) / 1000;
  timeDifference /= 60;
  let timeInMinutes = Math.abs(Math.round(timeDifference));

  if (timeInMinutes > 525599) {
    return moment(date1).format("MMM D, YYYY");
  } else if (timeInMinutes > 1439) {
    return moment(date1).format("MMM D");
  }
  if (timeInMinutes > 59) {
    timeInMinutes = Math.abs(Math.round(timeInMinutes / 60));
    if (timeInMinutes === 1) {
      return `${timeInMinutes.toString()} hr`;
    }
    return `${timeInMinutes.toString()} hrs`;
  } else if (timeInMinutes > 0) {
    return `${timeInMinutes.toString()} mins`;
  } else {
    return "just now";
  }
};
