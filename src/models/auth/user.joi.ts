import joi from 'joi'
import { User } from './user';

export const userSchema = joi.object<User>({
    name_first: joi.string().required(),
    name_middle: joi.string().allow(''),
    name_last: joi.string().required(),
    position: joi.string().required(),
    user_name: joi.string().alphanum().min(4).max(16).required().trim(),
    password: joi.string(),
    signature: joi.string().allow(''),
});