import { format, addDays, startOfWeek } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(date, 'd MMM');
};

export const formatTime = (date: Date): string => {
  return format(date, 'h:mm');
};

export const getWeekDays = (date: Date): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

export const getDayName = (date: Date): string => {
  return format(date, 'EEE').toUpperCase();
};

export const getDayNumber = (date: Date): string => {
  return format(date, 'd');
};
