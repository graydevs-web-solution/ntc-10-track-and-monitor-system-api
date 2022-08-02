import { Router } from 'express';
import * as controllers from '../../controllers/radio-dealer/radio-dealer';

export const router = Router();

router.post('/', controllers.saveRadioDealer);

router.get('/', controllers.getList);

router.patch('/', controllers.updateData);

router.delete('/', controllers.deleteData);

router.get('/pdf', controllers.generatePdf);

router.post('/approval', controllers.approvalStatus);

// router.get('/one', getClient);

// router.get('/search', searchClient);