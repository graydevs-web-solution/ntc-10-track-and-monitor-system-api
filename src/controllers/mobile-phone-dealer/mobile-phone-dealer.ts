import { RequestHandler, response } from 'express';
import { PrismaClient, users } from '@prisma/client'
import { v4 as uuid } from 'uuid';
import { MobilePhoneDealer } from '../../models/mobile-phone-dealer/mobile-phone-dealer.model';
import { mobilePhoneDealerSchema } from '../../models/mobile-phone-dealer/mobile-phone-dealer.joi';
import log from '../../logger/index';
import { DATABASE_SCHEMA } from '../../config/database';
import { modifyPdf, ModifyPDFOptions, SignaturePlotDataRaw } from '../../shared/pdf-generate';
import { PDFTemplate } from '../../shared/pdf-generate.enum';
import { getPDFValues } from '../mobile-phone-dealer/mobile-phone-dealer-plot';
import { RadioTransceiverAPI } from '../../models/radio-transceivers/radio-transceiver-api.model';
import { cleanDate, formatData } from '../../shared/utility';
import { Approval } from 'src/models/approval-status.model';
import { UserTypes } from '../auth/auth.enum';

const prisma = new PrismaClient()

export const saveMobilePhoneDealer: RequestHandler = async (req, res, next) => {
  try {
    const { value, error } = mobilePhoneDealerSchema.validate(req.body);
    if (error) { log.error(error as Error); return res.status(400).json({ message: `Validation error on mobile phone dealer.` }); }
    const cleanedValues: MobilePhoneDealer = value;
    const result = await prisma.mobile_phone_dealers.create({
        data: {
            date_inspected: cleanedValues.dateInspected ? (cleanedValues.dateInspected as Date).toISOString() : null,
            client_id: cleanedValues.clientId as number,
            permit_number: cleanedValues.permitNumber,
            permit_expiry_date: cleanDate(cleanedValues.permitExpiryDate as Date),
            spares_and_accessories: {
                create: cleanedValues.listOfStocksOfSparesAndAccessories.map((val) => ({
                   particular: val.particular,
                   number_of_units: val.numberOfUnits
                }))
            },
            mobile_phones: {
                create: cleanedValues.listOfStocksOfMobilePhone.map((val) => ({
                   model: val.model,
                   imei_number: val.imeiNumber,
                   source: val.source
                }))
            },
            sim: {
                create: cleanedValues.listOfStocksOfSubscriberIdentificationModule.map((val) => ({
                   sim_number: val.simNumber,
                   mobile_phone_company: val.mobilePhoneCompany,
                }))
            },
            sundry_one: cleanedValues.sundryOfInformation.oneCb,
            sundry_two: cleanedValues.sundryOfInformation.twoCb,
            remarks_deficiencies_discrepancies_noted: cleanedValues.remarksDeficienciesDiscrepanciesNoted,
            inspected_by: cleanedValues.inspectedBy,
            owner_name: cleanedValues.ownerInfo.name,
            owner_position: cleanedValues.ownerInfo.position,
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
    res.status(500).json({ message: `Couldn't process mobile phone dealer data at this time.` });
  }
}

export const updateData: RequestHandler = async (req, res, next) => {
  try {
    const { value, error } = mobilePhoneDealerSchema.validate(req.body);
    if (error) { log.error(error as Error); return res.status(400).json({ message: `Validation error on mobile phone dealer.` }); }
    const cleanedValues: MobilePhoneDealer = value;
    const FORM_ID = cleanedValues.id;
    const data =  {
            date_inspected: cleanedValues.dateInspected ? cleanedValues.dateInspected as Date : null,
            client_id: cleanedValues.clientId as number,
            permit_number: cleanedValues.permitNumber,
            permit_expiry_date: cleanDate(cleanedValues.permitExpiryDate as Date),
            // spares_and_accessories: {
            //     create: cleanedValues.listOfStocksOfSparesAndAccessories.map((val) => ({
            //        particular: val.particular,
            //        number_of_units: val.numberOfUnits
            //     }))
            // },
            // mobile_phones: {
            //     create: cleanedValues.listOfStocksOfMobilePhone.map((val) => ({
            //        model: val.model,
            //        imei_number: val.imeiNumber,
            //        source: val.source
            //     }))
            // },
            // sim: {
            //     create: cleanedValues.listOfStocksOfSubscriberIdentificationModule.map((val) => ({
            //        sim_number: val.simNumber,
            //        mobile_phone_company: val.mobilePhoneCompany,
            //     }))
            // },
            sundry_one: cleanedValues.sundryOfInformation.oneCb,
            sundry_two: cleanedValues.sundryOfInformation.twoCb,
            remarks_deficiencies_discrepancies_noted: cleanedValues.remarksDeficienciesDiscrepanciesNoted,
            inspected_by: cleanedValues.inspectedBy,
            owner_name: cleanedValues.ownerInfo.name,
            owner_position: cleanedValues.ownerInfo.position,
            recommendations: cleanedValues.recommendations,
            noted_by: cleanedValues.notedBy,
            noted_by_approved: cleanedValues.notedByApproved,
            regional_director: cleanedValues.regionalDirector,
            regional_director_approved: cleanedValues.regionalDirectorApproved,
        }
    console.log({data})
    const updateMain = prisma.mobile_phone_dealers.update({
        where: {
            id: FORM_ID
        },
        data
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

    const deleteSpares = prisma.$queryRawUnsafe<void>(`DELETE FROM ${DATABASE_SCHEMA}.spares_and_accessories WHERE mobile_phone_dealer_id = ${FORM_ID}`);
    const deleteMobilePhones =  prisma.$queryRawUnsafe<void>(`DELETE FROM ${DATABASE_SCHEMA}.mobile_phones WHERE mobile_phone_dealer_id = ${FORM_ID}`);
    const deleteSIM = prisma.$queryRawUnsafe<void>(`DELETE FROM ${DATABASE_SCHEMA}.sim WHERE mobile_phone_dealer_id = ${FORM_ID}`);
    const insertSpares = prisma.spares_and_accessories.createMany({
        data: cleanedValues.listOfStocksOfSparesAndAccessories.map((val) => ({
            particular: val.particular,
            number_of_units: val.numberOfUnits,
            mobile_phone_dealer_id: FORM_ID
        }))
    });
    const insertMobilePhones = prisma.mobile_phones.createMany({
        data: cleanedValues.listOfStocksOfMobilePhone.map((val) => ({
            model: val.model,
            imei_number: val.imeiNumber,
            source: val.source,
            mobile_phone_dealer_id: FORM_ID
        }))
    });
    const insertSIM = prisma.sim.createMany({
        data: cleanedValues.listOfStocksOfSubscriberIdentificationModule.map((val) => ({
            sim_number: val.simNumber,
            mobile_phone_company: val.mobilePhoneCompany,
            mobile_phone_dealer_id: FORM_ID
        }))
    });
    await prisma.$transaction([deleteSpares, deleteMobilePhones, deleteSIM, insertSpares, insertMobilePhones, insertSIM, updateMain])

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
    const docs = (await prisma.mobile_phone_dealers.findMany({
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
            mobile_phones: true,
            spares_and_accessories: true,
            sim: true
        }
    })).map(formatData);;
    const docCount = await prisma.mobile_phone_dealers.count();

    res.status(200).json({ data: docs, collectionSize: docCount });
  } catch (error) {
      log.error(error as Error);
    res.status(500).json({ message: `Couldn't get mobile phone dealers at this time.` });
  }
}

export const deleteData: RequestHandler = async (req, res, next) => {
  try {
      const { id } = req.query;
    const deleteMain = prisma.mobile_phone_dealers.delete({
        where: {
            id: +(id as string)
        },
    });
    const deleteSpares = prisma.$queryRawUnsafe<void>(`DELETE FROM ${DATABASE_SCHEMA}.spares_and_accessories WHERE mobile_phone_dealer_id = ${id}`);
    const deleteMobilePhones = prisma.$queryRawUnsafe<void>(`DELETE FROM ${DATABASE_SCHEMA}.mobile_phones WHERE mobile_phone_dealer_id = ${id}`);
    const deleteSIM = prisma.$queryRawUnsafe<void>(`DELETE FROM ${DATABASE_SCHEMA}.sim WHERE mobile_phone_dealer_id = ${id}`);

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

    await prisma.$transaction([deleteMain, deleteSpares, deleteMobilePhones, deleteSIM])

    res.status(200).json({ message: 'Ok' });
  } catch (error) {
      log.error(error as Error);
    res.status(500).json({ message: `Couldn't get clients at this time.` });
  }
}

export const generatePdf: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.query;
    const doc = await prisma.mobile_phone_dealers.findUnique({
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
            spares_and_accessories: true,
            mobile_phones: true,
            sim: true
        }
    });
const regionalDirectorSignature =             
            {
                image: doc?.regional_director_info?.signature as string,
                x: 380,
                y: 480
            };
    const chiefSignature = {
        image: doc?.noted_by_info?.signature as string,
        x: 100,
        y: 475
    }
    let signatures: SignaturePlotDataRaw[] = [];
    if (doc?.regional_director_approved && doc?.regional_director_info?.signature) {
        signatures = [ ...signatures, regionalDirectorSignature];
    }
    if (doc?.noted_by_approved && doc?.noted_by_info?.signature) {
        signatures = [ ...signatures, chiefSignature];
    }
    const pdfValues = getPDFValues(formatData(doc));
    const options: ModifyPDFOptions = {
        isMultiplePage: true,
        startEndValuesPerPage: [
            { start: 0, end: 11, page: 1 },
            { start: 12, end: 19, page: 2 },
            { start: 20, page: 1 },
        ],
        customSignatureLocation: [
            { page: 2}
        ]
    };
    const pdf = await modifyPdf({ 
        entries: pdfValues, 
        pdfTemplate: PDFTemplate.mobilePhoneDealer, 
        signatures 
    }, options);

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${PDFTemplate.radioTransceiver}.pdf"`
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
    console.log(data.mobilePhoneDealer)
    const { value, error } = mobilePhoneDealerSchema.validate(data.mobilePhoneDealer);
    if (error) { log.error(error as Error); return res.status(400).json({ message: `Validation error on mobile phone dealer.` }); }
    const cleanedValues: MobilePhoneDealer = value;
    const FORM_ID = cleanedValues.id; 

    let directorInfo: users | null;
    let notedByInfo: users | null;
    
    if (data.position !== UserTypes.director && data.position !== UserTypes.chiefEngineer) {
        return res.status(400).json({ message: `Unauthorized access.` });
    }

    const prevData = await prisma.mobile_phone_dealers.findFirst({
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

    const updateMain = await prisma.mobile_phone_dealers.update({
        where: {
            id: FORM_ID
        },
        data: {
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
