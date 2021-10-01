import { object, number, string, date, array, boolean } from 'joi';

export const mobilePhoneDealerSchema = object({
    id: number().allow(null),
    dateInspected: date().required().messages({
        'date.base': `Date should be a type of date`,
    }),
    clientId: number().required(),
    clientName: string().allow(''),
    permitNumber: string().allow(''),
    permitExpiryDate: date().allow(null),
    listOfStocksOfSparesAndAccessories: array().items(
        object({
            particular: string(),
            numberOfUnits: number(),
        })
    ),
    listOfStocksOfMobilePhone: array().items(
        object({
            model: string(),
            imeiNumber: string(),
            source: string()
        })
    ),
    listOfStocksOfSubscriberIdentificationModule: array().items(
        object({
            simNumber: string(),
            mobilePhoneCompany: string(),
        })
    ),
    sundryOfInformation: object({
        one: string().allow(''),
        two: string().allow('')
    }),
    remarksDeficienciesDiscrepanciesNoted: string().allow(''),
    inspectedBy: string().allow(''),
    ownerInfo: object({
        name: string().allow(''),
        position: string().allow('')
    }),
    recommendations: string().allow(''),
    notedBy: string().allow(''),
    regionalDirector: string().allow(''),
    isApproved: boolean()
});