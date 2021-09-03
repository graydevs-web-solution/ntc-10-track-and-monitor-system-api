import { Express } from 'express';
import { router as clientRouter } from './core/clients';
import { router as radioTransceiver } from './core/radio-transceivers';
import { router as mobilePhoneDealer } from './core/mobile-phone-dealer';
import { router as serviceCenter } from './core/service-center';
import { router as radioDealer } from './core/radio-dealer';

export default function (app: Express) {
    app.use('/api/main/client', clientRouter);

    app.use('/api/main/radio-transceiver', radioTransceiver);

    app.use('/api/main/mobile-phone-dealer', mobilePhoneDealer);

    app.use('/api/main/service-center', serviceCenter);

    app.use('/api/main/radio-dealer', radioDealer);
};
