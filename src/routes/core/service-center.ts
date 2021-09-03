import { Router } from 'express';
import * as controllers from '../../controllers/service-center';

export const router = Router();

router.post('/', controllers.saveServiceCenter);

router.get('/', controllers.getList);

router.patch('/', controllers.updateData);

router.delete('/', controllers.deleteData);

// router.get('/pdf', controllers.generatePdf);

// router.get('/one', getClient);

// router.get('/search', searchClient);