import { Router } from 'express';
import { getClients, saveClient, getClient, searchClient } from '../../controllers/core/clients';

export const clientRouter = Router();

clientRouter.post('/', saveClient);

clientRouter.get('/', getClients);

clientRouter.get('/one', getClient);

clientRouter.get('/search', searchClient);