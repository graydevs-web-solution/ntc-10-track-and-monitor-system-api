import { RequestHandler, response } from 'express';
import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid';
import log from '../../logger/index';
import { DATABASE_SCHEMA } from '../../config/database';
import { modifyPdf, ModifyPDFOptions } from '../../shared/pdf-generate';
import { PDFTemplate } from '../../shared/pdf-generate.enum';
import { getPDFValues } from '../service-center/service-center-plot';
import { serviceCenterReportSchema } from '../../models/service-center/service-center-report.joi';
import { ServiceCenterReport } from '../../models/service-center/service-center-report.model';
import { cleanDate } from '../../shared/utility';

const prisma = new PrismaClient()

export const saveServiceCenter: RequestHandler = async (req, res, next) => {
  try {
    const { value, error } = serviceCenterReportSchema.validate(req.body);
    if (error) { log.error(error); return res.status(400).json({ message: `Validation error on service center.` }); }
    const cleanedValues: ServiceCenterReport = value;
    const result = await prisma.service_center_report.create({
        data: {
            date_inspected: cleanedValues.dateInspected ? (cleanedValues.dateInspected as Date).toISOString() : null,
            client_id: cleanedValues.clientId as number,
            permit_number: cleanedValues.permitNumber,
            permit_expiry_date: cleanDate(cleanedValues.permitExpiryDate as Date),
            list_of_service_or_test_equipments: {
                create: cleanedValues.listOfServiceOrTestEquipments.map((val) => ({
                   particular: val.particular,
                   number_of_units: val.numberOfUnits
                }))
            },
            employed_electronics_technicians: {
                create: cleanedValues.employedElectronicsTechnicians.map((val) => ({
                   name: val.name,
                   qualifications: val.qualifications,
                }))
            },
            sundry_one: cleanedValues.sundryOfInformation.one,
            sundry_two: cleanedValues.sundryOfInformation.two,
            sundry_three: cleanedValues.sundryOfInformation.three,
            remarks_deficiencies_discrepancies_noted: cleanedValues.remarksDeficienciesDiscrepanciesNoted,
            inspected_by: cleanedValues.inspectedBy,
            owner_name: cleanedValues.ownerInfo.name,
            owner_position: cleanedValues.ownerInfo.position,
            recommendations: cleanedValues.recommendations,
            noted_by: cleanedValues.notedBy,
            regional_director: cleanedValues.regionalDirector,
            is_approved: cleanedValues.isApproved
        }
    })

    res.status(200).json({ data: result });
  } catch (error) {
    log.error(error);
    res.status(500).json({ message: `Couldn't process service center data at this time.` });
  }
}

export const updateData: RequestHandler = async (req, res, next) => {
  try {
    const { value, error } = serviceCenterReportSchema.validate(req.body);
    if (error) { log.error(error); return res.status(400).json({ message: `Validation error on service center.` }); }
    const cleanedValues: ServiceCenterReport = value;
    const FORM_ID = cleanedValues.id;
    const updateMain = prisma.service_center_report.update({
        where: {
            id: FORM_ID
        },
        data: {
            date_inspected: cleanedValues.dateInspected ? (cleanedValues.dateInspected as Date).toISOString() : null,
            client_id: cleanedValues.clientId as number,
            permit_number: cleanedValues.permitNumber,
            permit_expiry_date: cleanDate(cleanedValues.permitExpiryDate as Date),
            list_of_service_or_test_equipments: {
                create: cleanedValues.listOfServiceOrTestEquipments.map((val) => ({
                   particular: val.particular,
                   number_of_units: val.numberOfUnits
                }))
            },
            employed_electronics_technicians: {
                create: cleanedValues.employedElectronicsTechnicians.map((val) => ({
                   name: val.name,
                   qualifications: val.qualifications,
                }))
            },
            sundry_one: cleanedValues.sundryOfInformation.one,
            sundry_two: cleanedValues.sundryOfInformation.two,
            sundry_three: cleanedValues.sundryOfInformation.three,
            remarks_deficiencies_discrepancies_noted: cleanedValues.remarksDeficienciesDiscrepanciesNoted,
            inspected_by: cleanedValues.inspectedBy,
            owner_name: cleanedValues.ownerInfo.name,
            owner_position: cleanedValues.ownerInfo.position,
            recommendations: cleanedValues.recommendations,
            noted_by: cleanedValues.notedBy,
            regional_director: cleanedValues.regionalDirector,
            is_approved: cleanedValues.isApproved
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

    const deleteServiceOrTestEquipment = prisma.$executeRaw(`DELETE FROM ${DATABASE_SCHEMA}.list_of_service_or_test_equipments WHERE service_center_report_id = ${FORM_ID}`);
    const deleteTechnicians = prisma.$executeRaw(`DELETE FROM ${DATABASE_SCHEMA}.employed_electronics_technicians WHERE service_center_report_id = ${FORM_ID}`);
    const insertServiceOrTestEquipment = prisma.list_of_service_or_test_equipments.createMany({
        data: cleanedValues.listOfServiceOrTestEquipments.map((val) => ({
            particular: val.particular,
            number_of_units: val.numberOfUnits,
            service_center_report_id: FORM_ID
        }))
    });
    const insertElectronicsTechs = prisma.employed_electronics_technicians.createMany({
        data: cleanedValues.employedElectronicsTechnicians.map((val) => ({
            name: val.name,
            qualifications: val.qualifications,
            service_center_report_id: FORM_ID
        }))
    });
    await prisma.$transaction([updateMain, deleteServiceOrTestEquipment, deleteTechnicians, insertServiceOrTestEquipment, insertElectronicsTechs])

    res.status(200).json({ message: 'Ok' });
  } catch (error) {
    log.error(error);
    res.status(500).json({ message: `Couldn't update service center data at this time.` });
  }
}

export const getList: RequestHandler = async (req, res, next) => {
  try {
    const { page, size, search } = req.query;
    let query = { take: +(size as string), skip: +(size as string) * (+(page as string) - 1) };
    if (search) { (query as any).where = { name: { contains: search }}};
    const docs = await prisma.service_center_report.findMany({
        include: {
            clients: {
                select: {
                    name: true
                }
            },
            list_of_service_or_test_equipments: true,
            employed_electronics_technicians: true
        }
    });
    const docCount = await prisma.service_center_report.count();

    res.status(200).json({ data: docs, collectionSize: docCount });
  } catch (error) {
      log.error(error);
    res.status(500).json({ message: `Couldn't get service centers at this time.` });
  }
}

export const deleteData: RequestHandler = async (req, res, next) => {
  try {
      const { id } = req.query;
    const deleteMain = prisma.service_center_report.delete({
        where: {
            id: +(id as string)
        },
    });
    const deleteServiceOrTestEquipment = prisma.$executeRaw(`DELETE FROM ${DATABASE_SCHEMA}.list_of_service_or_test_equipments WHERE service_center_report_id = ${id}`);
    const deleteTechnicians = prisma.$executeRaw(`DELETE FROM ${DATABASE_SCHEMA}.employed_electronics_technicians WHERE service_center_report_id = ${id}`);

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

    await prisma.$transaction([deleteMain, deleteServiceOrTestEquipment, deleteTechnicians])

    res.status(200).json({ message: 'Ok' });
  } catch (error) {
      log.error(error);
    res.status(500).json({ message: `Couldn't get clients at this time.` });
  }
}

export const generatePdf: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.query;
    const doc = await prisma.service_center_report.findUnique({
        where: {
            id: +(id as string)
        },
        include: {
            clients: {
                select: {
                    name: true,
                    businessAddress: true,
                    exactLocation: true
                }
            },
            employed_electronics_technicians: true,
            list_of_service_or_test_equipments: true
        }
    });
    const pdfValues = getPDFValues(doc);
    const options: ModifyPDFOptions = {
        isMultiplePage: true,
        startEndValuesPerPage: [
            { start: 0, end: 12, page: 1 },
            { start: 13, end: 19, page: 2 },
            { start: 21, page: 1 },
        ]
    };
    const pdf = await modifyPdf(pdfValues, PDFTemplate.serviceCenter, options);

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${PDFTemplate.serviceCenter}.pdf"`
    });

    res.end(pdf);
  } catch (error) {
    log.error(error);
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
// //       log.error(error);
// //     res.status(500).json({ message: `Couldn't get clients at this time.` });
// //   }
// // }
