import { Express } from 'express';
import { router as clientRouter } from './core/clients';
import { router as radioTransceiver } from './core/radio-transceivers';


export default function (app: Express) {
    app.use('/api/main/client', clientRouter);

    app.use('/api/main/radio-transceiver', radioTransceiver);
};
