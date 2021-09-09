import { object, number, string, date, array, boolean } from 'joi';

export const serviceCenterReportSchema = object({
    id: number().allow(null),
    dateInspected: date().required().messages({
        'date.base': `Date should be a type of date`,
    }),
    clientId: number().required(),
    clientName: string().allow(''),
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
        one: string(),
        two: string(),
        three: string()
    }),
    remarksDeficienciesDiscrepanciesNoted: string().allow(''),
    inspectedBy: string().allow(''),
    ownerInfo: object({
        name: string(),
        position: string()
    }),
    recommendations: string().allow(''),
    notedBy: string().allow(''),
    regionalDirector: string().allow(''),
    isApproved: boolean()
});