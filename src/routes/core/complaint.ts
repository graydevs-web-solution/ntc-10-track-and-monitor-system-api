import { Router } from 'express';
import * as controllers from '../../controllers/complaint/complaint';

export const router = Router();

router.post('/', controllers.saveOne);

router.get('/', controllers.getList);

router.patch('/', controllers.updateData);

router.delete('/', controllers.deleteData);

router.get('/pdf', controllers.generatePdf);

// router.get('/one', getClient);

// router.get('/search', searchClient);