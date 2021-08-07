import { object, number, string } from 'joi';

export const clientSchema = object({
    name: string().required().messages({
        'string.base': `Name should be a type of string`,
    }),
    businessAddress: string().allow(''),
    cellphoneNumber: string(),
    faxNumber: string().allow(''),
    exactLocation: string().allow(''),
    secDtiRegistrationNumber: string().allow(''),
    businessMayorPermitNumber: string().allow(''),
});