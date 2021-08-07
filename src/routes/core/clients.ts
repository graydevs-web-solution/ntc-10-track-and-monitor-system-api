import { Router } from 'express';
import { getClients, saveClient, getClient, searchClient } from '../../controllers/clients';

export const router = Router();

router.post('/', saveClient);

router.get('/', getClients);

router.get('/one', getClient);

router.get('/search', searchClient);