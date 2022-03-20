import joi from 'joi';

export const radioDealerSchema = joi.object({
    id: joi.number().allow(null),
    dateInspected: joi.date().required().messages({
        'date.base': `Date should be a type of date`,
    }),
    clientId: joi.number().required(),
    clientName: joi.string().allow(''),
    permitNumber: joi.string().allow(''),
    permitExpiryDate: joi.date().allow(null),
    supervisingECE: joi.array().items(
        joi.object({
            name: joi.string(),
            licenseNumber: joi.string(),
            expiryDate: joi.date(),
            ptrNumber: joi.string(),
            dateIssued: joi.date(),
        })
    ),
    radioTechnicians: joi.array().items(
        joi.object({
            name: joi.string(),
            particularsOfLicense: joi.string(),
            expiryDate: joi.date(),
        })
    ),
    diagnosticTestEquipmentAndMeasuringInstrumentInfo: joi.object({
        reflectometer: joi.boolean(),
        frequencyCounter: joi.boolean(),
        powerMeter: joi.boolean(),
        vtvmDigitalMultimeter: joi.boolean(),
        signalGenerator: joi.boolean(),
        oscilloscope: joi.boolean(),
        vomDigitalMultimeter: joi.boolean(),
        dummyLoadAntenna: joi.boolean()
    }),
    isLaboratoryRoomShielded: joi.boolean(),
    remarks: joi.string().allow(''),
    radioRegulationInspector: joi.string().allow(''),
    ownerName: joi.string().allow(''),
    recommendations: joi.string().allow(''),
    regionalDirector: joi.string().allow(''),
    regionalDirectorApproved: joi.boolean().allow(null)
});
