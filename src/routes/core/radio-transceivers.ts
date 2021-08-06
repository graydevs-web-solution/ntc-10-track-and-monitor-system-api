import { Router } from 'express';
import * as controllers from '../../controllers/core/radio-transceivers';

export const router = Router();

router.post('/', controllers.saveRadioTransceivers);

router.get('/', controllers.getList);

router.patch('/', controllers.updateData);

router.delete('/', controllers.deleteData);

// router.get('/one', getClient);

// router.get('/search', searchClient);