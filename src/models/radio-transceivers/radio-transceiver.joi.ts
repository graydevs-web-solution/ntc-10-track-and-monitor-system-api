import joi from 'joi';

export const radioTransceiverSchema = joi.object({
    id: joi.number().allow(null),
    dateIssued: joi.date().required().messages({
        'date.base': `Date should be a type of date`,
    }),
    clientName: joi.string().allow(''),
    clientId: joi.number().required(),
    classType: joi.string().allow(''),
    natureOfService: joi.string().allow(''),
    workingHours: joi.string().allow(''),
    formType: joi.string().allow(''),
    callSign: joi.string().allow(''),
    motorNumber: joi.string().allow(''),
    plateNumber: joi.string().allow(''),
    grossTonnage: joi.string().allow(''),
    ppInfo: joi.object({
        ppNumber: joi.string().allow(''),
        dateIssued: joi.date().allow(null),
    }),
    tpInfo: joi.object({
        tpNumber: joi.string().allow(''),
        expirationDate: joi.date().allow(null),
    }),
    cpInfo: joi.object({
        cpNumber: joi.string().allow(''),
        expirationDate: joi.date().allow(null),
    }),
    licInfo: joi.object({
        licNumber: joi.string().allow(''),
        expirationDate: joi.date().allow(null),
    }),
    pointsOfCommunication: joi.string().allow(''),
    operators: joi.array().items(
        joi.object({
            id: joi.number().allow(null),
            name: joi.string().allow(''),
            particularOfLicense: joi.string().allow(''),
            expirationDate: joi.date().allow(null)
        })
    ),
    radioTransceivers: joi.array().items(
        joi.object({
            id: joi.number().allow(null),
            model: joi.string().allow(''),
            serialNumber: joi.string().allow(''),
            freqRange: joi.string().allow(''),
            powerOutput: joi.string().allow(''),
            freqControl: joi.string().allow(''),
        })
    ),
    receivers: joi.array().items(
        joi.object({
            id: joi.number().allow(null),
            name: joi.string().allow(''),
            serialNumber: joi.string().allow(''),
            freqRange: joi.string().allow(''),
            powerOutput: joi.string().allow(''),
            freqControl: joi.string().allow(''),
        })
    ),
    otherEquipments: joi.array().items(
        joi.object({
            id: joi.number().allow(null),
            name: joi.string().allow(''),
            serialNumber: joi.string().allow(''),
            freqRange: joi.string().allow(''),
            powerOutput: joi.string().allow(''),
            freqControl: joi.string().allow(''),
        })
    ),
    frequenciesInfo: joi.object({
        assignedFreq: joi.string().allow(''),
        crystalFreq: joi.string().allow(''),
        measuredFreq: joi.string().allow(''),
        ifReceiver: joi.string().allow(''),
        typeOfEmission: joi.string().allow(''),
    }),
    antennaSystemInfo: joi.object({
                type: joi.string().allow(''),
        elevationFromGmd: joi.string().allow(''),
        lengthOfRadiator: joi.string().allow(''),
        gain: joi.string().allow(''),
        directivity: joi.string().allow(''),
        powerSupply: joi.string().allow(''),
        battery: joi.string().allow(''),
        voltageAndType: joi.string().allow(''),
        capacity: joi.string().allow(''),
        ah: joi.string().allow(''),
    }),
    illegalConstructionInfo: joi.object({
        constructionsOfRadioStationsWithoutConstructionPermit: joi.boolean(),
        illegalTransfer: joi.boolean(),
    }),
    illegalOperationInfo: joi.object({
        operationWithoutRadioStationLicensePermit: joi.boolean(),
        operationWithoutLicenseRadioOperator: joi.boolean(),
        operationWithoutLogbook: joi.boolean(),
        operationOnLowerSideband: joi.boolean(),
        operationOnUnauthorizedHours: joi.boolean(),
        operatingOnUnauthorizedFrequency: joi.boolean(),
        offFrequency: joi.boolean(),
        stillInTheOldFrequencyGrouping: joi.boolean(),
    }),
    illegalPossession: joi.boolean(),
    others: joi.string().allow(''),
    sundrayInformationAboutRS: joi.object({
        isRadioOperatorEntryLogbooK: joi.string().allow(''),
        isStationProduceUnwantedSignals: joi.string().allow(''),
        isRadioEquipmentOperativeOnInspection: joi.string().allow(''),
    }),
    authorizedRepresentative: joi.string().allow(''),
    radioRegulationInspector: joi.string().allow(''),
    recommendations: joi.string().allow(''),
    notedBy: joi.string().allow(''),
    notedByInfo: joi.object().allow(),
    regionalDirector: joi.string().allow(''),
    regionalDirectorInfo: joi.object().allow(),
    notedByApproved: joi.boolean().allow(null),
    regionalDirectorApproved: joi.boolean().allow(null)
});