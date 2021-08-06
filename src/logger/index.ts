import logger from 'pino';
import { DateTime } from 'luxon';

const log = logger({
    prettyPrint: true,
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)}"`
});

export default log;