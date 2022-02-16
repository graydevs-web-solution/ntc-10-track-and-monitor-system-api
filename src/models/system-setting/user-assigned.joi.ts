import joi from 'joi';
import { UserAssignedData } from './user_assigned-data';

export const regionalDirectorSchema = joi.object<UserAssignedData>({
    ['user_id']: joi.string().required().messages({
        'string.base': `user_id should be a type of string`,
    }),
    name: joi.string().allow(''),
    position: joi.string().allow(''),
    message: joi.string().allow(''),
});