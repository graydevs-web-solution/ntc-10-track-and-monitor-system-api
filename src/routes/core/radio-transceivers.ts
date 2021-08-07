import { Router } from 'express';
import * as controllers from '../../controllers/radio-transceivers';

export const router = Router();

router.post('/', controllers.saveRadioTransceivers);

router.get('/', controllers.getList);

router.patch('/', controllers.updateData);

router.delete('/', controllers.deleteData);

router.get('/pdf', controllers.generatePdf);

// router.get('/one', getClient);

// router.get('/search', searchClient);