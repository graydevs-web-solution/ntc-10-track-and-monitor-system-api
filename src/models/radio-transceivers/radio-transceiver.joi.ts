import { object, number, string, date, array, boolean } from 'joi';

export const radioTransceiverSchema = object({
    id: number().allow(null),
    dateIssued: date().required().messages({
        'date.base': `Date should be a type of date`,
    }),
    clientId: number().required(),
    classType: string().allow(''),
    natureOfService: string().allow(''),
    workingHours: string().allow(''),
    formType: string().allow(''),
    callSign: string().allow(''),
    motorNumber: string().allow(''),
    plateNumber: string().allow(''),
    grossTonnage: string().allow(''),
    ppInfo: object({
        ppNumber: string().allow(''),
        dateIssued: date().allow(null),
    }),
    tpInfo: object({
        tpNumber: string().allow(''),
        expirationDate: date().allow(null),
    }),
    cpInfo: object({
        cpNumber: string().allow(''),
        expirationDate: date().allow(null),
    }),
    licInfo: object({
        licNumber: string().allow(''),
        expirationDate: date().allow(null),
    }),
    pointsOfCommunication: string().allow(''),
    operators: array().items(
        object({
            id: number().allow(null),
            name: string().allow(''),
            particularOfLicense: string().allow(''),
            expirationDate: date().allow(null)
        })
    ),
    radioTransceivers: array().items(
        object({
            id: number().allow(null),
            model: string().allow(''),
            serialNumber: string().allow(''),
            freqRange: string().allow(''),
            powerOutput: string().allow(''),
            freqControl: string().allow(''),
        })
    ),
    frequenciesInfo: object({
        assignedFreq: string().allow(''),
        crystalFreq: string().allow(''),
        measuredFreq: string().allow(''),
        ifReceiver: string().allow(''),
        typeOfEmission: string().allow(''),
        antennaSystemType: string().allow(''),
        elevationFromGmd: string().allow(''),
        lengthOfRadiator: string().allow(''),
        gain: string().allow(''),
        directivity: string().allow(''),
        powerSupply: string().allow(''),
        battery: string().allow(''),
        voltageAndType: string().allow(''),
        capacity: string().allow(''),
        ah: string().allow(''),
    }),
    illegalConstructionInfo: object({
        constructionsOfRadioStationsWithoutConstructionPermit: boolean(),
        illegalTransfer: boolean(),
    }),
    illegalOperationInfo: object({
        operationWithoutRadioStationLicensePermit: boolean(),
        operationWithoutLicenseRadioOperator: boolean(),
        operationWithoutLogbook: boolean(),
        operationOnLowerSideband: boolean(),
        operationOnUnauthorizedHours: boolean(),
        operatingOnUnauthorizedFrequency: boolean(),
        offFrequency: boolean(),
        stillInTheOldFrequencyGrouping: boolean(),
    }),
    illegalPossession: boolean(),
    others: string().allow(''),
    sundrayInformationAboutRS: object({
        isRadioOperatorEntryLogbooK: string().allow(''),
        isStationProduceUnwantedSignals: string().allow(''),
        isRadioEquipmentOperativeOnInspection: string().allow(''),
    }),
    authorizedRepresentative: string().allow(''),
    radioRegulationInspector: string().allow(''),
    recommendations: string().allow(''),
    notedBy: string().allow(''),
    regionalDirector: string().allow(''),
});