import { RequestHandler, response } from 'express';
import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid';
import { DeficiencyNotice } from '../../models/deficiency-notice/deficiency-notice';
import { deficiencyNoticeSchema } from '../../models/deficiency-notice/deficiency-notice.joi';
import log from '../../logger/index';
import { DATABASE_SCHEMA } from '../../config/database';
import { modifyPdf, ModifyPDFOptions } from '../../shared/pdf-generate';
import { PDFTemplate } from '../../shared/pdf-generate.enum';
import { getPDFValues } from '../deficiency-notice/deficiency-notice-plot';
import { cleanDate, formatData2 } from '../../shared/utility';

const prisma = new PrismaClient()

export const saveOne: RequestHandler = async (req, res, next) => {
  try {
    const { value, error } = deficiencyNoticeSchema.validate(req.body);
    if (error) { log.error(error as Error); return res.status(400).json({ message: `Validation error on deficiency notice.` }); }
    const cleanedValues: DeficiencyNotice = value as DeficiencyNotice;
    const result = await prisma.deficiency_notice.create({
        data: {
            date: cleanedValues.date ? (cleanedValues.date as Date).toISOString() : null,
            client_id: cleanedValues.clientId as number,
            respondent_name: cleanedValues.respondentName,
            date_of_inspection: cleanDate(cleanedValues.dateOfInspection as Date),
            docket_number_description: cleanedValues.docketNumberDescription,
            docket_number_start: cleanedValues.docketNumberStart,
            docket_number_end: cleanedValues.docketNumberEnd,
            deficiency_notice_transmitter: {
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
            date_of_deficiency_hearing: cleanDate(cleanedValues.dateOfDeficiencyHearing as Date),
            regional_director: cleanedValues.regionalDirector,
            regional_director_approved: cleanedValues.regionalDirectorApproved,
            is_done: cleanedValues.isDone
        }
    });
    const nextCounter = `${cleanedValues.docketNumberEnd + 1}`;
    const roxResult = await prisma.system_settings.update({
        where: {
            setting: 'rox_counter'
        },
        data: {
            value: nextCounter
        }
    });

    res.status(200).json({ data: { deficiencyNotice: result, setting: { setting: 'rox_counter', value: nextCounter } } });
  } catch (error) {
    log.error(error as Error);
    res.status(500).json({ message: `Couldn't process deficiciency notice data at this time.` });
  }
}

export const updateData: RequestHandler = async (req, res, next) => {
  try {
    const { value, error } = deficiencyNoticeSchema.validate(req.body);
    if (error) { log.error(error as Error); return res.status(400).json({ message: `Validation error on deficiency notice.` }); }
    const cleanedValues: DeficiencyNotice = value as DeficiencyNotice;
    const FORM_ID = cleanedValues.id;
    const updateMain = prisma.deficiency_notice.update({
        where: {
            id: FORM_ID
        },
        data: {
            date: cleanedValues.date ? (cleanedValues.date as Date).toISOString() : null,
            client_id: cleanedValues.clientId as number,
            respondent_name: cleanedValues.respondentName,
            date_of_inspection: cleanDate(cleanedValues.dateOfInspection as Date),
            vi_operation_without_rsl: cleanedValues.violationInfo.operationWithoutRSL,
            vi_operation_without_lro: cleanedValues.violationInfo.operationWithoutLRO,
            vi_operation_unauthorized_frequency: cleanedValues.violationInfo.operationUnauthorizedFrequency,
            vi_possession_transmitter_without_pp: cleanedValues.violationInfo.possessionTransmitterWithoutPP,
            vi_no_ntc_pertinent_papers: cleanedValues.violationInfo.noNTCPertinentPapers,
            date_of_deficiency_hearing: cleanDate(cleanedValues.dateOfDeficiencyHearing as Date),
            regional_director: cleanedValues.regionalDirector,
            regional_director_approved: cleanedValues.regionalDirectorApproved,
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

    const deleteTransmitter = prisma.$queryRaw<void>`DELETE FROM ${DATABASE_SCHEMA}.deficiency_notice_transmitter WHERE deficiency_notice_id = ${FORM_ID}`;
    const insertTransmitter = prisma.deficiency_notice_transmitter.createMany({
        data: cleanedValues.transmitters.map((val) => ({
                    transmitter: val.transmitter,
                    serial_number: val.serialNumber,
                    deficiency_notice_id: FORM_ID
                }))
    });
    await prisma.$transaction([updateMain, deleteTransmitter, insertTransmitter])

    res.status(200).json({ message: 'Ok' });
  } catch (error) {
    log.error(error as Error);
    res.status(500).json({ message: `Couldn't process client data at this time.` });
  }
}

export const getList: RequestHandler = async (req, res, next) => {
  try {
    const { page, size, search } = req.query;
    let query = { take: +(size as string), skip: +(size as string) * (+(page as string) - 1) };
    if (search) { (query as any).where = { name: { contains: search }}};
    const docs = await prisma.deficiency_notice.findMany({
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
            regional_director_info: {
                select: {
                    name_first: true,
                    name_last: true,
                    position: true,
                    user_id: true,
                }
            },
            deficiency_notice_transmitter: true,
        }
    });
    const docCount = await prisma.deficiency_notice.count();
    res.status(200).json({ data: docs, collectionSize: docCount });
  } catch (error) {
      log.error(error as Error);
    res.status(500).json({ message: `Couldn't get deficiency notice data at this time.` });
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
  
    const deleteTransmitter = prisma.$queryRaw<void>`DELETE FROM ${DATABASE_SCHEMA}.deficiency_notice_transmitter WHERE deficiency_notice_id = ${id}`;

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
      log.error(error as Error);
    res.status(500).json({ message: `Couldn't delete deficiency notice at this time.` });
  }
}

export const generatePdf: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.query;
    console.log(id)
    const doc = await prisma.deficiency_notice.findUnique({
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
                        regional_director_info: {
                select: {
                    name_first: true,
                    name_last: true,
                    position: true,
                    user_id: true,
                }
            },
            deficiency_notice_transmitter: true,
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
    const pdf = await modifyPdf(pdfValues, PDFTemplate.deficiencyNotice);

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${PDFTemplate.deficiencyNotice}.pdf"`
    });

    res.end(pdf);
  } catch (error) {
    log.error(error as Error);
    res.status(500).json({ message: `Couldn't get clients at this time.` });
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
// //       log.error(error as Error);
// //     res.status(500).json({ message: `Couldn't get clients at this time.` });
// //   }
// // }
