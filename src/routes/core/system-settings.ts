import { Router } from 'express';
import * as controllers from '../../controllers/system-settings';

export const router = Router();

router.get('/regional-director', controllers.getRegionalDirector);

router.post('/regional-director', controllers.updateData);

router.get('/form-counters', controllers.getAllFormCounters);

// router.patch('/', controllers.updateData);

// router.delete('/', controllers.deleteData);

// router.get('/pdf', controllers.generatePdf);

// router.get('/one', getClient);

// router.get('/search', searchClient);