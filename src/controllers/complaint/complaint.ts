import { RequestHandler, response } from 'express';
import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid';
import { Complaint } from '../../models/complaint/complaint.model';
import { complaintSchema } from '../../models/complaint/complaint.joi';
import log from '../../logger/index';
import { DATABASE_SCHEMA } from '../../config/database';
import { modifyPdf, ModifyPDFOptions } from '../../shared/pdf-generate';
import { PDFTemplate } from '../../shared/pdf-generate.enum';
import { getPDFValues } from '../complaint/complaint-plot';
import { cleanDate } from '../../shared/utility';
import { DateTime } from 'luxon';

const prisma = new PrismaClient();

const getHearingDate = (dateOfHearing: Date, timeOfHearing: { hour: number, minute: number }): string => {
    const dateHearingRaw = dateOfHearing;
    const timeHearingRaw = timeOfHearing;
    return DateTime.local(
        dateHearingRaw.getFullYear(),
        dateHearingRaw.getMonth() + 1,
        dateHearingRaw.getDate(),
        timeOfHearing.hour,
        timeHearingRaw.minute).toISO();
}

export const saveOne: RequestHandler = async (req, res, next) => {
  try {
    const { value, error } = complaintSchema.validate(req.body);
    if (error) { log.error(error); return res.status(400).json({ message: `Validation error on complaint.` }); }
    const cleanedValues: Complaint = value;

    const result = await prisma.complaint.create({
        data: {
            date: cleanedValues.date ? (cleanedValues.date as Date).toISOString() : null,
            complainant_name: cleanedValues.complainantName,
            client_id: cleanedValues.clientId as number,
            respondent_name: cleanedValues.respondentName,
            docket_number: cleanedValues.docketNumber,
            date_of_inspection: cleanDate(cleanedValues.dateOfInspection as Date),
            location: cleanedValues.location,
            reason: cleanedValues.reason,
            complaint_transmitter: {
                create: cleanedValues.transmitters.map((val) => ({
                    transmitter: val.transmitter,
                    serial_number: val.serialNumber
                }))
            },
            vi_operation_without_rsl: cleanedValues.violationInfo.operationWithoutRSL,
            vi_operation_without_lro: cleanedValues.violationInfo.operationWithoutLRO,
            vi_operation_unauthorized_frequency: cleanedValues.violationInfo.operationUnauthorizedFrequency,
            vi_possession_transmitter_without_pp: cleanedValues.violationInfo.possessionTransmitterWithoutPP,
            vi_no_ntc_pertinent_papers: cleanedValues.violationInfo.noNTCPertinentPapers,
            date_time_of_hearing: cleanDate(new Date(getHearingDate(cleanedValues.dateOfHearing as Date, cleanedValues.timeOfHearing))),
            regional_director: cleanedValues.regionalDirector,
            is_done: cleanedValues.isDone
        }
    })

    res.status(200).json({ data: result });
  } catch (error) {
    log.error(error);
    res.status(500).json({ message: `Couldn't process complaint data at this time.` });
  }
}

export const updateData: RequestHandler = async (req, res, next) => {
  try {
    const { value, error } = complaintSchema.validate(req.body);
    if (error) { log.error(error); return res.status(400).json({ message: `Validation error on deficiency notice.` }); }
    const cleanedValues: Complaint = value;
    const FORM_ID = cleanedValues.id;
    const updateMain = prisma.complaint.update({
        where: {
            id: FORM_ID
        },
        data: {
            date: cleanedValues.date ? (cleanedValues.date as Date).toISOString() : null,
            complainant_name: cleanedValues.complainantName,
            client_id: cleanedValues.clientId as number,
            respondent_name: cleanedValues.respondentName,
            date_of_inspection: cleanDate(cleanedValues.dateOfInspection as Date),
            docket_number: cleanedValues.docketNumber,
            location: cleanedValues.location,
            reason: cleanedValues.reason,
            vi_operation_without_rsl: cleanedValues.violationInfo.operationWithoutRSL,
            vi_operation_without_lro: cleanedValues.violationInfo.operationWithoutLRO,
            vi_operation_unauthorized_frequency: cleanedValues.violationInfo.operationUnauthorizedFrequency,
            vi_possession_transmitter_without_pp: cleanedValues.violationInfo.possessionTransmitterWithoutPP,
            vi_no_ntc_pertinent_papers: cleanedValues.violationInfo.noNTCPertinentPapers,
            date_time_of_hearing: cleanDate(new Date(getHearingDate(cleanedValues.dateOfHearing as Date, cleanedValues.timeOfHearing))),
            regional_director: cleanedValues.regionalDirector,
            is_done: cleanedValues.isDone
        }
    })

    // NOTE! This code block should have used for updating operators and radio transceiver list but because of 
    // a case of updating a non-existent row, a new data will be skipped so therefore not to use it.
    // 
    // const setValuesOperators = cleanedValues.operators.map((val) => (`(${val.id}, '${val.name}', '${val.particularOfLicense}', Timestamp '${(val.expirationDate as Date).toISOString()}')`))
    // const setValuesRTItems = cleanedValues.radioTransceivers.map((val) =>
    //     (`(${val.id}, '${val.model}', '${val.serialNumber}', '${val.freqRange}', '${val.powerOutput}', '${val.freqControl}')`))
    // const updateOperators = prisma.$executeRaw(`UPDATE ${DATABASE_SCHEMA}.radio_transceiver_operators as o set
    //     name = c.name,
    //     particular_of_license = c.particular_of_license,
    //     expiration_date = c.expiration_date
    //     from (values
    //     ${setValuesOperators.join(', ')}
    //     ) as c(id, name, particular_of_license, expiration_date)
    //     where c.id = o.id;`);
    // const updateRTI = prisma.$executeRaw(`UPDATE ${DATABASE_SCHEMA}.radio_transceiver_items as rti set
    //     model = c.model,
    //     serial_number = c.serial_number,
    //     freq_range = c.freq_range,
    //     power_output = c.power_output,
    //     freq_control = c.freq_control
    //     from (values
    //     ${setValuesRTItems.join(', ')}
    //     ) as c(id, model, serial_number, freq_range, power_output, freq_control)
    //     where c.id = rti.id;`);

    const deleteTransmitter = prisma.$executeRaw(`DELETE FROM ${DATABASE_SCHEMA}.complaint_transmitter WHERE complaint_id = ${FORM_ID}`);
    const insertTransmitter = prisma.complaint_transmitter.createMany({
        data: cleanedValues.transmitters.map((val) => ({
                    transmitter: val.transmitter,
                    serial_number: val.serialNumber,
                    complaint_id: FORM_ID
                }))
    });
    await prisma.$transaction([updateMain, deleteTransmitter, insertTransmitter])

    res.status(200).json({ message: 'Ok' });
  } catch (error) {
    log.error(error);
    res.status(500).json({ message: `Couldn't process complaint data at this time.` });
  }
}

export const getList: RequestHandler = async (req, res, next) => {
  try {
    const { page, size, search } = req.query;
    let query = { take: +(size as string), skip: +(size as string) * (+(page as string) - 1) };
    if (search) { (query as any).where = { name: { contains: search }}};
    const docs = await prisma.complaint.findMany({
        include: {
            clients: {
                select: {
                    business_name: true,
                    owner_name: true,
                    owner_position: true,
                    business_address: true,
                    exactLocation: true,
                }
            },
            complaint_transmitter: true,
        }
    });
    const docCount = await prisma.deficiency_notice.count();

    res.status(200).json({ data: docs, collectionSize: docCount });
  } catch (error) {
      log.error(error);
    res.status(500).json({ message: `Couldn't get complaint data at this time.` });
  }
}

export const deleteData: RequestHandler = async (req, res, next) => {
  try {
      const { id } = req.query;
    const deleteMain = prisma.deficiency_notice.delete({
        where: {
            id: +(id as string)
        },
    });
    const deleteTransmitter = prisma.$executeRaw(`DELETE FROM ${DATABASE_SCHEMA}.complaint_transmitter WHERE complaint_id = ${id}`);

    // NOTE: This code block couldn't delete specified row. I'm dumb as heck
    // 
    // 
    //     const deleteOperators = prisma.radio_transceiver_operators.delete({
    //     where: {
    //         id: +(id as string)
    //     }
    // });
    //     const deleteRTItems = prisma.radio_transceiver_items.delete({
    //     where: {
    //         id: +(id as string)
    //    }
    // }); 

    await prisma.$transaction([deleteMain, deleteTransmitter])

    res.status(200).json({ message: 'Ok' });
  } catch (error) {
      log.error(error);
    res.status(500).json({ message: `Couldn't delete complaint at this time.` });
  }
}

export const generatePdf: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.query;
    const doc = await prisma.complaint.findUnique({
        where: {
            id: +(id as string)
        },
        include: {
            clients: {
                select: {
                    business_name: true,
                    owner_name: true,
                    owner_position: true,
                    business_address: true,
                    exactLocation: true,
                }
            },
            complaint_transmitter: true,
        }
    });
    console.log(doc)
    const pdfValues = getPDFValues(doc);
    // const options: ModifyPDFOptions = {
    //     isMultiplePage: true,
    //     startEndValuesPerPage: [
    //         { start: 0, end: 11, page: 1 },
    //         { start: 12, end: 18, page: 2 },
    //         { start: 20, page: 1 },
    //     ]
    // };
    const pdf = await modifyPdf(pdfValues, PDFTemplate.complaint);

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${PDFTemplate.complaint}.pdf"`
    });

    res.end(pdf);
  } catch (error) {
    log.error(error);
    res.status(500).json({ message: `Couldn't generate complaint pdf at this time.` });
  }
}

// // export const getClient: RequestHandler = async (req, res, next) => {
// //   try {
// //       const { id } = req.query;
// //     // const doc = await ClientModel.findOne({ cnId: id as string })

// //     // res.status(200).json({ data: doc });
// //   } catch (error) {
// //     res.status(500).json({ message: `Couldn't get clients at this time.` });
// //   }
// // }

// // export const searchClient: RequestHandler = async (req, res, next) => {
// //   try {
// //       const { search } = req.query;

// //     const docs = await prisma.$queryRaw<Client[]>(`
// //         SELECT name, id FROM ${DATABASE_SCHEMA}.clients WHERE to_tsvector(name) @@ to_tsquery('${search}')
// //         `);
// //     // const docCount = await prisma.${DATABASE_SCHEMA}.count();


// //     res.status(200).json({ data: docs });
// //   } catch (error) {
// //       log.error(error);
// //     res.status(500).json({ message: `Couldn't get clients at this time.` });
// //   }
// // }