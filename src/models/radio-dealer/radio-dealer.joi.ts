import { object, number, string, date, array, boolean } from 'joi';

export const radioDealerSchema = object({
    id: number().allow(null),
    dateInspected: date().required().messages({
        'date.base': `Date should be a type of date`,
    }),
    clientId: number().required(),
    clientName: string().allow(''),
    permitNumber: string().allow(''),
    permitExpiryDate: date().allow(null),
    supervisingECE: array().items(
        object({
            name: string(),
            licenseNumber: string(),
            expiryDate: date(),
            ptrNumber: string(),
            dateIssued: date(),
        })
    ),
    radioTechnicians: array().items(
        object({
            name: string(),
            particularsOfLicense: string(),
            expiryDate: date(),
        })
    ),
    diagnosticTestEquipmentAndMeasuringInstrumentInfo: object({
        reflectometer: boolean(),
        frequencyCounter: boolean(),
        powerMeter: boolean(),
        vtvmDigitalMultimeter: boolean(),
        signalGenerator: boolean(),
        oscilloscope: boolean(),
        vomDigitalMultimeter: boolean(),
        dummyLoadAntenna: boolean()
    }),
    isLaboratoryRoomShielded: boolean(),
    remarks: string().allow(''),
    radioRegulationInspector: string().allow(''),
    ownerName: string().allow(''),
    recommendations: string().allow(''),
    regionalDirector: string().allow(''),
});
