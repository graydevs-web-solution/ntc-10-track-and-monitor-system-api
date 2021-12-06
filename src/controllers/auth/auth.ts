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
import { AuthenticateUser } from '../../models/auth/authenticate-user';
import { authUserSchema } from '../../models/auth/authenticate-user.joi';
import { hash, compare }from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User } from '../../models/auth/user';
import { userSchema } from '../../models/auth/user.joi';
 
const prisma = new PrismaClient();
const hashPassword = (password: string) => hash(password, 10);

export const authenticateUser: RequestHandler = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const { value , error } = authUserSchema.validate({ username, password });
        const userNotFoundErrorMessage =
            'The email and/or password you entered did not match our records. Please double-check and try again.';
        const doc = await prisma.users.findFirst({
            where: {
                user_name: value.username
            },
            select: {
                password: true,
                user_name: true,
                name_first: true,
                name_last: true,
                name_middle: true,
                position: true
            }
         });
         if (!doc) {
             return res.status(400).json({ message: userNotFoundErrorMessage });
         }
         console.log(doc)
    
         const isAuthorized = await compare(value.password, doc.password);
         if (!isAuthorized) {
             return res.status(400).json({ message: userNotFoundErrorMessage });
         }
         const expirationInSeconds = parseInt(process.env.EXPIRATION_IN_SECONDS as string, 10);
         const data = { 
             name: `${doc.name_first} ${doc.name_last}`,
             userName: doc.user_name,
             position: doc.position,
             expiresIn: expirationInSeconds,
         };
         const jwtOption = { expiresIn: process.env.EXPIRATION_IN_HOURS_STRING };
        const token = sign(data, process.env.JWT_TOKEN as string, jwtOption);
        res.status(200).json({token, expiresIn: expirationInSeconds});
    } catch (error) {
        res.status(500).json({
            message: "Couldn't process the request at this time.",
        });
    }
}

export const createUser: RequestHandler = async (req: { body: User }, res, next) => {
    try {
        const { value, error } = userSchema.validate(req.body);
        const cleanedValue: User = value;

        const hashedPassword = await hashPassword('ntc11223344'); 
        const data = {
                            user_id: uuid(),
                name_first: cleanedValue.name_first,
                name_middle: cleanedValue.name_middle as string,
                name_last: cleanedValue.name_last,
                user_name: cleanedValue.user_name,
                position: cleanedValue.position,
                password: hashedPassword
        };
        console.log(data)
        const result = await prisma.users.create({
            data
        });

         res.status(200).json({ result: `User created successfully!` });
    } catch (error) {
            log.error(error)
            res.status(500).json({ message: `Couldn't process user data at this time.` });
    }
}

export const updateUser: RequestHandler = async (req: { body: User }, res, next) => {
    try {
        const { value, error } = userSchema.validate(req.body);
        if (error) { log.error(error); return res.status(400).json({ message: `Validation error on user.` }); }
        const cleanedValue: User = value;

        const hashedPassword = await hashPassword(cleanedValue.password); 

        const result = await prisma.users.update({
            where: {
                user_id: hashedPassword
            },
            data: {
                name_first: cleanedValue.name_first,
                name_middle: cleanedValue.name_middle as string,
                name_last: cleanedValue.name_last,
                position: cleanedValue.position,
            }
        });

         res.status(200).json({ result: `User updated successfully!` });
    } catch (error) {
        res.status(500).json({ message: `Couldn't process complaint data at this time.` });
    }
}

export const updateUserPassword: RequestHandler = async (req: { body: User }, res, next) => {
    try {
        const { value, error } = userSchema.validate(req.body);
        const cleanedValue: User = value;

        const hashedPassword = await hashPassword(cleanedValue.password); 

        const result = await prisma.users.update({
            where: {
                user_id: hashedPassword
            },
            data: {
                password: cleanedValue.password
            }
        });

         res.status(200).json({ result: `User password updated successfully!` });
    } catch (error) {
            res.status(500).json({ message: `Couldn't process complaint data at this time.` });
    }
}

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const { page, size, search } = req.query;
    let query = { take: +(size as string), skip: +(size as string) * (+(page as string) - 1) };
    if (search) { (query as any).where = { name: { contains: search }}};
    const docs = await prisma.users.findMany();
    const docCount = await prisma.users.count();

    res.status(200).json({ data: docs, collectionSize: docCount });
  } catch (error) {
    log.error(error);
    res.status(500).json({ message: `Couldn't get users at this time.` });
  }
}

export const searchUser: RequestHandler = async (req, res, next) => {
  try {
    const { search } = req.query;
    // const query = req.query
    const docs = await prisma.$queryRawUnsafe(`SELECT * FROM ${DATABASE_SCHEMA}.users WHERE to_tsvector(name_first) @@ to_tsquery('${search}')`)
    // const docCount = await prisma.clients.count();

    res.status(200).json({ data: docs });
  } catch (error) {
    log.error(error);
    res.status(500).json({ message: `Couldn't get clients at this time.` });
  }
}
