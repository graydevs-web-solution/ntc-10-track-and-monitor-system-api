import { Router } from 'express';
import { authenticateUser, createUser, getUsers, updateUser, updateUserPassword, searchUser, getSignature, saveSignature } from '../../controllers/auth/auth';

export const router = Router();

router.post('/', authenticateUser);

router.post('/new-user', createUser);

router.patch('/update-user-info', updateUser);

router.get('/update-user-password', updateUserPassword);

router.get('/users', getUsers);

router.get('/search', searchUser);

router.post('/signature', getSignature);

router.post('/update-signature', saveSignature);