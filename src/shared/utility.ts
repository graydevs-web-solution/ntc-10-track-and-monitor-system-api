import { DateTime } from 'luxon';

export const dateWithPadding = (data: string): string => {
  const [year, month, day] = data.split('-');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

export const dateToString = (data: Date): string => data ?  DateTime.fromISO((data).toISOString()).toLocaleString(DateTime.DATE_MED) : '';

export const timeToString = (data: Date): string => { 
    const dateValue = DateTime.fromISO((data).toISOString());
    const hour = dateValue.hour <= 12 ? dateValue.hour : (dateValue.hour - 12) !== 12 ? dateValue.hour - 12 : '00';
    const minute = `${dateValue.minute}`.padStart(2, '0');
    let meridian = 'AM'
    if ((dateValue.hour - 12) <= 11) {
        meridian = 'PM'
    }
    return `${hour}:${minute} ${meridian}`;
}

export const cleanDate = (date: Date) : Date | null => {
    if (!date) {
        return null
    }
    return date;
}