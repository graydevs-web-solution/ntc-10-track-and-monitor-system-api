import joi from 'joi';
import { AuthenticateUser } from './authenticate-user';

export const authUserSchema = joi.object<AuthenticateUser>({
    username: joi.string().alphanum().min(4).max(16).required().trim(),
    password: joi.string().required(),
});