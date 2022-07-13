import { Router } from 'express';
import * as controllers from '../../controllers/radio-transceiver/radio-transceivers';

export const router = Router();

router.post('/', controllers.saveRadioTransceivers);

router.get('/', controllers.getList);

router.patch('/', controllers.updateData);

router.delete('/', controllers.deleteData);

router.get('/pdf', controllers.generatePdf);

router.post('/approval', controllers.approvalStatus);

// router.get('/one', getClient);

// router.get('/search', searchClient);