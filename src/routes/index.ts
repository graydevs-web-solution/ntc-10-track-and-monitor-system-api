import { Express } from 'express';
import { router as clientRouter } from './core/clients';
import { router as radioTransceiver } from './core/radio-transceivers';
import { router as mobilePhoneDealer } from './core/mobile-phone-dealer';
import { router as serviceCenter } from './core/service-center';
import { router as radioDealer } from './core/radio-dealer';
import { router as deficiencyNotice } from './core/deficiency-notice';
import { router as complaint } from './core/complaint';
import { router as auth } from './core/auth';
import { router as systemSettings } from './core/system-settings';
import { router as accomplishmentReport } from './core/accomplishment-report';

export default function (app: Express) {
    app.use('/api/main/client', clientRouter);

    app.use('/api/main/radio-transceiver', radioTransceiver);

    app.use('/api/main/mobile-phone-dealer', mobilePhoneDealer);

    app.use('/api/main/service-center', serviceCenter);

    app.use('/api/main/radio-dealer', radioDealer);

    app.use('/api/main/deficiency-notice', deficiencyNotice);

    app.use('/api/main/complaint', complaint);

    app.use('/api/main/accomplishment-report', accomplishmentReport);

    app.use('/api/auth', auth);

     app.use('/api/system-setting', systemSettings);
};
