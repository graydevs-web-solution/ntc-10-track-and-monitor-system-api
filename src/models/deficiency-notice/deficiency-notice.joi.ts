import joi from 'joi';
import { DeficiencyNotice } from './deficiency-notice';

export const deficiencyNoticeSchema = joi.object<DeficiencyNotice>({
    id: joi.number().allow(null),
    date: joi.date().required().messages({
        'date.base': `Date should be a type of date`,
    }),
    clientId: joi.number().required(),
    clientName: joi.string().allow(''),
    respondentName: joi.string().allow(''),
    dateOfInspection: joi.date().required().messages({
        'date.base': `dateOfInspection should be a type of date`,
    }),
    docketNumberDescription: joi.string().required(),
    docketNumberStart: joi.number().required(),
    docketNumberEnd: joi.number().required(),
    transmitters: joi.array().items(
        joi.object({
            transmitter: joi.string(),
            serialNumber: joi.string(),
        })
    ),
    violationInfo: joi.object({
        operationWithoutRSL: joi.boolean(),
        operationWithoutLRO: joi.boolean(),
        operationUnauthorizedFrequency: joi.boolean(),
        possessionTransmitterWithoutPP: joi.boolean(),
        noNTCPertinentPapers: joi.boolean()
    }),
    dateOfDeficiencyHearing: joi.date().allow(null),
    isDone: joi.boolean(),
    regionalDirector: joi.string().allow(''),
    regionalDirectorInfo: joi.object().allow(),
    regionalDirectorApproved: joi.string().allow(null).allow('')
});