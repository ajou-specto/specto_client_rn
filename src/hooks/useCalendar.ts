import { useState } from 'react';
import { getDaysInMonth, subMonths } from 'date-fns';

const DAYS_IN_WEEK = 7;
const DAY_LABEL = ['일', '월', '화', '수', '목', '금', '토'];
const DEFAULT_TRASH_VALUE = 0;
const CALENDAR_LENGTH = 35;

const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getCalendarForMonth = (date: Date) => {
    const totalMonthDays = getDaysInMonth(date);
    const prevDays = Array.from({
      length: Math.max(0, date.getDay()),
    }).map(() => ({ day: DEFAULT_TRASH_VALUE, date: null }));
    const currentDays = Array.from({ length: totalMonthDays }).map((_, i) => ({
      day: i + 1,
      date: new Date(date.getFullYear(), date.getMonth(), i + 1),
    }));
    const nextDays = Array.from({
      length: CALENDAR_LENGTH - currentDays.length - prevDays.length,
    }).map(() => ({ day: DEFAULT_TRASH_VALUE, date: null }));

    const allDays = [...prevDays, ...currentDays, ...nextDays];
    const weeks = [];
    for (let i = 0; i < allDays.length; i += DAYS_IN_WEEK) {
      weeks.push(allDays.slice(i, i + DAYS_IN_WEEK));
    }
    return weeks;
  };

  const setPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const setNextMonth = () => {
    setCurrentDate(subMonths(currentDate, -1));
  };

  const isEqualDate = (d1: Date, d2: Date) => {
    return (
      d1?.getFullYear() === d2?.getFullYear() &&
      d1?.getMonth() === d2?.getMonth() &&
      d1?.getDate() === d2?.getDate()
    );
  };

  return {
    currentMonthCalendar: getCalendarForMonth(currentDate),
    currentDate,
    setPreviousMonth,
    setNextMonth,
    DAY_LABEL,
    isEqualDate,
  };
};

export default useCalendar;
