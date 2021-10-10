import { object, number, string } from 'joi';
import { Client } from './client.model';

export const clientSchema = object<Client>({
    ownerName: string().required().messages({
        'string.base': `ownerName should be a type of string`,
    }),
    ownerPosition: string().allow(''),
    businessName: string().required().messages({
        'string.base': `businessName should be a type of string`,
    }),
    businessAddress: string().allow(''),
    cellphoneNumber: string(),
    faxNumber: string().allow(''),
    exactLocation: string().allow(''),
    secDtiRegistrationNumber: string().allow(''),
    businessMayorPermitNumber: string().allow(''),
});