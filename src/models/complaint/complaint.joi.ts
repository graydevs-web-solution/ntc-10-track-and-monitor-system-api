import { object, number, string, date, array, boolean } from 'joi';
import { Complaint } from './complaint.model';

export const complaintSchema = object<Complaint>({
    id: number().allow(null),
    date: date().required().messages({
        'date.base': `Date should be a type of date`,
    }),
    clientId: number().required(),
    clientName: string().allow(''),
    complainantName: string(),
    respondentName: string().allow(''),
    docketNumber: string().allow(''),
    dateOfInspection: date().required().messages({
        'date.base': `dateOfInspection should be a type of date`,
    }),
    location: string(),
    reason: string(),
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
    dateOfHearing: date().allow(null),
    timeOfHearing: object({
        hour: number(),
        minute: number(),
        second: number(),
    }),
    isDone: boolean(),
    regionalDirector: string().allow(''),
});