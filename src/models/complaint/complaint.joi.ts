import joi from 'joi';
import { Complaint } from './complaint.model';

export const complaintSchema = joi.object<Complaint>({
    id: joi.number().allow(null),
    date: joi.date().required().messages({
        'date.base': `Date should be a type of date`,
    }),
    clientId: joi.number().required(),
    clientName: joi.string().allow(''),
    complainantName: joi.string(),
    respondentName: joi.string().allow(''),
    docketNumberDescription: joi.string().required(),
    docketNumberStart: joi.number().required(),
    docketNumberEnd: joi.number().required(),
    dateOfInspection: joi.date().required().messages({
        'date.base': `dateOfInspection should be a type of date`,
    }),
    location: joi.string(),
    reason: joi.string(),
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
    dateOfHearing: joi.date().allow(null),
    timeOfHearing: joi.object({
        hour: joi.number(),
        minute: joi.number(),
        second: joi.number(),
    }),
    isDone: joi.boolean(),
    regionalDirector: joi.string().allow(''),
    regionalDirectorApproved: joi.boolean().allow(null),
});