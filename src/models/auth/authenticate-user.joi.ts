import { object, string } from 'joi';
import { AuthenticateUser } from './authenticate-user';

export const authUserSchema = object<AuthenticateUser>({
    username: string().alphanum().min(4).max(16).required().trim(),
    password: string().required(),
});