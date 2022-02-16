import { RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid';
import { attempt, number } from 'joi';

import log from '../logger/index';
import { regionalDirectorSchema } from '../models/system-setting/user-assigned.joi';
import { UserAssignedData } from '../models/system-setting/user_assigned-data';
import { DATABASE_SCHEMA } from '../config/database';
import { Setting } from '../models/system-setting/setting';

const prisma = new PrismaClient()

export const getRegionalDirector: RequestHandler = async (req, res, next) => {
  try {
    const { page, size, search } = req.query;
    let data = { name: ``, position: ``, user_id: `` };
    let query = { take: +(size as string), skip: +(size as string) * (+(page as string) - 1) };
    if (search) { (query as any).where = { name: { contains: search }}};
    const doc = await prisma.system_settings.findFirst({
        where: {
            setting: 'regional_director'
        },
    });
    if (!doc?.value) {
        return res.status(200).json({ data });
    }

    const doc2 = await prisma.users.findFirst({
        where: {
            user_id: doc?.value
        },
    });
    data = { user_id: `${doc2!.user_id}`, name: `${doc2!.name_first} ${doc2!.name_last}`, position: doc2!.position }
    res.status(200).json({ data });
  } catch (error) {
      log.error(error as Error);
    res.status(500).json({ message: `Couldn't get regional director at this time.` });
  }
}

export const getNotedBy: RequestHandler = async (req, res, next) => {
  try {
    const { page, size, search } = req.query;
    let data = { name: ``, position: ``, user_id: `` };
    let query = { take: +(size as string), skip: +(size as string) * (+(page as string) - 1) };
    if (search) { (query as any).where = { name: { contains: search }}};
    const doc = await prisma.system_settings.findFirst({
        where: {
            setting: 'noted_by'
        },
    });
    if (!doc?.value) {
        return res.status(200).json({ data });
    }

    const doc2 = await prisma.users.findFirst({
        where: {
            user_id: doc?.value
        },
    });
    data = { user_id: `${doc2!.user_id}`, name: `${doc2!.name_first} ${doc2!.name_last}`, position: doc2!.position }
    res.status(200).json({ data });
  } catch (error) {
      log.error(error as Error);
    res.status(500).json({ message: `Couldn't get noted by at this time.` });
  }
}

export const updateRegionalDirector: RequestHandler = async (req, res, next) => {
  try {
    const { value, error } = regionalDirectorSchema.validate(req.body);
    if (error) { log.error(error as Error); return res.status(400).json({ message: `Validation error on regional director.` }); }
    const cleanedValues: UserAssignedData = value as UserAssignedData;
    // console.log(`UPDATE ${DATABASE_SCHEMA}.system_settings SET value = "${cleanedValues.user_id}" WHERE setting = "regional_director"`)
    const updateRegionalDirector = prisma.$queryRawUnsafe<void>(`UPDATE ${DATABASE_SCHEMA}.system_settings SET value = '${cleanedValues.user_id}' WHERE setting = 'regional_director'`);
    await prisma.$transaction([updateRegionalDirector])

    const doc2 = await prisma.users.findFirst({
        where: {
            user_id: cleanedValues.user_id
        },
    });
    const data = { user_id: `${doc2!.user_id}`, name: `${doc2!.name_first} ${doc2!.name_last}`, position: doc2!.position }

    res.status(200).json({ data });
  } catch (error) {
    log.error(error as Error);
    res.status(500).json({ message: `Couldn't update regional director data at this time.` });
  }
}

export const updateNotedBy: RequestHandler = async (req, res, next) => {
  try {
    const { value, error } = regionalDirectorSchema.validate(req.body);
    if (error) { log.error(error as Error); return res.status(400).json({ message: `Validation error on noted by.` }); }
    const cleanedValues: UserAssignedData = value  as UserAssignedData;
    // console.log(`UPDATE ${DATABASE_SCHEMA}.system_settings SET value = "${cleanedValues.user_id}" WHERE setting = "regional_director"`)
    const updateRegionalDirector = prisma.$queryRawUnsafe<void>(`UPDATE ${DATABASE_SCHEMA}.system_settings SET value = '${cleanedValues.user_id}' WHERE setting = 'noted_by'`);
    await prisma.$transaction([updateRegionalDirector])

    const doc2 = await prisma.users.findFirst({
        where: {
            user_id: cleanedValues.user_id
        },
    });
    const data = { user_id: `${doc2!.user_id}`, name: `${doc2!.name_first} ${doc2!.name_last}`, position: doc2!.position }

    res.status(200).json({ data });
  } catch (error) {
    log.error(error as Error);
    res.status(500).json({ message: `Couldn't update default noted by data at this time.` });
  }
}

export const getAllFormCounters: RequestHandler = async (req, res, next) => {
  try {
    const { page, size, search } = req.query;
    let data = { data: [] };
    let query = { take: +(size as string), skip: +(size as string) * (+(page as string) - 1) };
    if (search) { (query as any).where = { name: { contains: search }}};
    const docs = await prisma.system_settings.findMany({
        where: {
            OR: [
                { setting: 'adm_counter' },
                { setting: 'rox_counter' },
            ]
        },
    });
    res.status(200).json({ data: docs });
  } catch (error) {
      log.error(error as Error);
    res.status(500).json({ message: `Couldn't get regional director at this time.` });
  }
}

export const updateADM: RequestHandler = async (req, res, next) => {
  try {
    const value = `${(attempt(req.body.data, number()))}`;
    // console.log(`UPDATE ${DATABASE_SCHEMA}.system_settings SET value = "${cleanedValues.user_id}" WHERE setting = "regional_director"`)
    const updateADM = prisma.$queryRawUnsafe<void>(`UPDATE ${DATABASE_SCHEMA}.system_settings SET value = '${value}' WHERE setting = 'adm_counter'`);
    await prisma.$transaction([updateADM])

    res.status(200).json({ message: 'ADM Counter successfully saved!' });
  } catch (error) {
    log.error(error as Error);
    res.status(500).json({ message: `Couldn't process radio dealer data at this time.` });
  }
}

export const updateROX: RequestHandler = async (req, res, next) => {
  try {
    const value = `${(attempt(req.body.data, number()))}`;
    // console.log(`UPDATE ${DATABASE_SCHEMA}.system_settings SET value = "${cleanedValues.user_id}" WHERE setting = "regional_director"`)
    const updateROX = prisma.$queryRawUnsafe<void>(`UPDATE ${DATABASE_SCHEMA}.system_settings SET value = '${value}' WHERE setting = 'rox_counter'`);
    await prisma.$transaction([updateROX])

    res.status(200).json({ message: 'ROX Counter successfully saved!' });
  } catch (error) {
    log.error(error as Error);
    res.status(500).json({ message: `Couldn't process radio dealer data at this time.` });
  }
}

// export const saveClient: RequestHandler = async (req, res, next) => {
//   try {
//     const { value, error } = clientSchema.validate(req.body);
//     if (error) { log.error(error as Error); return res.status(400).json({ message: `Validation error on client.` }); }
//     const clientData: Client = value;
//     const { ownerName, businessName, ownerPosition, businessAddress, ...rest } = clientData;
//     const result = await prisma.clients.create({
//         data: {
//             owner_name: ownerName,
//             business_name: businessName,
//             owner_position: ownerPosition,
//             business_address: businessAddress,
//             ...rest,
//             clientId: uuid()
//         }
//     })

//     res.status(200).json({ data: result });
//   } catch (error) {
//     log.error(error as Error);
//     res.status(500).json({ message: `Couldn't process client data at this time.` });
//   }
// }

// export const getClients: RequestHandler = async (req, res, next) => {
//   try {
//     const { page, size, search } = req.query;
//     let query = { take: +(size as string), skip: +(size as string) * (+(page as string) - 1) };
//     if (search) { (query as any).where = { name: { contains: search }}};
//     const docs = await prisma.clients.findMany();
//     const docCount = await prisma.clients.count();

//     res.status(200).json({ data: docs, collectionSize: docCount });
//   } catch (error) {
//       log.error(error as Error);
//     res.status(500).json({ message: `Couldn't get clients at this time.` });
//   }
// }

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
//         SELECT * FROM ${DATABASE_SCHEMA}.clients WHERE to_tsvector(business_name) @@ to_tsquery('${search}')
//         `);
//     // const docCount = await prisma.clients.count();

//     res.status(200).json({ data: docs });
//   } catch (error) {
//       log.error(error as Error);
//     res.status(500).json({ message: `Couldn't get clients at this time.` });
//   }
// }
