import { RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid';
import { DateTime } from 'luxon';

import { dateWithPadding } from '../../shared/utility';
import { RadioTransceiver } from '../../models/core/radio-transceivers/radio-transceiver.model';
import { radioTransceiverSchema } from '../../models/core/radio-transceivers/radio-transceiver.joi';
import log from '../../logger/index';
import { DATABASE_SCHEMA } from '../../config/database/database';

const prisma = new PrismaClient()

export const saveRadioTransceivers: RequestHandler = async (req, res, next) => {
  try {
    const { value, error } = radioTransceiverSchema.validate(req.body);
    if (error) { log.error(error); return res.status(400).json({ message: `Validation error on radio transceiver.` }); }
    const cleanedValues: RadioTransceiver = value;
    const result = await prisma.radio_transceivers.create({
        data: {
            client_id: cleanedValues.clientId,
            class_type: cleanedValues.classType,
            nature_of_service: cleanedValues.natureOfService,
            working_hours: cleanedValues.workingHours,
            form_type: cleanedValues.formType,
            call_sign: cleanedValues.callSign,
            pp_number: cleanedValues.ppInfo.ppNumber,
            pp_date_issued: cleanedValues.ppInfo?.dateIssued ? (cleanedValues.ppInfo.dateIssued as Date).toISOString() : null,
            cp_number: cleanedValues.cpInfo.cpNumber,
            cp_date_issued: cleanedValues.cpInfo?.expirationDate ? (cleanedValues.cpInfo.expirationDate as Date).toISOString() : null,
            license_number: cleanedValues.licInfo.licNumber,
            license_date_issued: cleanedValues.licInfo?.expirationDate ? (cleanedValues.licInfo.expirationDate as Date).toISOString() : null,
            points_of_communication: cleanedValues.pointsOfCommunication,
            freq_assigned_freq: cleanedValues.frequenciesInfo.assignedFreq,
            freq_crystal_freq: cleanedValues.frequenciesInfo.crystalFreq,
            freq_measured_freq: cleanedValues.frequenciesInfo.measuredFreq,
            freq_if_receiver: cleanedValues.frequenciesInfo.ifReceiver,
            freq_type_of_emission: cleanedValues.frequenciesInfo.typeOfEmission,
            freq_antenna_system_type: cleanedValues.frequenciesInfo.antennaSystemType,
            freq_elevation_from_gmd: cleanedValues.frequenciesInfo.elevationFromGmd,
            freq_gain: cleanedValues.frequenciesInfo.gain,
            freq_directivity: cleanedValues.frequenciesInfo.directivity,
            freq_power_supply: cleanedValues.frequenciesInfo.powerSupply,
            freq_battery: cleanedValues.frequenciesInfo.battery,
            freq_voltage_and_type: cleanedValues.frequenciesInfo.voltageAndType,
            freq_capacity: cleanedValues.frequenciesInfo.capacity,
            freq_ah: cleanedValues.frequenciesInfo.ah,
            illegal_construction_without_permit: cleanedValues.illegalConstructionInfo.constructionsOfRadioStationsWithoutConstructionPermit,
            illegal_transfer: cleanedValues.illegalConstructionInfo.illegalTransfer,
            operation_without_rsl: cleanedValues.illegalOperationInfo.operationWithoutRadioStationLicensePermit,
            operation_without_lro: cleanedValues.illegalOperationInfo.operationWithoutLicenseRadioOperator,
            operation_without_logbook: cleanedValues.illegalOperationInfo.operationWithoutLogbook,
            operation_operating_unauthorized_freq: cleanedValues.illegalOperationInfo.operatingOnUnauthorizedFrequency,
            illegal_possession: cleanedValues.illegalPossession,
            others: cleanedValues.others,
            radio_requlation_inspector: cleanedValues.radioRegulationInspector,
            authorized_representative: cleanedValues.authorizedRepresentative,
            regional_director: cleanedValues.regionalDirector,
            date_issued: cleanedValues.dateIssued ? (cleanedValues.dateIssued as Date).toISOString() : null,
            radio_transceiver_items: {
                create: cleanedValues.radioTransceivers.map((val) => ({
                   model: val.model,
                   serial_number: val.serialNumber,
                   freq_range: val.freqRange,
                   power_output: val.powerOutput,
                   freq_control: val.freqControl 
                }))
            },
            radio_transceiver_operators: {
                create: cleanedValues.operators.map((val) => ({
                name: val.name,
                particular_of_license: val.particularOfLicense,
                expiration_date: val.expirationDate
            }))
            }
        }
    })

    res.status(200).json({ data: result });
  } catch (error) {
    log.error(error);
    res.status(500).json({ message: `Couldn't process client data at this time.` });
  }
}

export const updateData: RequestHandler = async (req, res, next) => {
  try {
    const { value, error } = radioTransceiverSchema.validate(req.body);
    if (error) { log.error(error); return res.status(400).json({ message: `Validation error on radio transceiver.` }); }
    const cleanedValues: RadioTransceiver = value;
    const FORM_ID = cleanedValues.id;
    const updateMain = prisma.radio_transceivers.update({
        where: {
            id: FORM_ID
        },
        data: {
            client_id: cleanedValues.clientId,
            class_type: cleanedValues.classType,
            nature_of_service: cleanedValues.natureOfService,
            working_hours: cleanedValues.workingHours,
            form_type: cleanedValues.formType,
            call_sign: cleanedValues.callSign,
            pp_number: cleanedValues.ppInfo.ppNumber,
            pp_date_issued: cleanedValues.ppInfo?.dateIssued ? cleanedValues.ppInfo.dateIssued as Date: null,
            cp_number: cleanedValues.cpInfo.cpNumber,
            cp_date_issued: cleanedValues.cpInfo?.expirationDate ? cleanedValues.cpInfo.expirationDate as Date : null,
            license_number: cleanedValues.licInfo.licNumber,
            license_date_issued: cleanedValues.licInfo?.expirationDate ? cleanedValues.licInfo.expirationDate as Date : null,
            points_of_communication: cleanedValues.pointsOfCommunication,
            freq_assigned_freq: cleanedValues.frequenciesInfo.assignedFreq,
            freq_crystal_freq: cleanedValues.frequenciesInfo.crystalFreq,
            freq_measured_freq: cleanedValues.frequenciesInfo.measuredFreq,
            freq_if_receiver: cleanedValues.frequenciesInfo.ifReceiver,
            freq_type_of_emission: cleanedValues.frequenciesInfo.typeOfEmission,
            freq_antenna_system_type: cleanedValues.frequenciesInfo.antennaSystemType,
            freq_elevation_from_gmd: cleanedValues.frequenciesInfo.elevationFromGmd,
            freq_gain: cleanedValues.frequenciesInfo.gain,
            freq_directivity: cleanedValues.frequenciesInfo.directivity,
            freq_power_supply: cleanedValues.frequenciesInfo.powerSupply,
            freq_battery: cleanedValues.frequenciesInfo.battery,
            freq_voltage_and_type: cleanedValues.frequenciesInfo.voltageAndType,
            freq_capacity: cleanedValues.frequenciesInfo.capacity,
            freq_ah: cleanedValues.frequenciesInfo.ah,
            illegal_construction_without_permit: cleanedValues.illegalConstructionInfo.constructionsOfRadioStationsWithoutConstructionPermit,
            illegal_transfer: cleanedValues.illegalConstructionInfo.illegalTransfer,
            operation_without_rsl: cleanedValues.illegalOperationInfo.operationWithoutRadioStationLicensePermit,
            operation_without_lro: cleanedValues.illegalOperationInfo.operationWithoutLicenseRadioOperator,
            operation_without_logbook: cleanedValues.illegalOperationInfo.operationWithoutLogbook,
            operation_operating_unauthorized_freq: cleanedValues.illegalOperationInfo.operatingOnUnauthorizedFrequency,
            illegal_possession: cleanedValues.illegalPossession,
            others: cleanedValues.others,
            radio_requlation_inspector: cleanedValues.radioRegulationInspector,
            authorized_representative: cleanedValues.authorizedRepresentative,
            regional_director: cleanedValues.regionalDirector,
            date_issued: cleanedValues.dateIssued ? cleanedValues.dateIssued as Date : null,
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

    const deleteOperators = prisma.$executeRaw(`DELETE FROM ${DATABASE_SCHEMA}.radio_transceiver_operators WHERE radio_transceiver_id = ${FORM_ID}`);
    const deleteRTItems = prisma.$executeRaw(`DELETE FROM ${DATABASE_SCHEMA}.radio_transceiver_items WHERE radio_transceiver_id = ${FORM_ID}`);
    const insertOperators = prisma.radio_transceiver_operators.createMany({
        data: cleanedValues.operators.map((val) => ({
            name: val.name,
            particular_of_license: val.particularOfLicense,
            expiration_date: val.expirationDate ? (val.expirationDate as Date).toISOString() : null,
            radio_transceiver_id: FORM_ID
        }))
    });
    const insertRTItems = prisma.radio_transceiver_items.createMany({
        data: cleanedValues.radioTransceivers.map((val) => ({
            model: val.model,
            serial_number: val.serialNumber,
            freq_range: val.freqRange,
            power_output: val.powerOutput,
            freq_control: val.freqControl,
            radio_transceiver_id: FORM_ID
        }))
    });
    await prisma.$transaction([updateMain, deleteOperators, deleteRTItems, insertOperators, insertRTItems])

    res.status(200).json({ message: 'Ok' });
  } catch (error) {
    log.error(error);
    res.status(500).json({ message: `Couldn't process client data at this time.` });
  }
}

export const getList: RequestHandler = async (req, res, next) => {
  try {
    const { page, size, search } = req.query;
    let query = { take: +(size as string), skip: +(size as string) * (+(page as string) - 1) };
    if (search) { (query as any).where = { name: { contains: search }}};
    const docs = await prisma.radio_transceivers.findMany({
        include: {
            clients: {
                select: {
                    name: true
                }
            },
            radio_transceiver_items: true,
            radio_transceiver_operators: true
        }
    });
    const docCount = await prisma.radio_transceivers.count();

    res.status(200).json({ data: docs, collectionSize: docCount });
  } catch (error) {
      log.error(error);
    res.status(500).json({ message: `Couldn't get radio transceivers at this time.` });
  }
}

export const deleteData: RequestHandler = async (req, res, next) => {
  try {
      const { id } = req.query;
    const deleteMain = prisma.radio_transceivers.delete({
        where: {
            id: +(id as string)
        }
    });
     const deleteOperators = prisma.$executeRaw(`DELETE FROM ${DATABASE_SCHEMA}.radio_transceiver_operators WHERE radio_transceiver_id = ${id}`);
    const deleteRTItems = prisma.$executeRaw(`DELETE FROM ${DATABASE_SCHEMA}.radio_transceiver_items WHERE radio_transceiver_id = ${id}`);

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

    await prisma.$transaction([deleteMain, deleteOperators, deleteRTItems])
    res.status(200).json({ message: 'Ok' });
  } catch (error) {
      log.error(error);
    res.status(500).json({ message: `Couldn't get clients at this time.` });
  }
}

// export const getClient: RequestHandler = async (req, res, next) => {
//   try {
//       const { id } = req.query;
//     // const doc = await ClientModel.findOne({ cnId: id as string })

//     // res.status(200).json({ data: doc });
//   } catch (error) {
//     res.status(500).json({ message: `Couldn't get clients at this time.` });
//   }
// }

// export const searchClient: RequestHandler = async (req, res, next) => {
//   try {
//       const { search } = req.query;

//     const docs = await prisma.$queryRaw<Client[]>(`
//         SELECT name, id FROM ${DATABASE_SCHEMA}.clients WHERE to_tsvector(name) @@ to_tsquery('${search}')
//         `);
//     // const docCount = await prisma.${DATABASE_SCHEMA}.count();


//     res.status(200).json({ data: docs });
//   } catch (error) {
//       log.error(error);
//     res.status(500).json({ message: `Couldn't get clients at this time.` });
//   }
// }
