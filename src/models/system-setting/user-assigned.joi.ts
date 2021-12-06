import { object, string } from 'joi';
import { UserAssignedData } from './user_assigned-data';

export const regionalDirectorSchema = object<UserAssignedData>({
    ['user_id']: string().required().messages({
        'string.base': `user_id should be a type of string`,
    }),
    name: string().allow(''),
    position: string().allow(''),
    message: string().allow(''),
});