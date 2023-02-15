import {
  getNextDailyResetLocal,
  getNextWeeklyResetLocal,
} from '../helpers/resetHelpers';
import { useEffect, useState } from 'react';

type Result = {
  daily: Date;
  weekly: Date;
};

export const useResets = (): Result => {
  const [currDate, setCurrDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrDate(new Date());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    daily: getNextDailyResetLocal(currDate),
    weekly: getNextWeeklyResetLocal(currDate),
  };
};
