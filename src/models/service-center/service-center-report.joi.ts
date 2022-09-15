import joi from 'joi';

export const serviceCenterReportSchema = joi.object({
    id: joi.number().allow(null),
    dateInspected: joi.date().required().messages({
        'date.base': `Date should be a type of date`,
    }),
    clientId: joi.number().required(),
    clientName: joi.string().allow(''),
    permitNumber: joi.string().allow(''),
    permitExpiryDate: joi.date().allow(null),
    listOfServiceOrTestEquipments: joi.array().items(
        joi.object({
            particular: joi.string(),
            numberOfUnits: joi.number(),
        })
    ),
    employedElectronicsTechnicians: joi.array().items(
        joi.object({
            name: joi.string(),
            qualifications: joi.string(),
        })
    ),
    sundryOfInformation: joi.object({
        oneCb: joi.string().allow(''),
        twoCb: joi.string().allow(''),
        threeCb: joi.string().allow(''),
    }),
    remarksDeficienciesDiscrepanciesNoted: joi.string().allow(''),
    inspectedBy: joi.string().allow(''),
    ownerInfo: joi.object({
        name: joi.string().allow(''),
        position: joi.string().allow(''),
    }),
    recommendations: joi.string().allow(''),
    notedBy: joi.string().allow(''),
    notedByInfo: joi.object().allow(),
    notedByApproved: joi.string().allow(null).allow(''),
    regionalDirector: joi.string().allow(''),
    regionalDirectorInfo: joi.object().allow(),
    regionalDirectorApproved: joi.string().allow(null).allow(''),
});