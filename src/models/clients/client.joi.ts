import joi from 'joi';
import { Client } from './client.model';

export const clientSchema = joi.object<Client>({
    ownerName: joi.string().required().messages({
        'string.base': `ownerName should be a type of string`,
    }),
    ownerPosition: joi.string().required(),
    businessName: joi.string().required().messages({
        'string.base': `businessName should be a type of string`,
    }),
    businessAddress: joi.string().required(),
    cellphoneNumber: joi.string().required(),
    faxNumber: joi.string().allow(''),
    exactLocation: joi.string().allow(''),
    secDtiRegistrationNumber: joi.string().allow(''),
    businessMayorPermitNumber: joi.string().allow(''),
});