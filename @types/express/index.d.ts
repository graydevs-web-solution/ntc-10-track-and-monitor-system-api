/* eslint-disable no-unused-vars */
declare global {
    namespace Express {
        interface Request {
            userData: any;
        }
    }
}
