import { DateTime } from 'luxon';

export const dateWithPadding = (data: string): string => {
  const [year, month, day] = data.split('-');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

export const dateToString = (data: Date): string => {
    return data ?  DateTime.fromISO((data).toISOString()).toLocaleString(DateTime.DATE_MED) : '';
}

export const cleanDate = (date: Date) : Date | null => {
    if (!date) {
        return null
    }
    return date;
}