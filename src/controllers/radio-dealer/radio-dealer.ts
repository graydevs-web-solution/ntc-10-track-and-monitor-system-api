import { RequestHandler } from 'express';
import { PrismaClient, users } from '@prisma/client'
import { v4 as uuid } from 'uuid';
import log from '../../logger/index';
import { DATABASE_SCHEMA } from '../../config/database';
import { modifyPdf, SignaturePlotDataRaw } from '../../shared/pdf-generate';
import { PDFTemplate } from '../../shared/pdf-generate.enum';
import { getPDFValues } from '.././radio-dealer/radio-dealer-plot';
import { radioDealerSchema } from '../../models/radio-dealer/radio-dealer.joi';
import { RadioDealer } from '../../models/radio-dealer/radio-dealer.model';
import { cleanDate, dateToString, formatData, formatData2 } from '../../shared/utility';
import { Approval } from 'src/models/approval-status.model';
import { UserTypes } from '../auth/auth.enum';

const prisma = new PrismaClient()

export const saveRadioDealer: RequestHandler = async (req, res, next) => {
  try {
    const { value, error } = radioDealerSchema.validate(req.body);
    if (error) { log.error(error as Error); return res.status(400).json({ message: `Validation error on radio dealer.` }); }
    console.log(value)
    const cleanedValues: RadioDealer = value;
    const result = await prisma.radio_dealers.create({
        data: {
            date_inspected: cleanDate(cleanedValues.dateInspected as Date),
            client_id: cleanedValues.clientId as number,
            permit_number: cleanedValues.permitNumber,
            permit_expiry_date: cleanDate(cleanedValues.permitExpiryDate as Date),
            supervising_ece: {
                create: cleanedValues.supervisingECE.map((val) => ({
                   name: val.name,
                   license_number: val.licenseNumber,
                   expiry_date: cleanDate(val.expiryDate as Date),
                   ptr_number: val.ptrNumber,
                   date_issued: cleanDate(val.dateIssued as Date),
                }))
            },
            radio_technicians: {
                create: cleanedValues.radioTechnicians.map((val) => ({
                   name: val.name,
                   particulars_of_license: val.particularsOfLicense,
                   expiry_date: cleanDate(val.expiryDate as Date),
                }))
            },
            dtemi_reflectometer: cleanedValues.diagnosticTestEquipmentAndMeasuringInstrumentInfo.reflectometer,
            dtemi_frequency_counter: cleanedValues.diagnosticTestEquipmentAndMeasuringInstrumentInfo.frequencyCounter,
            dtemi_power_meter: cleanedValues.diagnosticTestEquipmentAndMeasuringInstrumentInfo.powerMeter,
            dtemi_vtvm_digital_multimeter: cleanedValues.diagnosticTestEquipmentAndMeasuringInstrumentInfo.vtvmDigitalMultimeter,
            dtemi_signal_generator: cleanedValues.diagnosticTestEquipmentAndMeasuringInstrumentInfo.signalGenerator,
            dtemi_oscilloscope: cleanedValues.diagnosticTestEquipmentAndMeasuringInstrumentInfo.oscilloscope,
            dtemi_vom_digital_multimeter: cleanedValues.diagnosticTestEquipmentAndMeasuringInstrumentInfo.vomDigitalMultimeter,
            dtemi_dummy_load_antenna: cleanedValues.diagnosticTestEquipmentAndMeasuringInstrumentInfo.dummyLoadAntenna,
            is_laboratory_room_shielded: cleanedValues.isLaboratoryRoomShielded,
            remarks: cleanedValues.remarks,
            radio_regulation_inspector: cleanedValues.radioRegulationInspector,
            owner_name: cleanedValues.ownerName,
            recommendations: cleanedValues.recommendations,
            noted_by: cleanedValues.notedBy,
            noted_by_approved: cleanedValues.notedByApproved,
            regional_director: cleanedValues.regionalDirector,
            regional_director_approved: cleanedValues.regionalDirectorApproved,
        }
    })

    res.status(200).json({ data: result });
  } catch (error) {
    log.error(error as Error);
    res.status(500).json({ message: `Couldn't process radio dealer data at this time.` });
  }
}

export const updateData: RequestHandler = async (req, res, next) => {
  try {
    const { value, error } = radioDealerSchema.validate(req.body);
    if (error) { log.error(error as Error); return res.status(400).json({ message: `Validation error on mobile phone dealer.` }); }
    const cleanedValues: RadioDealer = value;
    const FORM_ID = cleanedValues.id;
    const updateMain = prisma.radio_dealers.update({
        where: {
            id: FORM_ID
        },
        data: {
            date_inspected: cleanDate(cleanedValues.dateInspected as Date),
            client_id: cleanedValues.clientId as number,
            permit_number: cleanedValues.permitNumber,
            permit_expiry_date: cleanDate(cleanedValues.permitExpiryDate as Date),
            supervising_ece: {
                create: cleanedValues.supervisingECE.map((val) => ({
                   name: val.name,
                   license_number: val.licenseNumber,
                   expiry_date: cleanDate(val.expiryDate as Date),
                   ptr_number: val.ptrNumber,
                   date_issued: cleanDate(val.dateIssued as Date),
                }))
            },
            radio_technicians: {
                create: cleanedValues.radioTechnicians.map((val) => ({
                   name: val.name,
                   particulars_of_license: val.particularsOfLicense,
                   expiry_date: cleanDate(val.expiryDate as Date),
                }))
            },
            dtemi_reflectometer: cleanedValues.diagnosticTestEquipmentAndMeasuringInstrumentInfo.reflectometer,
            dtemi_frequency_counter: cleanedValues.diagnosticTestEquipmentAndMeasuringInstrumentInfo.frequencyCounter,
            dtemi_power_meter: cleanedValues.diagnosticTestEquipmentAndMeasuringInstrumentInfo.powerMeter,
            dtemi_vtvm_digital_multimeter: cleanedValues.diagnosticTestEquipmentAndMeasuringInstrumentInfo.vtvmDigitalMultimeter,
            dtemi_signal_generator: cleanedValues.diagnosticTestEquipmentAndMeasuringInstrumentInfo.signalGenerator,
            dtemi_oscilloscope: cleanedValues.diagnosticTestEquipmentAndMeasuringInstrumentInfo.oscilloscope,
            dtemi_vom_digital_multimeter: cleanedValues.diagnosticTestEquipmentAndMeasuringInstrumentInfo.vomDigitalMultimeter,
            dtemi_dummy_load_antenna: cleanedValues.diagnosticTestEquipmentAndMeasuringInstrumentInfo.dummyLoadAntenna,
            is_laboratory_room_shielded: cleanedValues.isLaboratoryRoomShielded,
            remarks: cleanedValues.remarks,
            radio_regulation_inspector: cleanedValues.radioRegulationInspector,
            owner_name: cleanedValues.ownerName,
            recommendations: cleanedValues.recommendations,
            noted_by: cleanedValues.notedBy,
            noted_by_approved: cleanedValues.notedByApproved,
            regional_director: cleanedValues.regionalDirector,
            regional_director_approved: cleanedValues.regionalDirectorApproved,
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

    const deleteECE = prisma.$queryRawUnsafe<void>(`DELETE FROM ${DATABASE_SCHEMA}.supervising_ece WHERE radio_dealer_id = ${FORM_ID}`);
    const deleteTechnicians = prisma.$queryRawUnsafe<void>(`DELETE FROM ${DATABASE_SCHEMA}.radio_technicians WHERE radio_dealer_id = ${FORM_ID}`);
    const insertECE = prisma.supervising_ece.createMany({
        data: cleanedValues.supervisingECE.map((val) => ({
                   name: val.name,
                   license_number: val.licenseNumber,
                   expiry_date: cleanDate(val.expiryDate as Date),
                   ptr_number: val.ptrNumber,
                   date_issued: cleanDate(val.dateIssued as Date),
                }))
    });
    const insertTechinicians = prisma.radio_technicians.createMany({
        data: cleanedValues.radioTechnicians.map((val) => ({
                   name: val.name,
                   particulars_of_license: val.particularsOfLicense,
                   expiry_date: cleanDate(val.expiryDate as Date),
                }))
    });
    await prisma.$transaction([updateMain, deleteECE, deleteTechnicians, insertECE, insertTechinicians])

    res.status(200).json({ message: 'Ok' });
  } catch (error) {
    log.error(error as Error);
    res.status(500).json({ message: `Couldn't process radio dealer data at this time.` });
  }
}

export const getList: RequestHandler = async (req, res, next) => {
  try {
    const { page, size, search } = req.query;
    let query = { take: +(size as string), skip: +(size as string) * (+(page as string) - 1) };
    if (search) { (query as any).where = { name: { contains: search }}};
    const docs = (await prisma.radio_dealers.findMany({
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
            noted_by_info: {
                select: {
                    name_first: true,
                    name_last: true,
                    position: true,
                    user_id: true,
                }
            },
            radio_technicians: true,
            supervising_ece: true,
        }
    })).map(formatData);
    const docCount = await prisma.radio_dealers.count();

    res.status(200).json({ data: docs, collectionSize: docCount });
  } catch (error) {
      log.error(error as Error);
    res.status(500).json({ message: `Couldn't get radio dealers at this time.` });
  }
}

export const deleteData: RequestHandler = async (req, res, next) => {
  try {
      const { id } = req.query;
    const deleteMain = prisma.radio_dealers.delete({
        where: {
            id: +(id as string)
        },
    });

    const deleteECE = prisma.$queryRawUnsafe<void>(`DELETE FROM ${DATABASE_SCHEMA}.supervising_ece WHERE radio_dealer_id = ${id}`);
    const deleteTechnicians = prisma.$queryRawUnsafe<void>(`DELETE FROM ${DATABASE_SCHEMA}.radio_technicians WHERE radio_dealer_id = ${id}`);

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

    await prisma.$transaction([deleteMain, deleteECE, deleteTechnicians])

    res.status(200).json({ message: 'Ok' });
  } catch (error) {
      log.error(error as Error);
    res.status(500).json({ message: `Couldn't delete radio dealer data at this time.` });
  }
}

export const generatePdf: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.query;
    const doc = await prisma.radio_dealers.findUnique({
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
                    cellphoneNumber: true,
                    faxNumber: true,
                }
            },
            regional_director_info: {
                select: {
                    name_first: true,
                    name_last: true,
                    position: true,
                    user_id: true,
                    signature: true
                }
            },
            noted_by_info: {
                select: {
                    name_first: true,
                    name_last: true,
                    position: true,
                    user_id: true,
                    signature: true
                }
            },
            radio_technicians: true,
            supervising_ece: true
        }
    });
        const regionalDirectorSignature =             
            {
                image: doc?.regional_director_info?.signature as string,
                x: 380,
                y: 880
            };
        const chiefSignature = {
        image: doc?.noted_by_info?.signature as string,
        x: 100,
        y: 875
    }    
    let signatures: SignaturePlotDataRaw[] = [];
    if (doc?.regional_director_approved && doc?.regional_director_info?.signature) {
        signatures = [ ...signatures, regionalDirectorSignature, chiefSignature];
    }
    if (doc?.noted_by_approved && doc?.noted_by_info?.signature) {
        signatures = [ ...signatures, chiefSignature];
    }

    const pdf = await modifyPdf({ 
        entries: getPDFValues(formatData2(doc)), 
        pdfTemplate: PDFTemplate.radioDealer,
        signatures
    });

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${PDFTemplate.radioDealer}.pdf"`
    });

    res.end(pdf);
  } catch (error) {
    log.error(error as Error);
    res.status(500).json({ message: `Couldn't get clients at this time.` });
  }
}

export const approvalStatus: RequestHandler = async (req, res, next) => {
  try {
    const data: Approval = req.body;
    console.log(data.radioDealer)
    const { value, error } = radioDealerSchema.validate(data.radioDealer);
    if (error) { log.error(error as Error); return res.status(400).json({ message: `Validation error on mobile phone dealer.` }); }
    const cleanedValues: RadioDealer = value;
    const FORM_ID = cleanedValues.id;

    let directorInfo: users | null;
    let notedByInfo: users | null;

    
    if (data.position !== UserTypes.director && data.position !== UserTypes.chiefEngineer) {
        return res.status(400).json({ message: `Unauthorized access.` });
    }

    const prevData = await prisma.radio_dealers.findFirst({
        where: {
            id: FORM_ID
        }
    });

    if (data.position === UserTypes.director) {
        directorInfo = await prisma.users.findFirst({
            where: {
                user_id: data.userID
            }
        });

        if (!directorInfo || data.position !== directorInfo.position || data.userID !== prevData?.regional_director) {
            return res.status(400).json({ message: `Unauthorized access.` });
        }
    }
    if (data.position === UserTypes.chiefEngineer) {
        notedByInfo = await prisma.users.findFirst({
            where: {
                user_id: data.userID
            }
        });

        if (!notedByInfo || data.position !== notedByInfo.position || data.userID !== prevData?.noted_by) {
            return res.status(400).json({ message: `Unauthorized access.` });
        }
    }

    const updateMain = await prisma.radio_dealers.update({
        where: {
            id: FORM_ID
        },
        data: {
            // date_inspected: cleanedValues.dateInspected,
            // client_id: cleanedValues.clientId as number,
            // permit_number: cleanedValues.permitNumber,
            // permit_expiry_date: cleanedValues.permitExpiryDate,
            // sundry_one: cleanedValues.sundryOfInformation.one,
            // sundry_two: cleanedValues.sundryOfInformation.two,
            // remarks_deficiencies_discrepancies_noted: cleanedValues.remarksDeficienciesDiscrepanciesNoted,
            // inspected_by: cleanedValues.inspectedBy
            // recommendations: cleanedValues.recommendations,
            // noted_by: cleanedValues.notedBy,
            // regional_director: cleanedValues.regionalDirector,
            // noted_by_approved: data.position === UserTypes.chiefEngineer ? approvalStatus : prevData?.noted_by_approved,
            ...prevData,
            noted_by_approved: data.position === UserTypes.chiefEngineer ? data.approvalStatus : prevData?.noted_by_approved,
            regional_director_approved: data.position === UserTypes.director ? data.approvalStatus : prevData?.regional_director_approved,
        }
    })

    res.status(200).json({ message: 'Ok' });
  } catch (error) {
    log.error(error as Error);
    res.status(500).json({ message: `Couldn't process client data at this time.` });
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
