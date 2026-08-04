import { format, parseISO } from 'date-fns';

export const formatDate = (dateString: string, formatStr: string = 'PP'): string => {
  try {
    return format(parseISO(dateString), formatStr);
  } catch {
    return dateString;
  }
};

export const formatRelativeTime = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'yyyy-MM-dd HH:mm');
  } catch {
    return dateString;
  }
};
