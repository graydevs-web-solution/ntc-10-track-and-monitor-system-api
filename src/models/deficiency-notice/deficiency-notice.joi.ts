import { object, number, string, date, array, boolean } from 'joi';
import { DeficiencyNotice } from './deficiency-notice';

export const deficiencyNoticeSchema = object<DeficiencyNotice>({
    id: number().allow(null),
    date: date().required().messages({
        'date.base': `Date should be a type of date`,
    }),
    clientId: number().required(),
    clientName: string().allow(''),
    respondentName: string().allow(''),
    dateOfInspection: date().required().messages({
        'date.base': `dateOfInspection should be a type of date`,
    }),
    docketNumber: string().allow(''),
    transmitters: array().items(
        object({
            transmitter: string(),
            serialNumber: string(),
        })
    ),
    violationInfo: object({
        operationWithoutRSL: boolean(),
        operationWithoutLRO: boolean(),
        operationUnauthorizedFrequency: boolean(),
        possessionTransmitterWithoutPP: boolean(),
        noNTCPertinentPapers: boolean()
    }),
    dateOfDeficiencyHearing: date().allow(null),
    isDone: boolean(),
    regionalDirector: string().allow(''),
});