import { object, number, string, date, array, boolean } from 'joi';

export const serviceCenterReportSchema = object({
    id: number().allow(null),
    dateInspected: date().required().messages({
        'date.base': `Date should be a type of date`,
    }),
    clientId: number().required(),
    clientName: string().allow(''),
    permitNumber: string().allow(''),
    permitExpiryDate: date().allow(null),
    listOfServiceOrTestEquipments: array().items(
        object({
            particular: string(),
            numberOfUnits: number(),
        })
    ),
    employedElectronicsTechnicians: array().items(
        object({
            name: string(),
            qualifications: string(),
        })
    ),
    sundryOfInformation: object({
        one: string().allow(''),
        two: string().allow(''),
        three: string().allow(''),
    }),
    remarksDeficienciesDiscrepanciesNoted: string().allow(''),
    inspectedBy: string().allow(''),
    ownerInfo: object({
        name: string().allow(''),
        position: string().allow(''),
    }),
    recommendations: string().allow(''),
    notedBy: string().allow(''),
    regionalDirector: string().allow(''),
    isApproved: boolean()
});