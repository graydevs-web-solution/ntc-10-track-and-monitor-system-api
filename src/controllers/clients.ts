import { RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid';

import { Client } from '../models/clients/client.model';
import { clientSchema } from '../models/clients/client.joi';
import log from '../logger/index';
import { DATABASE_SCHEMA } from '../config/database';

const prisma = new PrismaClient()

export const saveClient: RequestHandler = async (req, res, next) => {
  try {
    const { value, error } = clientSchema.validate(req.body);
    if (error) { log.error(error as Error); return res.status(400).json({ message: `Validation error on client.` }); }
    const clientData: Client = value as Client;
    const { ownerName, businessName, ownerPosition, businessAddress, ...rest } = clientData;
    const result = await prisma.clients.create({
        data: {
            owner_name: ownerName,
            business_name: businessName,
            owner_position: ownerPosition,
            business_address: businessAddress,
            ...rest,
            clientId: uuid()
        }
    })

    res.status(200).json({ data: result });
  } catch (error) {
    log.error(error as Error);
    res.status(500).json({ message: `Couldn't process client data at this time.` });
  }
}

export const getClients: RequestHandler = async (req, res, next) => {
  try {
    const { page, size, search } = req.query;
    let query = { take: +(size as string), skip: +(size as string) * (+(page as string) - 1) };
    if (search) { (query as any).where = { name: { contains: search }}};
    const docs = await prisma.clients.findMany();
    const docCount = await prisma.clients.count();

    res.status(200).json({ data: docs, collectionSize: docCount });
  } catch (error) {
      log.error(error as Error);
    res.status(500).json({ message: `Couldn't get clients at this time.` });
  }
}

export const getClient: RequestHandler = async (req, res, next) => {
  try {
      const { id } = req.query;
    // const doc = await ClientModel.findOne({ cnId: id as string })

    // res.status(200).json({ data: doc });
  } catch (error) {
    res.status(500).json({ message: `Couldn't get clients at this time.` });
  }
}

export const searchClient: RequestHandler = async (req, res, next) => {
  try {
      const { search } = req.query;
      const query = `SELECT * FROM ${DATABASE_SCHEMA}.clients WHERE business_name ILIKE '%${search}%' or owner_name ILIKE '%${search}%'`;
    const docs = await prisma.$queryRawUnsafe<Client[]>(query);
    
    // const docCount = await prisma.clients.count();

    res.status(200).json({ data: docs });
  } catch (error) {
      log.error(error as Error);
    res.status(500).json({ message: `Couldn't get clients at this time.` });
  }
}
