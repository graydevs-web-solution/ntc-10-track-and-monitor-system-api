import joi from 'joi';

export const mobilePhoneDealerSchema = joi.object({
    id: joi.number().allow(null),
    dateInspected: joi.date().required().messages({
        'date.base': `Date should be a type of date`,
    }),
    clientId: joi.number().required(),
    clientName: joi.string().allow(''),
    permitNumber: joi.string().allow(''),
    permitExpiryDate: joi.date().allow(null),
    listOfStocksOfSparesAndAccessories: joi.array().items(
        joi.object({
            particular: joi.string(),
            numberOfUnits: joi.number(),
        })
    ),
    listOfStocksOfMobilePhone: joi.array().items(
        joi.object({
            model: joi.string(),
            imeiNumber: joi.string(),
            source: joi.string()
        })
    ),
    listOfStocksOfSubscriberIdentificationModule: joi.array().items(
        joi.object({
            simNumber: joi.string(),
            mobilePhoneCompany: joi.string(),
        })
    ),
    sundryOfInformation: joi.object({
        one: joi.string().allow(''),
        two: joi.string().allow('')
    }),
    remarksDeficienciesDiscrepanciesNoted: joi.string().allow(''),
    inspectedBy: joi.string().allow(''),
    ownerInfo: joi.object({
        name: joi.string().allow(''),
        position: joi.string().allow('')
    }),
    recommendations: joi.string().allow(''),
    notedBy: joi.string().allow(''),
    regionalDirector: joi.string().allow(''),
    isApproved: joi.boolean().allow(null)
});