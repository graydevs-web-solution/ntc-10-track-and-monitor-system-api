import { DateTime } from 'luxon';
import { User } from '../models/auth/user';

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

export const formatName = (data: User): string => {
  return `${data.name_first} ${data.name_last}`;
};

export const formatData = (val: any) => ({
        ...val,
        ['regional_director_info']: {
            ...val['regional_director_info'],
            ['name']: `${val['regional_director_info']?.name_first} ${val['regional_director_info']?.name_last}`
        },
        ['noted_by_info']: {
            ...val['noted_by_info'],
            ['name']: `${val['noted_by_info']?.name_first} ${val['noted_by_info']?.name_last}`
        }
    });

export const formatData2 = (val: any) => ({
        ...val,
        ['regional_director_info']: {
            ...val['regional_director_info'],
            ['name']: `${val['regional_director_info']?.name_first} ${val['regional_director_info']?.name_last}`
        },
    })