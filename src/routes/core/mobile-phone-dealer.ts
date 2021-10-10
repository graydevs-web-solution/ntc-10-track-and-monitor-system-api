import { Router } from 'express';
import * as controllers from '../../controllers/mobile-phone-dealer/mobile-phone-dealer';

export const router = Router();

router.post('/', controllers.saveMobilePhoneDealer);

router.get('/', controllers.getList);

router.patch('/', controllers.updateData);

router.delete('/', controllers.deleteData);

router.get('/pdf', controllers.generatePdf);

// router.get('/one', getClient);

// router.get('/search', searchClient);