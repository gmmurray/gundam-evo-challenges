import { DAILY_RESET_HOUR_UTC, WEEKLY_RESET_DAY_UTC } from '../data/resets';

const getResetTodayUTC = () => {
  const curr = new Date(
    new Date().toLocaleString('en-us', { timeZone: 'UTC' }),
  );

  curr.setHours(DAILY_RESET_HOUR_UTC);
  curr.setMilliseconds(0);
  curr.setSeconds(0);
  curr.setMinutes(0);
  return curr;
};

const getResetTomorrowUTC = () => {
  const today = getResetTodayUTC();
  today.setDate(today.getDate() + 1);
  return today;
};

const getNextDailyResetUTC = (curr: Date): Date => {
  const today = getResetTodayUTC();
  const tomorrow = getResetTomorrowUTC();
  if (curr.getTime() > today.getTime()) {
    return tomorrow;
  } else {
    return today;
  }
};

const getNextWeeklyResetUTC = (curr: Date): Date => {
  const dailyReset = getNextDailyResetUTC(curr);

  // if today is reset day
  if (curr.getDay() === WEEKLY_RESET_DAY_UTC) {
    // if the reset already happened today, return next week
    if (dailyReset.getDay() !== curr.getDay()) {
      dailyReset.setDate(dailyReset.getDate() + 7);
      return dailyReset;
    }

    // return today's daily reset
    return dailyReset;
  } else {
    // if the reset is not today, return the next weekly
    const nextWeekly = getResetTodayUTC();
    // if today is before the reset, it is still this week
    if (curr.getDay() < WEEKLY_RESET_DAY_UTC) {
      nextWeekly.setDate(
        nextWeekly.getDate() + (WEEKLY_RESET_DAY_UTC - curr.getDay()),
      );
      return nextWeekly;
    } else {
      // otherwise it is next week
      nextWeekly.setDate(nextWeekly.getDate() + (7 - WEEKLY_RESET_DAY_UTC));
    }
    return nextWeekly;
  }
};

const convertLocalToUTC = (local: Date): Date => {
  return new Date(local.toLocaleString('en-us', { timeZone: 'UTC' }));
};

const convertUTCtoLocal = (utc: Date): Date => {
  const newDate = new Date(utc);
  newDate.setHours(utc.getHours() - newDate.getTimezoneOffset() / 60);
  return newDate;
};

export const getNextDailyResetLocal = (curr: Date): Date => {
  const currUTC = convertLocalToUTC(curr);
  const result = getNextDailyResetUTC(currUTC);
  return convertUTCtoLocal(result);
};

export const getNextWeeklyResetLocal = (curr: Date): Date => {
  const currUTC = convertLocalToUTC(curr);
  const result = getNextWeeklyResetUTC(currUTC);
  return convertUTCtoLocal(result);
};
