import { RequestHandler, response } from 'express';
import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid';
import { RadioTransceiver } from '../../models/radio-transceivers/radio-transceiver.model';
import { radioTransceiverSchema } from '../../models/radio-transceivers/radio-transceiver.joi';
import log from '../../logger/index';
import { DATABASE_SCHEMA } from '../../config/database';
import { modifyPdf } from '../../shared/pdf-generate';
import { PDFTemplate } from '../../shared/pdf-generate.enum';
import { getPDFValues } from './radio-transceiver-plots';
import { RadioTransceiverAPI } from '../../models/radio-transceivers/radio-transceiver-api.model';
import { formatData } from '../../shared/utility';

const prisma = new PrismaClient()

export const saveRadioTransceivers: RequestHandler = async (req, res, next) => {
  try {
    const { value, error } = radioTransceiverSchema.validate(req.body);
    if (error) { log.error(error as Error); return res.status(400).json({ message: `Validation error on radio transceiver.` }); }
    const cleanedValues: RadioTransceiver = value;
    console.log(cleanedValues)
    const result = await prisma.radio_transceivers.create({
        data: {
            client_id: cleanedValues.clientId,
            class_type: cleanedValues.classType,
            nature_of_service: cleanedValues.natureOfService,
            working_hours: cleanedValues.workingHours,
            form_type: cleanedValues.formType,
            call_sign: cleanedValues.callSign,
            motor_number: cleanedValues.motorNumber,
            plate_number: cleanedValues.plateNumber,
            gross_tonnage: cleanedValues.grossTonnage,
            pp_number: cleanedValues.ppInfo.ppNumber,
            pp_date_issued: cleanedValues.ppInfo?.dateIssued ? (cleanedValues.ppInfo.dateIssued as Date).toISOString() : null,
            tp_number: cleanedValues.tpInfo.tpNumber,
            tp_expiration_date: cleanedValues.tpInfo?.expirationDate ? (cleanedValues.tpInfo.expirationDate as Date).toISOString() : null,
            cp_number: cleanedValues.cpInfo.cpNumber,
            cp_expiration_date: cleanedValues.cpInfo?.expirationDate ? (cleanedValues.cpInfo.expirationDate as Date).toISOString() : null,
            license_number: cleanedValues.licInfo.licNumber,
            license_expiration_date: cleanedValues.licInfo?.expirationDate ? (cleanedValues.licInfo.expirationDate as Date).toISOString() : null,
            points_of_communication: cleanedValues.pointsOfCommunication,
            freq_assigned_freq: cleanedValues.frequenciesInfo.assignedFreq,
            freq_crystal_freq: cleanedValues.frequenciesInfo.crystalFreq,
            freq_measured_freq: cleanedValues.frequenciesInfo.measuredFreq,
            freq_if_receiver: cleanedValues.frequenciesInfo.ifReceiver,
            freq_type_of_emission: cleanedValues.frequenciesInfo.typeOfEmission,
            as_type: cleanedValues.antennaSystemInfo.type,
            as_elevation_from_gmd: cleanedValues.antennaSystemInfo.elevationFromGmd,
            as_length_of_radiator: cleanedValues.antennaSystemInfo.lengthOfRadiator,
            as_gain: cleanedValues.antennaSystemInfo.gain,
            as_directivity: cleanedValues.antennaSystemInfo.directivity,
            as_power_supply: cleanedValues.antennaSystemInfo.powerSupply,
            as_battery: cleanedValues.antennaSystemInfo.battery,
            as_voltage_and_type: cleanedValues.antennaSystemInfo.voltageAndType,
            as_capacity: cleanedValues.antennaSystemInfo.capacity,
            as_ah: cleanedValues.antennaSystemInfo.ah,
            illegal_construction_without_permit: cleanedValues.illegalConstructionInfo.constructionsOfRadioStationsWithoutConstructionPermit,
            illegal_transfer: cleanedValues.illegalConstructionInfo.illegalTransfer,
            operation_without_rsl: cleanedValues.illegalOperationInfo.operationWithoutRadioStationLicensePermit,
            operation_without_lro: cleanedValues.illegalOperationInfo.operationWithoutLicenseRadioOperator,
            operation_without_logbook: cleanedValues.illegalOperationInfo.operationWithoutLogbook,
            operation_on_lower_sideband: cleanedValues.illegalOperationInfo.operationOnLowerSideband,
            operation_on_unauthorized_hours: cleanedValues.illegalOperationInfo.operationOnUnauthorizedHours,
            operation_operating_unauthorized_freq: cleanedValues.illegalOperationInfo.operatingOnUnauthorizedFrequency,
            off_frequency: cleanedValues.illegalOperationInfo.offFrequency,
            still_in_the_old_frequency_grouping: cleanedValues.illegalOperationInfo.stillInTheOldFrequencyGrouping,
            illegal_possession: cleanedValues.illegalPossession,
            others: cleanedValues.others,
            sundray_info_radio_operator_logbook: cleanedValues.sundrayInformationAboutRS.isRadioOperatorEntryLogbooK,
            sundray_info_station_product_unwanted_signal: cleanedValues.sundrayInformationAboutRS.isStationProduceUnwantedSignals,
            sundray_info_radio_equipment_operative: cleanedValues.sundrayInformationAboutRS.isRadioEquipmentOperativeOnInspection,
            authorized_representative: cleanedValues.authorizedRepresentative,
            radio_requlation_inspector: cleanedValues.radioRegulationInspector,
            recommendations: cleanedValues.recommendations,
            noted_by: cleanedValues.notedBy,
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
            },
            radio_transceiver_others: {
                create: cleanedValues.otherEquipments.map((val) => ({
                   name: val.name,
                   serial_number: val.serialNumber,
                   freq_range: val.freqRange,
                   power_output: val.powerOutput,
                   freq_control: val.freqControl 
                }))
            },
            radio_transceiver_receivers: {
                create: cleanedValues.receivers.map((val) => ({
                   name: val.name,
                   serial_number: val.serialNumber,
                   freq_range: val.freqRange,
                   power_output: val.powerOutput,
                   freq_control: val.freqControl 
                }))
            }
        }
    })

    res.status(200).json({ data: result });
  } catch (error) {
    log.error(error as Error);
    res.status(500).json({ message: `Couldn't process client data at this time.` });
  }
}

export const updateData: RequestHandler = async (req, res, next) => {
  try {
    const { value, error } = radioTransceiverSchema.validate(req.body);
    if (error) { log.error(error as Error); return res.status(400).json({ message: `Validation error on radio transceiver.` }); }
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
            motor_number: cleanedValues.motorNumber,
            plate_number: cleanedValues.plateNumber,
            gross_tonnage: cleanedValues.grossTonnage,
            pp_number: cleanedValues.ppInfo.ppNumber,
            pp_date_issued: cleanedValues.ppInfo?.dateIssued ? cleanedValues.ppInfo.dateIssued as Date: null,
            tp_number: cleanedValues.tpInfo.tpNumber,
            tp_expiration_date: cleanedValues.tpInfo?.expirationDate ? (cleanedValues.tpInfo.expirationDate as Date).toISOString() : null,
            cp_number: cleanedValues.cpInfo.cpNumber,
            cp_expiration_date: cleanedValues.cpInfo?.expirationDate ? cleanedValues.cpInfo.expirationDate as Date : null,
            license_number: cleanedValues.licInfo.licNumber,
            license_expiration_date: cleanedValues.licInfo?.expirationDate ? cleanedValues.licInfo.expirationDate as Date : null,
            points_of_communication: cleanedValues.pointsOfCommunication,
            freq_assigned_freq: cleanedValues.frequenciesInfo.assignedFreq,
            freq_crystal_freq: cleanedValues.frequenciesInfo.crystalFreq,
            freq_measured_freq: cleanedValues.frequenciesInfo.measuredFreq,
            freq_if_receiver: cleanedValues.frequenciesInfo.ifReceiver,
            freq_type_of_emission: cleanedValues.frequenciesInfo.typeOfEmission,
            as_type: cleanedValues.antennaSystemInfo.type,
            as_length_of_radiator: cleanedValues.antennaSystemInfo.lengthOfRadiator,
            as_elevation_from_gmd: cleanedValues.antennaSystemInfo.elevationFromGmd,
            as_gain: cleanedValues.antennaSystemInfo.gain,
            as_directivity: cleanedValues.antennaSystemInfo.directivity,
            as_power_supply: cleanedValues.antennaSystemInfo.powerSupply,
            as_battery: cleanedValues.antennaSystemInfo.battery,
            as_voltage_and_type: cleanedValues.antennaSystemInfo.voltageAndType,
            as_capacity: cleanedValues.antennaSystemInfo.capacity,
            as_ah: cleanedValues.antennaSystemInfo.ah,
            illegal_construction_without_permit: cleanedValues.illegalConstructionInfo.constructionsOfRadioStationsWithoutConstructionPermit,
            illegal_transfer: cleanedValues.illegalConstructionInfo.illegalTransfer,
            operation_without_rsl: cleanedValues.illegalOperationInfo.operationWithoutRadioStationLicensePermit,
            operation_without_lro: cleanedValues.illegalOperationInfo.operationWithoutLicenseRadioOperator,
            operation_without_logbook: cleanedValues.illegalOperationInfo.operationWithoutLogbook,
            operation_on_lower_sideband: cleanedValues.illegalOperationInfo.operationOnLowerSideband,
            operation_on_unauthorized_hours: cleanedValues.illegalOperationInfo.operationOnUnauthorizedHours,
            operation_operating_unauthorized_freq: cleanedValues.illegalOperationInfo.operatingOnUnauthorizedFrequency,
            off_frequency: cleanedValues.illegalOperationInfo.offFrequency,
            still_in_the_old_frequency_grouping: cleanedValues.illegalOperationInfo.stillInTheOldFrequencyGrouping,
            illegal_possession: cleanedValues.illegalPossession,
            others: cleanedValues.others,
            sundray_info_radio_operator_logbook: cleanedValues.sundrayInformationAboutRS.isRadioOperatorEntryLogbooK,
            sundray_info_station_product_unwanted_signal: cleanedValues.sundrayInformationAboutRS.isStationProduceUnwantedSignals,
            sundray_info_radio_equipment_operative: cleanedValues.sundrayInformationAboutRS.isRadioEquipmentOperativeOnInspection,
            authorized_representative: cleanedValues.authorizedRepresentative,
            radio_requlation_inspector: cleanedValues.radioRegulationInspector,
            recommendations: cleanedValues.recommendations,
            noted_by: cleanedValues.notedBy,
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

    const deleteOperators = prisma.$queryRawUnsafe<void>(`DELETE FROM ${DATABASE_SCHEMA}.radio_transceiver_operators WHERE radio_transceiver_id = ${FORM_ID}`);
    const deleteRTItems = prisma.$queryRawUnsafe<void>(`DELETE FROM ${DATABASE_SCHEMA}.radio_transceiver_items WHERE radio_transceiver_id = ${FORM_ID}`);
    const deleteReceivers = prisma.$queryRawUnsafe<void>(`DELETE FROM ${DATABASE_SCHEMA}.radio_transceiver_receivers WHERE radio_transceiver_id = ${FORM_ID}`);
    const deleteRTOthers = prisma.$queryRawUnsafe<void>(`DELETE FROM ${DATABASE_SCHEMA}.radio_transceiver_others WHERE radio_transceiver_id = ${FORM_ID}`);
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
    const insertRTReceivers = prisma.radio_transceiver_receivers.createMany({
        data: cleanedValues.receivers.map((val) => ({
            name: val.name,
            serial_number: val.serialNumber,
            freq_range: val.freqRange,
            power_output: val.powerOutput,
            freq_control: val.freqControl,
            radio_transceiver_id: FORM_ID
        }))
    });
    const insertRTOthers = prisma.radio_transceiver_others.createMany({
        data: cleanedValues.otherEquipments.map((val) => ({
            name: val.name,
            serial_number: val.serialNumber,
            freq_range: val.freqRange,
            power_output: val.powerOutput,
            freq_control: val.freqControl,
            radio_transceiver_id: FORM_ID
        }))
    });
    await prisma.$transaction([
        updateMain, 
        deleteOperators, 
        deleteRTItems, 
        deleteReceivers, 
        deleteRTOthers, 
        insertOperators, 
        insertRTItems, 
        insertRTReceivers, 
        insertRTOthers
    ])

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
    const docs = (await prisma.radio_transceivers.findMany({
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
            radio_transceiver_items: true,
            radio_transceiver_operators: true,
            radio_transceiver_receivers: true,
            radio_transceiver_others: true
        }
    })).map(formatData);
    const docCount = await prisma.radio_transceivers.count();
    res.status(200).json({ data: docs, collectionSize: docCount });
  } catch (error) {
      log.error(error as Error);
    res.status(500).json({ message: `Couldn't get radio transceivers at this time.` });
  }
}

export const deleteData: RequestHandler = async (req, res, next) => {
  try {
      const { id } = req.query;
    const deleteMain = prisma.radio_transceivers.delete({
        where: {
            id: +(id as string)
        },
    });

    const deleteOperators = prisma.$queryRawUnsafe<void>(`DELETE FROM ${DATABASE_SCHEMA}.radio_transceiver_operators WHERE radio_transceiver_id = ${id}`);
    const deleteRTItems = prisma.$queryRawUnsafe<void>(`DELETE FROM ${DATABASE_SCHEMA}.radio_transceiver_items WHERE radio_transceiver_id = ${id}`);
    const deleteReceivers = prisma.$queryRawUnsafe<void>(`DELETE FROM ${DATABASE_SCHEMA}.radio_transceiver_receivers WHERE radio_transceiver_id = ${id}`);
    const deleteRTOthers = prisma.$queryRawUnsafe<void>(`DELETE FROM ${DATABASE_SCHEMA}.radio_transceiver_others WHERE radio_transceiver_id = ${id}`);

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

    await prisma.$transaction([deleteMain, deleteOperators, deleteRTItems, deleteReceivers, deleteRTOthers])

    res.status(200).json({ message: 'Ok' });
  } catch (error) {
    log.error(error as Error);
    res.status(500).json({ message: `Couldn't get clients at this time.` });
  }
}

export const generatePdf: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.query;
    const doc = await prisma.radio_transceivers.findUnique({
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
                    exactLocation: true
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
            radio_transceiver_items: true,
            radio_transceiver_operators: true,
            radio_transceiver_receivers: true,
            radio_transceiver_others: true
        }
    });

    const pdf = await modifyPdf(getPDFValues(formatData(doc)), PDFTemplate.radioTransceiver);

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



// export const getClient: RequestHandler = async (req, res, next) => {
//   try {
//       const { id } = req.query;
//     // const doc = await ClientModel.findOne({ cnId: id as string })

//     // res.status(200).json({ data: doc });
//   } catch (error as Error) {
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
//   } catch (error as Error) {
//       log.error(error as Error);
//     res.status(500).json({ message: `Couldn't get clients at this time.` });
//   }
// }
