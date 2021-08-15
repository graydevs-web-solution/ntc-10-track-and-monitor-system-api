import cors from 'cors';
import log from '../logger/index';

export default function() {
    const whitelist = [process.env.DOMAIN_URL];

    const corsOptions = {
        origin: (origin: any, callback: any) => {
            if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
            } else {
                log.error(new Error('Not allowed by CORS'))
                // callback(new Error('Not allowed by CORS'))
            }
        },
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    };

    return cors(corsOptions);
}