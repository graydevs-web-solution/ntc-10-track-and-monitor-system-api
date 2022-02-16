import { RequestHandler, response } from 'express';
import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid';
import { DeficiencyNotice } from '../../models/deficiency-notice/deficiency-notice';
import log from '../../logger/index';
import { DATABASE_SCHEMA } from '../../config/database';
import { modifyPdf, ModifyPDFOptions } from '../../shared/pdf-generate';
import { PDFTemplate } from '../../shared/pdf-generate.enum';
import { getPDFValues } from '../accomplishment-report/accomplishment-report-plot';
import { cleanDate, formatData2 } from '../../shared/utility';
import { accomplishmentReportSchema } from '../../models/accomplishment-report/accomplishment-report.joi';
import { AccomplishmentReport } from '../../models/accomplishment-report/accomplishment-report.model';
import { DateTime } from 'luxon';

const prisma = new PrismaClient()

export const saveOne: RequestHandler = async (req, res, next) => {
  try {
    const { value, error } = accomplishmentReportSchema.validate(req.body);
    if (error) { log.error(error as Error); return res.status(400).json({ message: `Validation error on accomplishment.` }); }
    console.log('triggered')
    const cleanedValues: AccomplishmentReport = value as AccomplishmentReport;
    const dateFrom = DateTime.local(cleanedValues.year, cleanedValues.month).startOf('month').toJSDate();
    const dateTo = DateTime.local(cleanedValues.year, cleanedValues.month).endOf('month').toJSDate();

    const resComplaintNumber = await prisma.complaint.count({
        where: {
            date: {
                gte: dateFrom,
                lte: dateTo
            }
        }
    });
    const resDefNot = await prisma.deficiency_notice.count({
        where: {
            date: {
                gte: dateFrom,
                lte: dateTo
            }
        }
    });
        const resDateHearingComplaint = await prisma.complaint.count({
        where: {
            date_time_of_hearing: {
                gte: dateFrom,
                lte: dateTo
            }
        }
    });
    const resComplaintPending = await prisma.complaint.count({
        where: {
            is_done: false
        }
    });
        const resComplaintResolved = await prisma.complaint.count({
        where: {
            is_done: true
        }
    });
    console.log(cleanedValues)
    const result = await prisma.accomplishment_report.create({
        data: {
            month: cleanedValues.month,
            year: cleanedValues.year,
            description: cleanedValues.description,
            number_of_admin_case: resComplaintNumber,
            number_of_hearing: resDefNot,
            number_of_pending_complaint: resDateHearingComplaint,
            number_of_resolved: resComplaintPending,
            number_of_show_case: resComplaintResolved,
            attorney: cleanedValues.attorney as string
        }
    })

    res.status(200).json({ data: result });
  } catch (error) {
    log.error(error as Error);
    res.status(500).json({ message: `Couldn't process deficiciency notice data at this time.` });
  }
}

export const getList: RequestHandler = async (req, res, next) => {
  try {
    const { page, size, search } = req.query;
    let query = { take: +(size as string), skip: +(size as string) * (+(page as string) - 1) };
    if (search) { (query as any).where = { name: { contains: search }}};
    const docs = await prisma.accomplishment_report.findMany({
        include: {
            attorney_info: {
                select: {
                    name_first: true,
                    name_last: true,
                    name_middle: true,
                    position: true
                }
            },
        }
    });
    const docCount = await prisma.accomplishment_report.count();

    res.status(200).json({ data: docs, collectionSize: docCount });
  } catch (error) {
      log.error(error as Error);
    res.status(500).json({ message: `Couldn't get accomplishment report data at this time.` });
  }
}

export const generatePdf: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.query;
    console.log(id)
    const doc = await prisma.accomplishment_report.findUnique({
        where: {
            id: +(id as string)
        },
        include: {
            attorney_info: {
                select: {
                    name_first: true,
                    name_last: true,
                    name_middle: true,
                    position: true
                }
            },
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
    const pdf = await modifyPdf(pdfValues, PDFTemplate.accomplishmentReport);

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${PDFTemplate.accomplishmentReport}.pdf"`
    });

    res.end(pdf);
  } catch (error) {
    log.error(error as Error);
    res.status(500).json({ message: `Couldn't get clients at this time.` });
  }
}

export const deleteData: RequestHandler = async (req, res, next) => {
  try {
      const { id } = req.query;
    const deleteMain = prisma.accomplishment_report.delete({
        where: {
            id: +(id as string)
        },
    });

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

    await prisma.$transaction([deleteMain]);

    res.status(200).json({ message: 'Ok' });
  } catch (error) {
    res.status(500).json({ message: `Couldn't delete deficiency notice at this time.` });
  }
}
