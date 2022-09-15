import joi from 'joi'
import { User } from './user';

export const userSchema = joi.object<User>({
    user_id: joi.string().allow(''),
    name_first: joi.string().required(),
    name_middle: joi.string().allow(''),
    name_last: joi.string().required(),
    position: joi.string().required(),
    designation: joi.string().allow(''),
    user_name: joi.string().min(4).max(16).required().trim(),
    password: joi.string(),
    signature: joi.string().allow(''),
});