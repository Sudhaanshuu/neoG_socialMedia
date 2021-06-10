var moment = require('moment');

export const getPostedTime = (date1, date2) => {

    var timeDifference = (date1.getTime() - date2.getTime()) / 1000;
    timeDifference /= 60;
    let timeInMinutes = Math.abs(Math.round(timeDifference));
    if (timeInMinutes > 525599) {
        return moment(date1).format("MMM D, YYYY");
    } else if (timeInMinutes > 1439) {
        return moment(date1).format("MMM D");
    }
    if (timeInMinutes > 59) {
        if ((timeInMinutes / 60) === 1) {
            return `${(timeInMinutes/60).toString()} hr`;
        }
        return `${(timeInMinutes/60).toString()} hrs`;
    } else if (timeInMinutes > 0) {
        return `${(timeInMinutes).toString()} mins`;
    } else {
        return 'just now';
    }

}
