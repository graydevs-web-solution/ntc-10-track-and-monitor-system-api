import { object, string } from 'joi'
import { User } from './user';

export const userSchema = object<User>({
    name_first: string().required(),
    name_middle: string().allow(''),
    name_last: string().required(),
    position: string().required(),
    user_name: string().alphanum().min(4).max(16).required().trim(),
    password: string(),
});